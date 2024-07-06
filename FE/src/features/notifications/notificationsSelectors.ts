import { RootState } from "../../app/store";
import { NotificationDataType } from "../../types/notificationsType";

export const selectAllNotifications = (state: RootState): NotificationDataType[] => state.notifications;
