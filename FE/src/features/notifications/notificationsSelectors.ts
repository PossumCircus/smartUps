import { RootState } from "../../app/store";
import { NotificationType } from "../../types/notificationType";

export const selectAllNotifications = (state: RootState): NotificationType[] => state.notifications;
