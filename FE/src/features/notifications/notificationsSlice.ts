import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationsStateType, NotificationType } from "../../types/notificationType";
import { fetchNotifications } from "./notificationsAsyncThunks";

const initialState: NotificationsStateType = [];

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<NotificationType[]>) => {
      state.push(...action.payload);
      state.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    });
  }
});

export default notificationsSlice.reducer;
