import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import {
  getAllBlogs,
  createBlog,
  removeBlog,
  updateBlog,
  addCommentToBlog,
} from './reducers/blogReducer'
import { login, nullUser, storageUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'
import Users from './components/users'
import { UserBlogInfo } from './components/users'
import { BlogInfo } from './components/Blog'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (user !== null) {
      dispatch(getAllBlogs(user.token))
    }
  }, [user, dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(storageUser(user))
      dispatch(initializeUsers())
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username: username,
      password: password,
    }
    try {
      await dispatch(login(credentials))
      dispatch(initializeUsers())
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(showNotification('Username or password is wrong', 'red', 5000))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(nullUser())
  }

  const handleBlogPost = async (newBlog) => {
    blogRef.current.toggleVisibility()
    dispatch(createBlog(newBlog))
    dispatch(showNotification(`${newBlog.title} was added`, 'green', 5000))
  }

  const handleUpdate = async (blog) => {
    dispatch(updateBlog(blog))
  }

  const handleDelete = async (blogToBeRemoved) => {
    dispatch(removeBlog(blogToBeRemoved))
    dispatch(
      showNotification(`${blogToBeRemoved.title} was removed`, 'green', 5000)
    )
  }

  const handleNewComment = (newComment) => {
    dispatch(addCommentToBlog(newComment))
  }

  return (
    <Router>
      <div>
        <Login
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          user={user}
        />
        <Notification />
        {user !== null ? (
          <div className="container-fluid">
            <h1 className="h3 mb-3 mt-3 text-center">Blogs App</h1>
            <Togglable buttonLabel="new blog" ref={blogRef}>
              <NewBlogForm handleBlogPost={handleBlogPost} user={user} />
            </Togglable>
            <Routes>
              <Route
                path="/"
                element={
                  <Blogs
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                    user={user}
                  />
                }
              />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserBlogInfo />} />
              <Route
                path="/blogs/:id"
                element={
                  <BlogInfo
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                    handleNewComment={handleNewComment}
                    user={user}
                  />
                }
              />
            </Routes>
          </div>
        ) : null}
      </div>
    </Router>
  )
}

export default App
