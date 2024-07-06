import { RootState } from '../../app/store';
import { UserDataType, UsersStateType } from '../../types/usersType'; // Ensure this path is correct

export const selectAllUsers = (state: RootState): UserDataType[] => state.users.entities;

export const selectSingleUserById = (state: RootState, userId: string): UserDataType | undefined =>
    state.users.entities.find((user) => user._id === userId);

export const selectLoginUser = (state: RootState): UserDataType | null => state.users.loginUser

export const usersStatus = (state: RootState): UsersStateType["status"] => state.users.status;

export const usersError = (state: RootState): UsersStateType["error"] => state.users.error;