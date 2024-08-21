import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Blog = ({ blog }) => {
  return (
    <div>
      <Link className="fw-medium" to={`blogs/${blog.id}`}>
        {blog.title}
      </Link>
    </div>
  )
}

export const BlogInfo = ({
  handleUpdate,
  user,
  handleDelete,
  handleNewComment,
}) => {
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  const handleDeleteClick = (blogToBeRemoved) => {
    if (window.confirm(`Remove blog ${blogToBeRemoved.title}?`)) {
      handleDelete(blogToBeRemoved)
      navigate('/')
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    handleNewComment({
      comment: comment,
      id: id,
    })
    setComment('')
  }

  return (
    <div className="container">
      <div className="card row bg-light py-3 mt-3">
        <div className="col">
          <h1 className="h3 text-uppercase">{blog.title}</h1>
          <a href={blog.url}>{blog.url}</a>
          <p className="fs-6 mb-2 fst-italic">Blog Author - {blog.author}</p>
          <p className="fs-6 mb-2">
            Likes - {blog.likes}{' '}
            <button
              className="btn btn-primary btn-sm mb-2"
              onClick={() => handleUpdate(blog)}
            >
              like
            </button>
          </p>

          <p className="fs-6 mt-5 mb-2 fst-italic">
            {' '}
            Added by {blog.user.name}{' '}
          </p>
          {user.username === blog.user.username ? (
            <button
              className="btn btn-primary"
              onClick={() => handleDeleteClick(blog)}
            >
              remove
            </button>
          ) : null}
        </div>
      </div>

      <div className="row mt-3">
        <h1 className="h3 text-center">Comments</h1>
        {blog.comments.length === 0 ? (
          <div className="text-center">no comments yet</div>
        ) : (
          <ul className="list-group list-group-flush">
            {blog.comments.map((c) => (
              <li className="list-group-item" key={c.id}>
                {c.comment}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card row bg-light p-3 mt-5 mb-3">
        <form onSubmit={addComment}>
          <input
            type="text"
            className="form-control"
            placeholder="Comment"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <div className="text-center">
            <button className="btn btn-primary w-50 mt-2" id="submit-button">
              comment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

Blog.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
}

export default Blog
