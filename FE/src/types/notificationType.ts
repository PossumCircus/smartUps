export interface NotificationDataType {
    _id: string; // Assuming MongoDB ObjectId is converted to string
    recipient: string; // User ID as string
    sender?: string; // Optional User ID as string or oid from DB
    notificationType: "new_comment" | "like" | "follow" | "chat"; 
    link?: string; // Optional link 
    isRead: boolean;
    createdAt: string; // ISO date string
}

export type NotificationsStateType = NotificationDataType[];

export interface AlarmStateType {
    postLikes : boolean;
    postNewComments : boolean;
    commentLikes : boolean;
    replies : boolean;
    chats : boolean;
}