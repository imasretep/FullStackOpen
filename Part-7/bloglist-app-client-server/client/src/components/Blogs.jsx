import Blog from './Blog'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const Blogs = ({ handleUpdate, handleDelete, user }) => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div className="container" data-testid="blogs">
      <br />
      {blogs.map((blog) => (
        <ul key={blog.id} className="list-group">
          <li className="list-group-item mb-2">
            <Blog
              blog={blog}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              user={user}
            />
          </li>
        </ul>
      ))}
    </div>
  )
}

Blogs.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blogs
