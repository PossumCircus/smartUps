import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NotificationDataType } from "../../types/notificationsType";
import { RootState } from "../../app/store";
import { selectAllNotifications } from "./notificationsSelectors";

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
