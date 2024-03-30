// Make a test for the new blog form. The test should check, that the form calls the event handler 
// it received as props with the right details when a new blog is created.

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createPost={mockHandler} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('save')

  await user.type(inputs[0], 'Title is CODER')
  await user.type(inputs[1], 'Author is AVERY')
  await user.type(inputs[2], 'url is avery.com')

  // screen.debug()
  // console.log(inputs)

  await user.click(sendButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  // console.log(mockHandler.mock.calls[0][0])
  expect(mockHandler.mock.calls[0][0].title).toBe('Title is CODER')
  expect(mockHandler.mock.calls[0][0].author).toBe('Author is AVERY')
  expect(mockHandler.mock.calls[0][0].url).toBe('url is avery.com')
})
