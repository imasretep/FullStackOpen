import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'SHOW':
        return action.payload
       case 'HIDE':
        return null
      default:
        return state
    }
  } 
  
const NotificationContext = createContext()

export const NotificationProvider = (props) => {
    const [notification, dispatch] = useReducer(notificationReducer, null)  
    return (
      <NotificationContext.Provider value={[notification, dispatch]}>
        {props.children}
      </NotificationContext.Provider>
    )
  }

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext
