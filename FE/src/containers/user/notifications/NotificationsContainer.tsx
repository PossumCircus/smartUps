import NotificationsList from "../../../components/user/notifications/NotificationsList"
import { selectAllUsers } from "../../../features/users/usersSelectors"
import { selectAllNotifications } from "../../../features/notifications/notificationsSelectors"
import { useSelector } from "react-redux"

export default function NotificationsContainer() {
    const notifications = useSelector(selectAllNotifications)
    const users = useSelector(selectAllUsers)
    return (
        <div>
            렌더링 테스트. users목록이 채워져야 아래에 나옴
            <NotificationsList
                notifications={notifications}
                users={users}
            />
        </div>

    )
}
