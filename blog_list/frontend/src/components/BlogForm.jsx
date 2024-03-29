import { useState } from 'react'

const BlogForm = ({ createPost }) => {
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')

  const addPost = (event) => {
    event.preventDefault()
    createPost({
      title,
      author,
      url,
      likes: 0,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new blog post</h2>

      <form onSubmit={addPost}>
        title: <input
          value={title}
          onChange={event => setNewTitle(event.target.value)}
        /><br/>
        author: <input
          value={author}
          onChange={event => setNewAuthor(event.target.value)}
        /><br/>
        url: <input
          value={url}
          onChange={event => setNewUrl(event.target.value)}
        /><br/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm