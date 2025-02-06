import { useAuth } from "@/app/utils/context/authContext";
import { getAccessTokenGlob, setAccessTokenGlob } from "@/app/utils/data_stores/tokens_store";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
})

// Request Interceptor: Attach Authorization Header
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = getAccessTokenGlob() // Fetch from React context or storage
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export const useAdminApi = () => {
    const { setAccessToken } = useAuth(); // Get token setter for context

    // 🔹 Handle 401 Errors & Refresh Token
    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                try {
                    const response = await axios.post(
                        "/auth/refresh",
                        {},
                    );

                    const newToken = response.data.access_token;
                    setAccessToken(newToken); // ✅ Update Context
                    setAccessTokenGlob(newToken)

                    // Retry failed request with new token
                    error.config.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(error.config);
                } catch (refreshError) {
                    console.error("Refresh token failed:", refreshError);
                    setAccessToken(null)
                    setAccessTokenGlob(null)
                    window.location.href = "/admin/login"; // Redirect if refresh fails
                }
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default axiosInstance