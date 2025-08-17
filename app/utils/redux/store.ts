import aboutTreatment from "@/app/utils/redux/about_treatment/aboutTreatmentSlice";
import aboutTreatmentCreateFormSlice from "@/app/utils/redux/about_treatment/aboutTreatmentCreateFormSlice";
import aboutTreatmentsFormUISlice from "@/app/utils/redux/about_treatment/aboutTreatmentsFormUISlice";
import aboutTreatmentUpdateFormSlice from "@/app/utils/redux/about_treatment/aboutTreatmentUpdateFormSlice";
import authSlice from "@/app/utils/redux/auth/authSlice";
import bookingServicesSlice from "@/app/utils/redux/booking_services/bookingServicesSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import departmentsSlice from "@/app/utils/redux/departments/departmentsSlice";
import employeeCreateFormSlice from "@/app/utils/redux/employees/employeeCreateFormSlice";
import employeesFormUISlice from "@/app/utils/redux/employees/employeesFormUISlice";
import employeesSlice from "@/app/utils/redux/employees/employeesSlice";
import employeeUpdateFormSlice from "@/app/utils/redux/employees/employeeUpdateFormSlice";
import navigationSlice from "@/app/utils/redux/navigation/navigationSlice";
import newsCreateDetailsOrderSlice from "@/app/utils/redux/details/news/newsCreateDetailsOrderSlice";
import newsCreateFormSlice from "@/app/utils/redux/news/newsCreateFormSlice";
import newsSlice from "@/app/utils/redux/news/newsSlice";
import newsUpdateDetailsOrderSlice from "@/app/utils/redux/details/news/newsUpdateDetailsOrderSlice";
import newsUpdateFormSlice from "@/app/utils/redux/news/newsUpdateFormSlice";
import pricesCreateFormUiSlice from "@/app/utils/redux/prices/pricesCreateFormUiSlice";
import pricesSlice from "@/app/utils/redux/prices/pricesSlice";
import serviceCreateFormSlice from "@/app/utils/redux/services/serviceCreateFormSlice";
import serviceUpdateFormSlice from "@/app/utils/redux/services/serviceUpdateFormSlice";
import serviceFormUISlice from "@/app/utils/redux/services/serviceFromUISlice";
import servicesSlice from "@/app/utils/redux/services/servicesSlice";
import serviceTypeCreateDetailsOrderSlice from "@/app/utils/redux/details/services/serviceTypeCreateDetailsOrderSlice";
import serviceTypeUpdateDetailsOrderSlice from "@/app/utils/redux/details/services/serviceTypeUpdateDetailsOrderSlice";
import serviceTypeCreateFormSlice from "@/app/utils/redux/services/serviceTypeCreateFormSlice";
import serviceTypeUpdateFormSlice from "@/app/utils/redux/services/serviceTypeUpdateFormSlice";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { PersistPartial } from "redux-persist/es/persistReducer";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";

// REDUCERS

// Define the root state type
export type RootState = ReturnType<typeof store.getState> & PersistPartial;

// Define the app dispatch type
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
	navigation: navigationSlice,
	// UI
	aboutTreatmentsFormUI: aboutTreatmentsFormUISlice,
	pricesCreateFormUI: pricesCreateFormUiSlice,
	employeesFormUI: employeesFormUISlice,
	serviceFormUI: serviceFormUISlice,

	// ABOUT TREATMENT CREATION
	aboutTreatmentCreateForm: aboutTreatmentCreateFormSlice,
	aboutTreatmentUpdateForm: aboutTreatmentUpdateFormSlice,

	// EMPLOYEE CREATION
	employeeCreateForm: employeeCreateFormSlice,
	employeeUpdateForm: employeeUpdateFormSlice,

	// NEWS CREATION
	newsCreateForm: newsCreateFormSlice,
	newsUpdateForm: newsUpdateFormSlice,
	newsCreateDetailsOrder: newsCreateDetailsOrderSlice,
	newsUpdateDetailsOrder: newsUpdateDetailsOrderSlice,

	// SERVICE CREATION
	serviceCreateForm: serviceCreateFormSlice,
	serviceUpdateForm: serviceUpdateFormSlice,
	serviceTypeCreateForm: serviceTypeCreateFormSlice,
	serviceTypeUpdateForm: serviceTypeUpdateFormSlice,
	serviceTypeCreateDetailsOrder: serviceTypeCreateDetailsOrderSlice,
	serviceTypeUpdateDetailsOrder: serviceTypeUpdateDetailsOrderSlice,

	// API
	auth: authSlice,
	aboutTreatment: aboutTreatment,
	bookingServices: bookingServicesSlice,
	departments: departmentsSlice,
	employees: employeesSlice,
	prices: pricesSlice,
	news: newsSlice,
	services: servicesSlice,
});

const storage = createWebStorage("local");
const persistConfig = {
	key: "root",
	version: 1,
	storage,
	blacklist: ["auth"],
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

const persistor = persistStore(store);

export { store, persistor };
