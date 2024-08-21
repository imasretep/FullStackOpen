import PropTypes from 'prop-types'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const NavMenu = ({ user, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link fw-semibold" to="/">
              Blogs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-semibold" to="/users">
              Users
            </Link>
          </li>
        </ul>
        <span className="navbar-text">
          {user.name} logged in{' '}
          <button className="btn btn-primary" onClick={handleLogout}>
            logout
          </button>{' '}
        </span>
      </div>
    </nav>
  )
}

const Login = ({
  handleLogin,
  handleLogout,
  username,
  password,
  setUsername,
  setPassword,
  user,
}) => {
  if (user === null) {
    return (
      <div className="container">
        <div className="position-absolute top-50 start-50 translate-middle">
          <h1 className="h3">Login to application</h1>
          <form onSubmit={handleLogin}>
            <div className="form-floating mb-2">
              {/* username{' '} */}
              <input
                data-testid="username"
                id="floatingInput"
                placeholder="username"
                className="form-control"
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
              <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating mb-2">
              {/* password{' '} */}
              <input
                data-testid="password"
                id="floatingPassword"
                placeholder="password"
                className="form-control"
                type="password"
                value={password}
                name="Passowrd"
                onChange={({ target }) => setPassword(target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div>
              <button className="btn btn-primary w-100 py-2">Login</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  return (
    <div>
      <NavMenu user={user} handleLogout={handleLogout} />
    </div>
  )
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
}
export default Login
