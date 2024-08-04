import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [color, setColor] = useState('')
  const blogRef = useRef()

  const getBlogs = async () => {
    try {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } 
    catch (error) {
    }
  }

  useEffect(() => {
    if (user !== null) {
      getBlogs()
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username: username,
      password: password
    }

    try{
      const user = await loginService.login(credentials)
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user)) 

      setUsername('')
      setPassword('')
    }
    catch{
      setNotification('Username or password is wrong')
      setColor('red')
      setTimeout(() => {
        setNotification(null)
        setColor('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleBlogPost = async (newBlog) => {
    blogRef.current.toggleVisibility()
    const response = await blogService.create(newBlog)
    setBlogs(blogs.concat(response))
    setNotification(`${newBlog.title} was added`)
    setColor('Green')
    setTimeout(() => {
      setNotification(null)
      setColor('')
    }, 5000)
  }

  const handleUpdate = async (blog) => {
    const response = await blogService.updateLike(blog)
    const likes = response.likes
    setBlogs(blogs.map(blog => blog.id !== response.id ? blog : { ...blog, likes: likes }))
  }

  const handleDelete = async (blogToBeRemoved) => {
    await blogService.deleteBlog(blogToBeRemoved)
    setBlogs(blogs.filter(blog => blog.id !== blogToBeRemoved.id ))
  } 

  return (
    <div>
      <Notification text={notification} color={color}/>
      <Login 
        handleLogin={handleLogin} 
        handleLogout={handleLogout}
        username={username} 
        password={password} 
        setUsername={setUsername} 
        setPassword={setPassword} 
        user={user}/>

      {user !== null ? 
        <div>
          <Togglable buttonLabel="new blog" ref={blogRef}>
            <NewBlogForm 
              handleBlogPost={handleBlogPost} user={user}/> 
          </Togglable>
          <Blogs blogs={blogs.sort((a, b) => b.likes - a.likes)} handleUpdate={handleUpdate} handleDelete={handleDelete} user={user}/>
        </div>
        : null}
    </div>
  )
}

export default App