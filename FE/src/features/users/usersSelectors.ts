import { RootState } from '../../app/store';
import { UserDataType, UsersStateType } from '../../types/usersType'; // Ensure this path is correct

export const selectAllUsers = (state: RootState): UserDataType[] => state.users.entities;

// 특정 유저에 대한 정보를 불러오는 셀렉터. unique property로 불러와야함.
// export const selectSingleUserById = (state: RootState, userId: string): UserData | undefined =>
//     state.users.entities.find((user) => user._id === userId);

export const usersStatus = (state: RootState): UsersStateType["status"] => state.users.status;

export const usersError = (state: RootState): UsersStateType["error"] => state.users.error;