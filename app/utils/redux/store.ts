// app/store.ts
import { authSlice } from "@/app/utils/redux/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";

// Define the root state type
export type RootState = ReturnType<typeof store.getState>;

// Define the app dispatch type
export type AppDispatch = typeof store.dispatch;

// Create the store
const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
});

export default store;