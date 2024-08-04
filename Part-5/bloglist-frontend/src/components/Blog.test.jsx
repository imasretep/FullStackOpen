import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'

describe('Blog tests', () => {
  const testUser = {
    name: 'Tester',
    id: 'id12332199'
  }
  const blog = {
    title: 'Title is rendered',
    author: 'React',
    url: 'Local',
    likes: 4,
    user: testUser
  }
  const handleUpdate = vi.fn()
  const handleDelete = vi.fn()

  test('Title is rendered correctly', () => {
    render(<Blog blog={blog} handleUpdate={handleUpdate} handleDelete={handleDelete} />)
    screen.getByText(`${blog.title}`)
  })

  test('All information is shown after button click', async () => {
    const { container } = render(<Blog blog={blog} handleUpdate={handleUpdate} handleDelete={handleDelete} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blogContent')
    expect(div).toHaveTextContent(
      'Title is rendered'
    )
    expect(div).toHaveTextContent(
      'React'
    )
    expect(div).toHaveTextContent(
      'Local'
    )
    expect(div).toHaveTextContent(
      '4'
    )
    expect(div).toHaveTextContent(
      'Tester'
    )

  })

  test('Like button is pressed twice', async () => {
    render(<Blog blog={blog} handleUpdate={handleUpdate} handleDelete={handleDelete} />)
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleUpdate.mock.calls).toHaveLength(2)
  })
})

describe('NewBlogForm Tests', () => {
  const testUser = {
    name: 'Tester',
    id: 'id12332199'
  }
  const handleBlogPost = vi.fn()

  test('Callback function has correct information when new blog is created', async () => {
    const { container } = render(<NewBlogForm handleBlogPost={handleBlogPost} user={testUser} />)

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const submitButton = container.querySelector('#submit-button')

    const user = userEvent.setup()
    await user.type(titleInput, 'Title is rendered')
    await user.type(authorInput, 'React')
    await user.type(urlInput, 'Local')
    await user.click(submitButton)

    expect(handleBlogPost.mock.calls).toHaveLength(1)
    expect(handleBlogPost.mock.calls[0][0]).toEqual({
      title: 'Title is rendered',
      author: 'React',
      url: 'Local',
      user: testUser      
    })
  })
})