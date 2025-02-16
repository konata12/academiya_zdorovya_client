import { AccessToken, Auth, Login } from "@/app/types/auth";
import { ErrorResponse } from "@/app/types/response";
import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: Auth = {
    accessToken: null,
    status: null,
    error: {
        login: null,
        refresh: null,
    }
}

export const login = createAsyncThunk("auth/login", async ({
    userName,
    password
}: Login, {
    rejectWithValue
}) => {
    try {
        const response = await axiosInstance.post('auth/login', {
            userName,
            password
        })
        console.log(response)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error)
            const serializableError: ErrorResponse = {
                message: error.response?.data.message || 'Unexpected server error',
                statusCode: error.status || 500
            }
            return rejectWithValue(serializableError)
        }
    }
})

export const refreshTokens = createAsyncThunk("auth/refreshTokens", async (_, {
    rejectWithValue
}) => {
    try {
        const response = await axiosInstance.post('auth/refresh')
        return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(0)
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // LOGIN
            .addCase(login.pending, (state) => {
                state.status = "loading"
                state.error.login = null
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<AccessToken>) => {
                state.status = "succeeded"
                state.accessToken = action.payload.access_token
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed"
                state.error.login = action.payload as ErrorResponse
            })

            // REFRESH
            .addCase(refreshTokens.pending, (state) => {
                state.status = "loading"
                state.accessToken = null
                state.error.refresh = null
            })
            .addCase(refreshTokens.fulfilled, (state, action: PayloadAction<AccessToken>) => {
                state.status = "succeeded"
                state.accessToken = action.payload.access_token
            })
            .addCase(refreshTokens.rejected, (state, action) => {
                state.status = "failed"
                state.error.refresh = action.payload as ErrorResponse
            })
    },
})

export default authSlice.reducer
