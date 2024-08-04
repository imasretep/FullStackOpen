import PropTypes from 'prop-types'

const Login = ({ handleLogin, handleLogout, username, password, setUsername, setPassword, user }) => {
  if(user === null){
    return(
      <div>
        <h2>Login to application</h2>
        <form onSubmit={handleLogin}>
          <div>
              username <input data-testid='username' type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
              password <input data-testid='password' type="password" value={password} name="Passowrd" onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
      </div>
    )
  }
  return(
    <div>
      <h2>blogs</h2>
      {user.name} logged in <button onClick={handleLogout}>logout</button> <br/>
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