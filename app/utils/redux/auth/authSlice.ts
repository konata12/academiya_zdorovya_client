import { ErrorResponse } from "@/app/types/response";
import axiosInstance from "@/app/utils/axios";
import { AccessToken } from "@/app/utils/redux/auth/types";
import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface Auth {
    accessToken: string | null
    status: null
    | 'loading'
    | 'succeeded'
    | 'failed'
    error: ErrorResponse | null
}

export interface Login {
    userName: string
    password: string
}

const initialState: Auth = {
    accessToken: null,
    status: null,
    error: null
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
                message: error.response?.data.message,
                statusCode: error.status || 500
            }
            return rejectWithValue(serializableError)
        }
    }
})

export const refreshTokens = createAsyncThunk("auth/refreshTokens", async (empty, {
    rejectWithValue
}) => {
    try {
        const response = await axiosInstance.post('auth/refresh')
        console.log(response)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error)
            const serializableError: ErrorResponse = {
                message: error.response?.data.message,
                statusCode: error.status || 500
            }
            return rejectWithValue(serializableError)
        }
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
                state.accessToken = null
                state.error = null
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<AccessToken>) => {
                state.status = "succeeded"
                state.accessToken = action.payload.access_token
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload as ErrorResponse
            })

            // REFRESH
            .addCase(refreshTokens.pending, (state) => {
                state.status = "loading"
                state.accessToken = null
                state.error = null
            })
            .addCase(refreshTokens.fulfilled, (state, action: PayloadAction<AccessToken>) => {
                state.status = "succeeded"
                state.accessToken = action.payload.access_token
            })
            .addCase(refreshTokens.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload as ErrorResponse
            })
    },
})

// Export the actions
// export const { increment, decrement, incrementByAmount } = authSlice.actions

// Export the reducer
export default authSlice.reducer