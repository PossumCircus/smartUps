import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { formatDistanceToNow, parseISO } from "date-fns"
import {
  selectAllNotifications,
  notificationsStatus,
  notificationsError,
  fetchNotifications,
  deleteNotification
} from "../index"
import { selectUser } from "../../users/"
import { AppDispatch } from "../../../app/store"
import { Check as CheckIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
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

  const NotificationTypeRender = (type: string) => {
    if (type === 'comment_new_reply') return '댓글에 새로운 답글이 달렸습니다.'
    if (type === 'post_new_comment') return '게시글에 새로운 댓글이 달렸습니다.'
    if (type === 'post_like') return '게시글에 좋아요가 추가되었습니다.'
  }

  const handleNotificationRemove = (notificationId: string) => {
    dispatch(deleteNotification(notificationId))
    window.location.reload()
  }

  if (notifications.length < 1) return <>새로운 알림이 없습니다.</>
  if (statusState === 'loading') return <>now loading..</>
  if (statusState === 'succeeded') {
    return notifications.map((notification, index) => {
      const date = parseISO(notification.createdAt)
      const timeAgo = formatDistanceToNow(date)
      return (
        <div key={`${notification._id}-${index}`} className="notification w-[25%] border-sky-200 border-2 my-1 p-1">
          <div>
            <div className="flex justify-between">
              {NotificationTypeRender(notification.notificationType)}
              <div className='space-x-2 mr-2'>
                <IconButton onClick={() => handleNotificationRemove(notification._id)}>
                  <CheckIcon />
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
  }
}

export default NotificationsList