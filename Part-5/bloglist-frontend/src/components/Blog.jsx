import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleUpdate, handleDelete, user }) => {
  const [fullVisibility, setFullVisibility] = useState(false)
  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    paddingTop: 4,
    paddingLeft: 5
  }

  const handleClick = () => {
    if(fullVisibility === false){
      setFullVisibility(true)
    }
    else{
      setFullVisibility(false)
    }
  }

  const handleDeleteClick = (blogToBeRemoved) => {
    if(window.confirm(`Remove blog ${blogToBeRemoved.title}?`)){
      handleDelete(blogToBeRemoved)
    }
  }

  if(fullVisibility === false){
    return (
      <div style={blogStyle}>
        <div> 
          {blog.title} <button onClick={(target) => handleClick(target)}>view</button>
        </div>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      <div className="blogContent" data-testid='blog'> 
          Title: {blog.title} <button onClick={(target) => handleClick(target)}>hide</button> <br/>
          URL: {blog.url} <br/>
          Author: {blog.author} <br/>
          Likes: {blog.likes} <button onClick={() => handleUpdate(blog)} >like</button> <br/>
          User added: {blog.user.name} <br/>
        {user.username === blog.user.username ? <button onClick={() => handleDeleteClick(blog)}>remove</button> : null}        
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