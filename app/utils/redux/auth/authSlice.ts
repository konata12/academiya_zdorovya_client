import { AccessToken, Auth, Login } from "@/app/types/data/auth.type";
import { ErrorResponse } from "@/app/types/data/response.type";
import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: Auth = {
	accessToken: null,
	status: {
		login: null,
		refresh: null,
	},
	error: {
		login: null,
		refresh: null,
	},
};

export const login = createAsyncThunk(
	"auth/login",
	async ({ userName, password }: Login, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post("auth/login", {
				userName,
				password,
			});
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message: error.response?.data.message || "Unexpected client error",
					statusCode: error.status || 500,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.patch("auth/logout");
		console.log(response);
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			console.log(error);
			const serializableError: ErrorResponse = {
				message: error.response?.data.message || "Unexpected client error",
				statusCode: error.status || 500,
			};
			return rejectWithValue(serializableError);
		}
	}
});

export const refreshTokens = createAsyncThunk(
	"auth/refreshTokens",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post("auth/refresh");
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(0);
		}
	},
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			// LOGIN
			.addCase(login.pending, (state) => {
				state.status.login = "loading";
				state.error.login = null;
			})
			.addCase(login.fulfilled, (state, action: PayloadAction<AccessToken>) => {
				state.status.login = "succeeded";
				state.accessToken = action.payload.access_token;
			})
			.addCase(login.rejected, (state, action) => {
				state.status.login = "failed";
				state.accessToken = null;
				state.error.login = action.payload as ErrorResponse;
			})

			// LOGOUT
			.addCase(logout.pending, (state) => {
				state.accessToken = null;
			})
			.addCase(logout.fulfilled, (state) => {
				console.log("logged out");
				state.accessToken = null;
			})
			.addCase(logout.rejected, (state) => {
				state.accessToken = null;
			})

			// REFRESH
			.addCase(refreshTokens.pending, (state) => {
				state.status.refresh = "loading";
				state.error.refresh = null;
			})
			.addCase(refreshTokens.fulfilled, (state, action: PayloadAction<AccessToken>) => {
				state.status.refresh = "succeeded";
				state.accessToken = action.payload.access_token;
			})
			.addCase(refreshTokens.rejected, (state, action) => {
				state.status.refresh = "failed";
				state.accessToken = null;
				state.error.refresh = action.payload as ErrorResponse;
			});
	},
});

export default authSlice.reducer;
