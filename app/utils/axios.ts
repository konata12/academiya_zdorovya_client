import { refreshTokens } from "@/app/utils/redux/auth/authSlice";
import { store } from "@/app/utils/redux/store";
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

// Request Interceptor: Attach Authorization Header
axiosInstance.interceptors.request.use(
	(config) => {
		const state = store.getState(); // Fetch from redux context or storage
		const accessToken = state.auth.accessToken;
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// Check for 401 Unauthorized error
		if (
			error.response?.status === 401 &&
			originalRequest.url !== "auth/refresh" &&
			!originalRequest._retry
		) {
			originalRequest._retry = true; // Mark the request as retried

			try {
				await store.dispatch(refreshTokens()); // Attempt to refresh the token

				// Retry the original request with the new token
				const state = store.getState();
				const newAccessToken = state.auth.accessToken;
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return axiosInstance(originalRequest); // Retry the request
			} catch (refreshError) {
				console.error("Token refresh failed:", refreshError);

				// Redirect to login page if token refresh fails
				if (typeof window !== "undefined") {
					window.location.href = "/admin/login"; // Use window.location for redirection
				}
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	},
);

export default axiosInstance;
