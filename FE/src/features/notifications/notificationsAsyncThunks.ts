import { createAsyncThunk, GetThunkAPI } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { NotificationDataType } from "../../types/notificationsType";

interface fetchNotificationsArgsDataType {
  loginUserId: string;
  config?: AxiosRequestConfig
}

export interface CreateNotificationDataType {
  recipient: string;
  sender?: string;
  notificationType: 'post_new_comment' | 'post_like' | 'comment_new_reply' | 'chat';
  link?: string;
  isNewOne: boolean;
  isRead: boolean;
  config?: AxiosRequestConfig
}

export const fetchNotifications = createAsyncThunk<NotificationDataType[], fetchNotificationsArgsDataType>(
  'notifications/fetchNotifications',
  async ({ loginUserId }) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_NOTIFICATION_API_URL}/${loginUserId}`);
      return data
    } catch (error) {
      console.log(error)
    }
  }
);
// export const fetchNotifications = createAsyncThunk<NotificationDataType[], void, { state: RootState }>(
//   'notifications/fetchNotifications',
//   async (_, { getState }) => {
//     try {
//       const state = getState()
//       const allNotifications = selectAllNotifications(state);
//       console.log('allNotifications',allNotifications)
//       const [latestNotification] = allNotifications;
//       const latestTimestamp = latestNotification ? latestNotification.createdAt : '';
//       const { data } = await axios.get(`${process.env.REACT_APP_NOTIFICATION_API_URL}`);
//       return data
//     } catch (error) {
//       console.log(error)
//     }
//   }
// );
export const createNotification = createAsyncThunk<NotificationDataType, CreateNotificationDataType>(
  'notifications/createNotification',
  async (creationData) => {
    const { data } = await axios.post(`${process.env.REACT_APP_NOTIFICATION_API_URL}`, creationData)
    return data
  }
)