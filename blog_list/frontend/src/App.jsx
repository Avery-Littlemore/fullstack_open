import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [allUsers, setAllUsers] = useState(null)
  const [userID, setUserID] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    blogService.getUsers().then(users =>
      setAllUsers(users)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      
      const id = JSON.parse(window.localStorage.getItem('loggedBloglistUserID'))
      setUserID(id)

      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      const allUsers = await blogService.getUsers()
      const id = allUsers.filter(person => person.username === user.username)[0].id

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      window.localStorage.setItem(
        'loggedBloglistUserID', JSON.stringify(id)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUserID(id)
      setSuccessMessage(`Hello, ${username}!`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.clear()

    setUser(null)
    setUserID(null)
  }

  const createPost = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogObject = {...blogObject, userId: userID}
    blogService
      .create(blogObject)
      .then(returnedPost => {
        setBlogs(blogs.concat(returnedPost))
      }) 
  }

  const createBlogForm = () => (
    <Togglable buttonLabel='new blog post' ref={blogFormRef}>
      <BlogForm createPost={createPost} />
    </Togglable>
  )

  const addOneLike = (blog) => {
    blogService
      .addLike(blog)
      .then(() => {
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
      })
  }

  const removePost = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService
        .deletePost(blog)
        .then(() => {
          const idx = blogs.indexOf(blog)
          blogs.splice(idx, 1)
          setBlogs(blogs.slice())
        })
    }
  }

  

  if (user === null) {
    return (
      <div>

        <Notification successMessage={successMessage} errorMessage={errorMessage} />

        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />

      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>
      {createBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addOneLike={addOneLike} removePost={removePost} user={user} allUsers={allUsers} />
      )}
    </div>
  )
}

export default App