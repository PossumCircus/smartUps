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
        console.log('fulfilled', action.payload)
        if (action.payload) state.entities.push(...action.payload);
        state.status = 'succeeded'
        // state.entities.forEach(notification => notification.isNewOne = !notification.isRead)
        // state.entities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      })
      .addCase(fetchNotifications.pending, (state, action) => {
        console.log('pending', action.payload)
        state.status = 'loading'
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        console.log('rejected', action.payload)
        state.status = 'failed'
        state.error = "not found notifications(temporal custom error)"
      })
  }
});
export const { setAllNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer;
