import { createAsyncThunk, GetThunkAPI } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { NotificationDataType } from "../../types/notificationsType";
import { RootState, AppDispatch } from "../../app/store";
import { selectAllNotifications } from "./notificationsSelectors";

interface CreateNotificationDataType {
  recipient: string;
  sender?: string;
  notificationType: 'post_new_comment' | 'post_like' | 'comment_new_reply' | 'chat';
  link?: string;
  isNew: boolean;
  isRead: boolean;
}

export const fetchNotifications = createAsyncThunk<NotificationDataType[], void, { state: RootState }>(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const state = getState()
    const allNotifications = selectAllNotifications(state);
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.createdAt : '';
    const { data } = await axios.get(`${process.env.REACT_APP_NOTIFICATION_API_URL}`, { params: { since: latestTimestamp } });
    return data
  }
);

export const createNotification = createAsyncThunk<NotificationDataType, CreateNotificationDataType>(
  'notifications/createNotification',
  async (creationData, config) => {
    const { data } = await axios.post(`${process.env.REACT_APP_NOTIFICATION_API_URL}`, config)
    return data
  }
)