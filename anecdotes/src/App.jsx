import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useParams, useNavigate,
  useMatch
} from 'react-router-dom'

const Heading = ({ text }) => (
  <h1>{text}</h1>
)

const Footer = ({ text }) => (
  <p><em>{text}</em></p>
)

const Home = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => {
        return <li key={anecdote.id}><Link to={`/anecdotes/${anecdote.id}`} >{anecdote.content}</Link></li>
      })}
    </ul>
  </div>
)

const Create = ({ anecdotes, setAnecdotes, setNotification }) => {
  const navigate = useNavigate()

  const [content, setContent] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 

  const onSubmit = (event) => {
    event.preventDefault()
    const id = Math.max(...anecdotes.map(anecdote => Number(anecdote.id))) + 1
    setAnecdotes(anecdotes.concat({ id, content, author, url }))
    setNotification(content)
    navigate('/')
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>

      <form onSubmit={onSubmit}>
        content: <input
          id='content'
          value={content}
          onChange={event => setContent(event.target.value)}
        /><br/>
        author: <input
          id='author'
          value={author}
          onChange={event => setAuthor(event.target.value)}
        /><br/>
        url for more info: <input
          id='url'
          value={url}
          onChange={event => setUrl(event.target.value)}
        /><br/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(n => n.id === Number(id))
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>for more info see {anecdote.url}</div>
    </div>
  )
}

const Notification = ({ notification, setNotification }) => {
  if (notification) {
    setTimeout(() => {
      setNotification(null)}
    , 5000)
    return (
      <>
        <p>A new anecdote {notification} created!</p>
      </>
    )
  }
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      id: 1,
      content: 'If it hurts, do it more often.',
      author: 'Avery',
      url: 'avery.com',
    },
    {
      id: 2,
      content: 'Adding manpower to a late software project makes it later!',
      author: 'Avery',
      url: 'avery.com',
    },
    {
      id: 3,
      content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      author: 'Avery',
      url: 'avery.com',
    },
    {
      id: 4,
      content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      author: 'Avery',
      url: 'avery.com',
    },
    {
      id: 5,
      content: 'Premature optimization is the root of all evil.',
      author: 'Avery',
      url: 'avery.com',

    },
    {
      id: 6,
      content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      author: 'Avery',
      url: 'avery.com',
    },
    {
      id: 7,
      content: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      author: 'Avery',
      url: 'avery.com',
    },
    {
      id: 8,
      content: 'The only way to go fast, is to go well.',
      author: 'Avery',
      url: 'avery.com',
    },
  ])

  const [notification, setNotification] = useState(null)

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <Heading text="Software Anecdotes" />
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>

      <Notification notification={notification} setNotification={setNotification} />

      <Routes>
        <Route path="/create" element={<Create anecdotes={anecdotes} setAnecdotes={setAnecdotes} setNotification={setNotification} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
        <Route path="/" element={<Home anecdotes={anecdotes} />} />
      </Routes>

      <Footer text="Anecdote app created by Avery Littlemore" />
    </Router>
  )
}

export default App