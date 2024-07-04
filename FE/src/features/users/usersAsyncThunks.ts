import { createAsyncThunk } from "@reduxjs/toolkit"
import axios, {AxiosRequestConfig} from "axios"
import { UserDataType } from "../../types/usersType";

export const fetchUsers = createAsyncThunk<UserDataType[], AxiosRequestConfig>(
    "users/fetchUsers",
    async (config) => {
        const { data } = await axios.get(`${process.env.REACT_APP_USER_API_URL}`, config);
        if (!data) {
            throw new Error("Failed  to 'fetchPosts' no response.");
        }
        return data;
    }
)

export const fetchUserProfile = createAsyncThunk<UserDataType, AxiosRequestConfig>(
    "users/fetchUserProfile",
    async (config) => {
        const { data } = await axios.get(`${process.env.REACT_APP_USER_API_URL}`, config);
        if (!data) {
            throw new Error("Failed  to 'fetchPosts' no response.");
        }
        return data;
    }
)
