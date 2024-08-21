import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ handleBlogPost, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = (event) => {
    event.preventDefault()
    handleBlogPost({
      title: title,
      author: author,
      url: url,
      user: user,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  // style={{ width: '6%' }}
  return (
    <div className="row">
      <h1 className="h3">Create a new</h1>
      <form onSubmit={addNewBlog}>
        <div className="mb-2">
          <input
            data-testid="title"
            className="form-control form-control-sm"
            placeholder="Title"
            id="title-input"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="mb-2">
          <input
            data-testid="author"
            className="form-control form-control-sm"
            placeholder="Author"
            id="author-input"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="mb-2">
          <input
            data-testid="url"
            className="form-control form-control-sm"
            placeholder="URL"
            id="url-input"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button className="btn btn-primary w-100" id="submit-button">
            create
          </button>
        </div>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  handleBlogPost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}
export default NewBlogForm
