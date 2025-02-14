// app/store.ts
import authSlice from "@/app/utils/redux/auth/authSlice";
import departmentsSlice from "@/app/utils/redux/departments/departmentsSlice";
import navigationSlice from "@/app/utils/redux/navigation/navigationSlice";
import { configureStore } from "@reduxjs/toolkit";

// Define the root state type
export type RootState = ReturnType<typeof store.getState>;

// Define the app dispatch type
export type AppDispatch = typeof store.dispatch;

// Create the store
const store = configureStore({
    reducer: {
        navigation: navigationSlice,
        
        // API
        auth: authSlice,
        departments: departmentsSlice,
    },
});

export default store;