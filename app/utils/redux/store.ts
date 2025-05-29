// app/store.ts
import authSlice from "@/app/utils/redux/auth/authSlice";
import departmentsSlice from "@/app/utils/redux/departments/departmentsSlice";
import bookingServicesSlice from "@/app/utils/redux/booking_services/bookingServicesSlice";
import pricesSlice from '@/app/utils/redux/prices/pricesSlice';
import pricesCreateFormUiSlice from '@/app/utils/redux/prices/pricesCreateFormUiSlice';
import aboutTreatment from '@/app/utils/redux/about_treatment/aboutTreatmentSlice'
import employeesSlice from '@/app/utils/redux/employees/employeesSlice'
import employeesFormUISlice from '@/app/utils/redux/employees/employeesFormUISlice'
import sideNavigationUISlice from '@/app/utils/redux/side_navigation/sideNavigationUISlice'
import aboutTreatmentsFormUISlice from '@/app/utils/redux/about_treatment/aboutTreatmentsFormUISlice'
import newsSlice from '@/app/utils/redux/news/newsSlice'
import detailsOrderSlice from '@/app/utils/redux/details/detailsOrderSlice'
import { configureStore } from "@reduxjs/toolkit";

// Define the root state type
export type RootState = ReturnType<typeof store.getState>;

// Define the app dispatch type
export type AppDispatch = typeof store.dispatch;

// Create the store
const store = configureStore({
    reducer: {
        // UI
        aboutTreatmentsFormUI: aboutTreatmentsFormUISlice,
        pricesCreateFormUI: pricesCreateFormUiSlice,
        employeesFormUI: employeesFormUISlice,
        sideNavigationUI: sideNavigationUISlice,

        detailsOrderSlice: detailsOrderSlice,
        
        // API
        auth: authSlice,
        aboutTreatment: aboutTreatment,
        bookingServices: bookingServicesSlice,
        departments: departmentsSlice,
        employees: employeesSlice,
        prices: pricesSlice,
        news: newsSlice,
    },
});

export default store;