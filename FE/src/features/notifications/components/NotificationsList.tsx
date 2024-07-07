import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { formatDistanceToNow, parseISO } from "date-fns"

import { selectAllUsers } from "../../users"
import { selectAllNotifications, notificationsStatus, notificationsError, fetchNotifications } from "../index"
import { AppDispatch } from "../../../app/store"

const NotificationsList: React.FC<any> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector(selectAllNotifications)
  const statusState = useSelector(notificationsStatus)
  const errorState = useSelector(notificationsError)
  const users = useSelector(selectAllUsers)

  useEffect(() => {
    if (statusState === 'idle') {
      dispatch(fetchNotifications());
    }
  }, [statusState, dispatch])

  if (notifications.length < 1) return <div>새로운 알림이 없습니다.</div>

  return notifications.map(notification => {
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
}

export default NotificationsList