describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'salainen'
    }

    const user2 = {
      name: 'Avery',
      username: 'alit',
      password: 'passcode'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('incorrect password')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog post').click()
      cy.get('#title').type('a new title from Cypress')
      cy.get('#author').type('author Cypress')
      cy.get('#url').type('cypress.com')
      cy.contains('save').click()
      cy.contains('a new title from Cypress')
    })

    it('A user can like a blog', function() {
      cy.contains('new blog post').click()
      cy.get('#title').type('a new title from Cypress')
      cy.get('#author').type('author Cypress')
      cy.get('#url').type('cypress.com')
      cy.contains('save').click()

      cy.contains('view').click()
      cy.contains('like').click()
    })

    it('User who created a blog can delete it', function() {
      cy.contains('new blog post').click()
      cy.get('#title').type('a new title from Cypress')
      cy.get('#author').type('author Cypress')
      cy.get('#url').type('cypress.com')
      cy.contains('save').click()

      cy.contains('view').click()
      cy.contains('remove').click()
    })

    it('Only the creator can see the delete button of a blog', function() {
      cy.contains('new blog post').click()
      cy.get('#title').type('a new title from Cypress')
      cy.get('#author').type('author Cypress')
      cy.get('#url').type('cypress.com')
      cy.contains('save').click()

      cy.contains('logout').click()

      cy.contains('login').click()
      cy.get('#username').type('alit')
      cy.get('#password').type('passcode')
      cy.get('#login-button').click()

      cy.contains('view').click()
      cy.contains('remove').should('not.exist')
    })

    it('Blogs are ordered by likes', function() {
      cy.contains('new blog post').click()
      cy.get('#title').type('a new title from Cypress')
      cy.get('#author').type('author Cypress')
      cy.get('#url').type('cypress.com')
      cy.contains('save').click()

      cy.contains('view').click()
      cy.contains('like').click()

      cy.contains('new blog post').click()
      cy.get('#title').type('newer title from Cypress')
      cy.get('#author').type('author Cypress2')
      cy.get('#url').type('cypress2.com')
      cy.contains('save').click()

      cy.get('.blog').eq(0).should('contain', 'a new title from Cypress')
      cy.get('.blog').eq(1).should('contain', 'newer title from Cypress')
    })
  })
})
