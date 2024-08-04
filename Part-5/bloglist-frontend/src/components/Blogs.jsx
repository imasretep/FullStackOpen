import Blog from './Blog'
import PropTypes from 'prop-types'

const Blogs = ({ blogs, handleUpdate, handleDelete, user }) => {
  return(
    <div data-testid='blogs'>
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} handleDelete={handleDelete} user={user}/>
      )}
    </div>
  )
}

Blogs.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
}

export default Blogs