import { useState } from 'react'

const Blog = ({ blog, addOneLike, removePost, user, allUsers }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const renderWithRemove = (posterNameFromId) => {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button style={hideWhenVisible} onClick={toggleVisibility}>view</button><button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
        <div style={showWhenVisible}>
          {blog.url}<br/>
          likes {blog.likes} <button onClick={() => addOneLike(blog)}>like</button><br/>
          {posterNameFromId}<br/>
          <button onClick={() => removePost(blog)}>remove</button>
        </div>
      </div>
    )
  }

  const renderWithoutRemove = (posterNameFromId) => {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button style={hideWhenVisible} onClick={toggleVisibility}>view</button><button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
        <div style={showWhenVisible}>
          {blog.url}<br/>
          likes {blog.likes} <button onClick={() => addOneLike(blog)}>like</button><br/>
          {posterNameFromId}<br/>
        </div>
      </div>
    )
  }

  if (user && allUsers) {
    console.log(user.name)
    const posterNameFromId = allUsers.filter(user => user.id === blog.user)[0].name
    return posterNameFromId === user.name ? renderWithRemove(posterNameFromId) : renderWithoutRemove(posterNameFromId)
  }
}

export default Blog