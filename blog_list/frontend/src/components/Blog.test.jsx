// Make a test, which checks that the component displaying a blog renders the blog's likes and author, but does not render its URL or number of likes by default.

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'test title',
  author: 'test author',
  url: 'ave.com',
  likes: 10,
  userId: '6602fe4947a37b501022d3ee'
}

const addOneLike = () => {}
const removePost = () => {}
const user = { name: 'avery' }
const user2 = { name: 'littlemore' }
const allUsers = [user, user2]

test('renders content', () => {
  render(<Blog blog={blog} addOneLike={addOneLike} removePost={removePost} user={user} allUsers={allUsers} />)

  const title = screen.getByText(blog.title, { exact: false })
  const author = screen.getByText(blog.author, { exact: false })
  const url = screen.getByText(blog.url, { exact: false })
  const likes = screen.getByText(blog.likes, { exact: false })

  expect(title).not.toHaveStyle('display: none')
  expect(author).not.toHaveStyle('display: none')
  expect(url).toHaveStyle('display: none')
  expect(likes).toHaveStyle('display: none')
})

test('clicking the button calls event handler once', async () => {

  render(<Blog blog={blog} addOneLike={addOneLike} removePost={removePost} user={user} allUsers={allUsers} />)

  const title = screen.getByText(blog.title, { exact: false })
  const author = screen.getByText(blog.author, { exact: false })
  const url = screen.getByText(blog.url, { exact: false })
  const likes = screen.getByText(blog.likes, { exact: false })

  const currentUser = userEvent.setup()
  const button = screen.getByText('view')
  await currentUser.click(button)

  expect(title).not.toHaveStyle('display: none')
  expect(author).not.toHaveStyle('display: none')
  expect(url).not.toHaveStyle('display: none')
  expect(likes).not.toHaveStyle('display: none')
})

test('clicking the button calls event handler once', async () => {
  const mockHandler = vi.fn()

  render(<Blog blog={blog} addOneLike={mockHandler} removePost={removePost} user={user} allUsers={allUsers} />)

  const dummyUser = userEvent.setup()
  const button = screen.getByText('like')
  await dummyUser.click(button)
  await dummyUser.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})