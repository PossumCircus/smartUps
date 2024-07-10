import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { formatDistanceToNow, parseISO } from "date-fns"

import {
  selectAllNotifications,
  notificationsStatus,
  notificationsError,
  fetchNotifications,
} from "../index"
import { selectUser } from "../../users/usersSelectors"
import { AppDispatch } from "../../../app/store"

const NotificationsList: React.FC<any> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector(selectAllNotifications)
  const statusState = useSelector(notificationsStatus)
  const errorState = useSelector(notificationsError)
  const loginUserId = useSelector(selectUser)._id

  useEffect(() => {
    if (statusState === 'idle') {
      dispatch(fetchNotifications({ loginUserId }));
    }
  }, [statusState, dispatch])

  if (notifications.length < 1) return <>새로운 알림이 없습니다.</>
  if (statusState === 'loading') return <>now loading..</>
  if (statusState === 'succeeded') {
    return notifications.map(notification => {
      const date = parseISO(notification.createdAt)
      const timeAgo = formatDistanceToNow(date)
      return (
        <div key={notification._id} className="notification">
          <div>
            <b>{notification.sender ? notification.sender : "Unknown User"}</b> {notification.notificationType}
          </div>
          <div title={notification.createdAt}>
            <i>{timeAgo} ago</i>
          </div>
        </div>
      )
    })
  }

}

export default NotificationsList