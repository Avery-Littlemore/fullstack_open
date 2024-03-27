import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [userID, setUserID] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      ) 

      blogService.getUserID(user).then(users => {
        setUserID(users.filter(user => user.username === username)[0].id)
      })

      blogService.setToken(user.token)
      setUser(user)
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
    window.localStorage.removeItem(
      'loggedBloglistUser', JSON.stringify(user)
    )

    setUser(null)
  }

  const addPost = (event) => {
    event.preventDefault()

    const blogObject = {
      title,
      author,
      url,
      likes: 0,
      userId: userID,
    }
  
    blogService
      .create(blogObject)
      .then(returnedPost => {
        setBlogs(blogs.concat(returnedPost))
        setSuccessMessage(`a new blog ${title} by ${author} added!`)
        setTitle('')
        setAuthor('')
        setUrl('')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
    
  }

  const setNewTitle = (event) => {
    setTitle(event.target.value)
  }

  const setNewAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const setNewUrl = (event) => {
    setUrl(event.target.value)
  }

  const createBlogForm = () => (
    <form onSubmit={addPost}>
      title: <input
        value={title}
        onChange={setNewTitle}
      /><br/>
      author: <input
        value={author}
        onChange={setNewAuthor}
      /><br/>
      url: <input
        value={url}
        onChange={setNewUrl}
      /><br/>
      <button type="submit">save</button>
    </form>  
  )

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
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App