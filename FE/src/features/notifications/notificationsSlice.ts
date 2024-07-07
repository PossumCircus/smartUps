import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationDataType, NotificationInitialStateDataType } from "../../types/notificationsType";
import { fetchNotifications } from "./notificationsAsyncThunks";

const initialState: NotificationInitialStateDataType = {
  entities: [] as NotificationDataType[],
  status: 'idle',
  error: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setAllNotificationsRead(state, action: PayloadAction<NotificationDataType[]>) {
      state.entities.forEach(notification => notification.isRead = true)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<NotificationDataType[]>) => {
        state.entities.push(...action.payload);
        state.entities.forEach(notification => notification.isNew = !notification.isRead)
        state.entities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      });
  }
});
export const { setAllNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer;
