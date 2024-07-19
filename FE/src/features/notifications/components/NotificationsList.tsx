import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { formatDistanceToNow, parseISO } from "date-fns"
import {
  selectAllNotifications,
  notificationsStatus,
  notificationsError,
  fetchNotifications,
  setReadNotification,
  deleteNotification
} from "../index"
import { selectUser } from "../../users/"
import { AppDispatch } from "../../../app/store"
import { Check as CheckIcon, ArrowForward as ArrowForwardIcon, Clear as ClearIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
const NotificationsList: React.FC<any> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector(selectAllNotifications)
  const statusState = useSelector(notificationsStatus)
  const errorState = useSelector(notificationsError)
  const loginUserId = useSelector(selectUser)._id

  useEffect(() => {
    if (statusState === 'idle') {
      handleRefreshNotification();
    }
  }, [statusState, dispatch])

  const NotificationTypeRender = (type: string) => {
    if (type === 'comment_new_reply') return '댓글에 새로운 답글이 달렸습니다.'
    if (type === 'post_new_comment') return '게시글에 새로운 댓글이 달렸습니다.'
    if (type === 'post_like') return '게시글에 좋아요가 추가되었습니다.'
  }
  const handleRefreshNotification = () => {
    dispatch(fetchNotifications({ loginUserId }))
  }
  const handleNotificationRead = (notificationId: string) => {
    dispatch(setReadNotification({ notificationId }))
  }

  const handleNotificationRemove = (notificationId: string) => {
    dispatch(deleteNotification(notificationId))
    window.location.reload()
  }

  const NotificationsRender = () => {
    return (
      notifications.map((notification, index) => {
        const date = parseISO(notification.createdAt)
        const timeAgo = formatDistanceToNow(date)
        return (
          <div key={`${notification._id}-${index}`} className="notification w-[27%] border-sky-200 border-2 my-1 p-1">
            <div>
              <div className="flex justify-between">
                {NotificationTypeRender(notification.notificationType)}
                <div className='-space-x-3 -mt-2'>
                  <IconButton onClick={() => handleNotificationRead(notification._id)}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton onClick={() => handleNotificationRemove(notification._id)}>
                    <ClearIcon />
                  </IconButton>
                  <IconButton>
                    <ArrowForwardIcon />
                  </IconButton>
                </div>
              </div>
              <div>
                <b>by {notification.sender ? notification.sender.username : "Unknown User"}</b>
              </div>
              <div title={notification.createdAt}>
                <i>{timeAgo} ago</i>
              </div>
            </div>
          </div>
        )
      })
    )
  }
  if (notifications.length < 1) return <>새로운 알림이 없습니다.</>
  if (statusState === 'loading') return <>now loading..</>
  if (statusState === 'succeeded') {
    return (
      <>
        <IconButton onClick={handleRefreshNotification}>
          <RefreshIcon />
        </IconButton>
        <NotificationsRender />
      </>
    )
  }
}

export default NotificationsList