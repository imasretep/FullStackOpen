import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)
  return (
    <div className="container">
      <h1 className="h1">Users</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <User key={i} users={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const User = ({ users }) => {
  return (
    <tr>
      <td key={users.id}>
        <Link to={`/users/${users.id}`}>{users.name}</Link>
      </td>
      <td>{users.blogs.length}</td>
    </tr>
  )
}

export const UserBlogInfo = () => {
  const id = useParams().id
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  )
  return (
    <div className="container card mt-3">
      <h1 className="h1 text-center">{user.name}</h1>
      <h2 className="h3 text-center">added blogs</h2>
      <ul className="list-group list-group-flush">
        {user.blogs.map((blog) => (
          <li className="list-group-item" key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
