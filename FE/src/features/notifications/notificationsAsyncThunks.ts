import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NotificationType } from "../../types/notificationType";
import { RootState } from "../../app/store";
import { selectAllNotifications } from "./notificationsSelectors";

export const fetchNotifications = createAsyncThunk<NotificationType[], void, { state: RootState }>(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const state = getState()
    const allNotifications = selectAllNotifications(state);
    // data of index number 0
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.createdAt : '';
    const response = await axios.get(`${process.env.REACT_APP_NOTIFICATION_API_URL}`, { params: { since: latestTimestamp } });
    return response.data;
  }
);
