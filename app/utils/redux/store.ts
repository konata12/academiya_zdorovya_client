// app/store.ts
import authSlice from "@/app/utils/redux/auth/authSlice";
import departmentsSlice from "@/app/utils/redux/departments/departmentsSlice";
import navigationSlice from "@/app/utils/redux/navigation/navigationSlice";
import bookingServicesSlice from "@/app/utils/redux/booking_services/bookingServicesSlice";
import pricesSlice from '@/app/utils/redux/prices/pricesSlice';
import pricesCreateFormUiSlice from '@/app/utils/redux/prices/pricesCreateFormUiSlice';
import aboutTreatment from '@/app/utils/redux/about_treatment/aboutTreatmentSlice'
import employeesSlice from '@/app/utils/redux/employees/employeesSlice'
import aboutTreatmentsFormUISlice from '@/app/utils/redux/about_treatment/aboutTreatmentsFormUISlice'
import { configureStore } from "@reduxjs/toolkit";

// Define the root state type
export type RootState = ReturnType<typeof store.getState>;

// Define the app dispatch type
export type AppDispatch = typeof store.dispatch;

// Create the store
const store = configureStore({
    reducer: {
        navigation: navigationSlice,
        // UI
        aboutTreatmentsFormUI: aboutTreatmentsFormUISlice,
        pricesCreateFormUI: pricesCreateFormUiSlice,
        
        // API
        auth: authSlice,
        aboutTreatment: aboutTreatment,
        bookingServices: bookingServicesSlice,
        departments: departmentsSlice,
        employees: employeesSlice,
        prices: pricesSlice,
    },
});

export default store;