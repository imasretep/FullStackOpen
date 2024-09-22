import { NotificationProps } from "../types"

const Notification = (props: NotificationProps) => {
  return (
    <div style={{ color: "red" }}> Error: {props.notification} </div>
  )
}

export default Notification
