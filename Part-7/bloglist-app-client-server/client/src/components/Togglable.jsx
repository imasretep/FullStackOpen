import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div className="container-fluid ">
      <div className="d-flex justify-content-center">
        <div className="" style={hideWhenVisible}>
          <button className="btn btn-primary" onClick={toggleVisibility}>
            {props.buttonLabel}
          </button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <button
            className="btn btn-primary mt-2 w-100"
            onClick={toggleVisibility}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
