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
      user: user
    })
  
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  
  return (
    <div>
      <h2>create a new</h2>
      <form onSubmit={addNewBlog}>
        <div>
            title: <input data-testid='title' id="title-input" type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
            author: <input data-testid='author' id="author-input" type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
            url: <input data-testid='url' id="url-input" type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <div>
          <button id="submit-button">create</button>
        </div>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  handleBlogPost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
export default NewBlogForm