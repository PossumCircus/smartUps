import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationDataType } from "../../types/notificationsType";
import { fetchNotifications } from "./notificationsAsyncThunks";

const initialState: NotificationDataType[] = [];

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setAllNotificationsRead(state, action : PayloadAction<NotificationDataType[]>) {
      state.forEach(notification => notification.isRead = true)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<NotificationDataType[]>) => {
        state.push(...action.payload);
        state.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      });
  }
});
export const { setAllNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer;
