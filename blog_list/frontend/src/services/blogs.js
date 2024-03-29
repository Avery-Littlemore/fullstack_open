import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getUsers = async () => {
  const response = await axios.get('/api/users')
  return response.data
}

const addLike = async ({ title, author, url, likes, id, user }) => {
  const updatedPost = {
    title,
    author,
    url,
    likes: likes + 1,
    userId: user,
  }

  await axios.put(`/api/blogs/${id}`, updatedPost)
  return updatedPost
}

const deletePost = async ({ id }) => {
  await axios.delete(`/api/blogs/${id}`)
}

export default { getAll, setToken, create, getUsers, addLike, deletePost }