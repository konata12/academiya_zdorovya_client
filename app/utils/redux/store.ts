import aboutTreatmentCreateFormSlice from "@/app/utils/redux/about_treatment/aboutTreatmentCreateFormSlice";
import aboutTreatmentsFormUISlice from "@/app/utils/redux/about_treatment/aboutTreatmentsFormUISlice";
import aboutTreatment from "@/app/utils/redux/about_treatment/aboutTreatmentSlice";
import aboutTreatmentUpdateFormSlice from "@/app/utils/redux/about_treatment/aboutTreatmentUpdateFormSlice";
import authSlice from "@/app/utils/redux/auth/authSlice";
import bookingSlice from "@/app/utils/redux/booking/bookingSlice";
import bookingServicesSlice from "@/app/utils/redux/booking_services/bookingServicesSlice";
import departmentsContentFormSlice from "@/app/utils/redux/departments/departmentsContentFormSlice";
import departmentsSlice from "@/app/utils/redux/departments/departmentsSlice";
import privacyPolicyUpdateDetailsOrderSlice from "@/app/utils/redux/details/legal_information/privacyPolicyUpdateDetailsOrderSlice";
import publicOfferUpdateDetailsOrderSlice from "@/app/utils/redux/details/legal_information/publicOfferUpdateDetailsOrderSlice";
import newsCreateDetailsOrderSlice from "@/app/utils/redux/details/news/newsCreateDetailsOrderSlice";
import newsUpdateDetailsOrderSlice from "@/app/utils/redux/details/news/newsUpdateDetailsOrderSlice";
import serviceTypeCreateDetailsOrderSlice from "@/app/utils/redux/details/services/serviceTypeCreateDetailsOrderSlice";
import serviceTypeUpdateDetailsOrderSlice from "@/app/utils/redux/details/services/serviceTypeUpdateDetailsOrderSlice";
import employeeCreateFormSlice from "@/app/utils/redux/employees/employeeCreateFormSlice";
import employeesFormUISlice from "@/app/utils/redux/employees/employeesFormUISlice";
import employeesSlice from "@/app/utils/redux/employees/employeesSlice";
import employeeUpdateFormSlice from "@/app/utils/redux/employees/employeeUpdateFormSlice";
import legalInformationSlice from "@/app/utils/redux/legal_information/legalInformationSlice";
import navigationSlice from "@/app/utils/redux/navigation/navigationSlice";
import newsCreateFormSlice from "@/app/utils/redux/news/newsCreateFormSlice";
import newsSlice from "@/app/utils/redux/news/newsSlice";
import newsUpdateFormSlice from "@/app/utils/redux/news/newsUpdateFormSlice";
import pricesCreateFormSlice from "@/app/utils/redux/prices/pricesCreateFormSlice";
import pricesFormUiSlice from "@/app/utils/redux/prices/pricesFormUiSlice";
import pricesSlice from "@/app/utils/redux/prices/pricesSlice";
import pricesUpdateFormSlice from "@/app/utils/redux/prices/pricesUpdateFormSlice";
import serviceCreateFormSlice from "@/app/utils/redux/services/serviceCreateFormSlice";
import serviceFormUISlice from "@/app/utils/redux/services/serviceFromUISlice";
import servicesSlice from "@/app/utils/redux/services/servicesSlice";
import serviceTypeCreateFormSlice from "@/app/utils/redux/services/serviceTypeCreateFormSlice";
import serviceTypeUpdateFormSlice from "@/app/utils/redux/services/serviceTypeUpdateFormSlice";
import serviceUpdateFormSlice from "@/app/utils/redux/services/serviceUpdateFormSlice";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
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
import { PersistPartial } from "redux-persist/es/persistReducer";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// REDUCERS

// Define the root state type
export type RootState = ReturnType<typeof store.getState> & PersistPartial;

// Define the app dispatch type
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
	navigation: navigationSlice,
	// UI
	aboutTreatmentsFormUI: aboutTreatmentsFormUISlice,
	pricesFormUI: pricesFormUiSlice,
	employeesFormUI: employeesFormUISlice,
	serviceFormUI: serviceFormUISlice,

	// ABOUT TREATMENT CREATION
	aboutTreatmentCreateForm: aboutTreatmentCreateFormSlice,
	aboutTreatmentUpdateForm: aboutTreatmentUpdateFormSlice,

	// DEPARTMENT CONTENT CREATION
	departmentsContentForm: departmentsContentFormSlice,

	// EMPLOYEE CREATION
	employeeCreateForm: employeeCreateFormSlice,
	employeeUpdateForm: employeeUpdateFormSlice,

	// LEGAL INFORMATION CREATION
	privacyPolicyUpdateDetailsOrder: privacyPolicyUpdateDetailsOrderSlice,
	publicOfferUpdateDetailsOrder: publicOfferUpdateDetailsOrderSlice,

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

	// PRICES CREATION
	pricesCreateForm: pricesCreateFormSlice,
	pricesUpdateForm: pricesUpdateFormSlice,

	// API
	auth: authSlice,
	aboutTreatment: aboutTreatment,
	booking: bookingSlice,
	bookingServices: bookingServicesSlice,
	departments: departmentsSlice,
	employees: employeesSlice,
	legalInformation: legalInformationSlice,
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
