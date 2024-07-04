import { NotificationDataType } from "../../../types/notificationType"
import { UserDataType } from "../../../types/usersType";
import { formatDistanceToNow, parseISO } from 'date-fns'

type NotificationsListProps = {
    notifications: NotificationDataType[];
    users: UserDataType[]
}

const NotificationsList: React.FC<NotificationsListProps> = ({ notifications, users }) => {
    return (
        <section className="notificationsList">
            {notifications.map(notification => {
                const date = parseISO(notification.createdAt)
                const timeAgo = formatDistanceToNow(date)
                const user = users.find(user => user.username === notification.id) || { username: 'Unknown User' }
                return (
                    <div key={notification.id} className="notification">
                        <div>
                            <b>{user.username}</b> {notification.message}
                        </div>
                        <div title={notification.createdAt}>
                            <i>{timeAgo} ago</i>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}
export default NotificationsList
