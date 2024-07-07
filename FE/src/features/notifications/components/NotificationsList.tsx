import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { formatDistanceToNow, parseISO } from "date-fns"

import { selectAllUsers } from "../../users"
import {
  selectAllNotifications,
  notificationsStatus,
  notificationsError,
  fetchNotifications,
  createNotification
} from "../index"
import { AppDispatch } from "../../../app/store"
import { CreateNotificationDataType } from '../notificationsAsyncThunks'

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

  const creationData: CreateNotificationDataType = {
    recipient: '6689f97d26a4b7f0d81a7824',
    sender: '668a193f532e4531792534e2',
    notificationType: 'comment_new_reply',
    isNewOne: true,
    isRead: false
  }

  if (notifications.length < 1) return (
    <>
      <div>새로운 알림이 없습니다.</div>
      {/* <div onClick={() => dispatch(createNotification(creationData))}>알림추가</div> */}
    </>
  )
  if (statusState === 'loading') return <>now loading..</>

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