import React from 'react'
import { useSelector } from "react-redux"
import { formatDistanceToNow, parseISO } from "date-fns"

import { selectAllUsers } from "../../users/usersSelectors"
import { selectAllNotifications } from "../notificationsSelectors"

const NotificationsList: React.FC<any> = () => {
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)

  const render = notifications.map(notification => {
    const date = parseISO(notification.createdAt)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find(user => user._id === notification.sender)

    return (
      <div key={notification._id} className="notification">
        <div>
          <b>{user ? user.username : "Unknown User"}</b> {notification.notificationType}
        </div>
        <div title={notification.createdAt}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <>{render}</>
  )
}

export default NotificationsList