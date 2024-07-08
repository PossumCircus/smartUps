import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataType, UsersInitialStateDataType } from "../../types/usersType";
import { fetchUsers, fetchUserProfile } from "./usersAsyncThunks";

const initialState: UsersInitialStateDataType = {
  entities: {} as UserDataType,
  status: "idle",
  error: null
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserDataType>) {
      state.entities = action.payload
    },
    clearUser(state, action) {
      // state.loginUser = null;
      return initialState
    },
  },
  extraReducers: (builder) => {
    // //fetchUsers
    // builder
    //   .addCase(fetchUsers.pending, (state) => {
    //     state.status = "loading";
    //     state.error = null;
    //   })
    //   .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserDataType[]>) => {
    //     state.entities = action.payload;
    //   })
    //   .addCase(fetchUsers.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.error.message || null;
    //   });
    //fetchUserProfile
    // builder
    //   .addCase(fetchUserProfile.pending, (state, action) => {
    //     state.status = "loading";
    //     state.error = null;
    //   })
    //   .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserDataType>) => {
    //     state.status = "succeeded";
    //     state.loginUser = action.payload;
    //   })
    //   .addCase(fetchUserProfile.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.error.message || null;
    //   });
  },
});

export default usersSlice.reducer;
export const { setUser, clearUser } = usersSlice.actions;
