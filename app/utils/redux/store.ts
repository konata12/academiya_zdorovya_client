import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// REDUCERS
import authSlice from "@/app/utils/redux/auth/authSlice";
import departmentsSlice from "@/app/utils/redux/departments/departmentsSlice";
import navigationSlice from "@/app/utils/redux/navigation/navigationSlice";
import bookingServicesSlice from "@/app/utils/redux/booking_services/bookingServicesSlice";
import pricesSlice from '@/app/utils/redux/prices/pricesSlice';
import pricesCreateFormUiSlice from '@/app/utils/redux/prices/pricesCreateFormUiSlice';
import aboutTreatment from '@/app/utils/redux/about_treatment/aboutTreatmentSlice'
import employeesSlice from '@/app/utils/redux/employees/employeesSlice'
import employeesFormUISlice from '@/app/utils/redux/employees/employeesFormUISlice'
import aboutTreatmentsFormUISlice from '@/app/utils/redux/about_treatment/aboutTreatmentsFormUISlice'
import newsSlice from '@/app/utils/redux/news/newsSlice'
import newsFormSlice from '@/app/utils/redux/news/newsFormSlice'
import newsDetailsOrderSlice from '@/app/utils/redux/details/newsDetailsOrderSlice'

// Define the root state type
export type RootState = ReturnType<typeof store.getState>;

// Define the app dispatch type
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
    navigation: navigationSlice,
    // UI
    aboutTreatmentsFormUI: aboutTreatmentsFormUISlice,
    pricesCreateFormUI: pricesCreateFormUiSlice,
    employeesFormUI: employeesFormUISlice,

    // NEWS CREATION
    newsForm: newsFormSlice,
    newsDetailsOrder: newsDetailsOrderSlice,

    // API
    auth: authSlice,
    aboutTreatment: aboutTreatment,
    bookingServices: bookingServicesSlice,
    departments: departmentsSlice,
    employees: employeesSlice,
    prices: pricesSlice,
    news: newsSlice,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: [
        'newsDetailsOrder',
        'newsForm',
        'news',
    ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store)

export { store, persistor };