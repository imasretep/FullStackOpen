import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const style = {
    color: notification.color,
    fontSize: 18,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (notification.message !== null) {
    return (
      <div className="container mt-3 mb-3 text-center" style={style}>
        {notification.message}
      </div>
    )
  }
  return null
}

export default Notification
