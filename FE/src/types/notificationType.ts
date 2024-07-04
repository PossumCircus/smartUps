export interface NotificationDataType {
    id: string; // Assuming MongoDB ObjectId is converted to string
    recipient: string; // User ID as string
    sender?: string; // Optional User ID as string or oid from DB
    notificationType: "new_comment" | "like" | "follow" | string; // Add other types as needed
    link?: string; // Optional link 
    isRead: boolean;
    createdAt: string; // ISO date string
    message : string;
}

export type NotificationsStateType = NotificationDataType[];