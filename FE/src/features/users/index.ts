import { fetchUsers, fetchUserProfile } from "./usersAsyncThunks";
import {
    selectUser,
    usersStatus,
    usersError,
} from "./usersSelectors";
export {
    // redux async thunk function
    fetchUsers,
    fetchUserProfile,
    // redux users selector
    selectUser,
    usersStatus,
    usersError,
}