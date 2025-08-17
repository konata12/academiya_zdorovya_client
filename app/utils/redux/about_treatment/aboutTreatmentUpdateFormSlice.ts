import {
	AboutTreatment,
	AboutTreatmentEnum,
	AboutTreatmentFormData,
} from "@/app/types/data/about_treatment.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AboutTreatmentFormData = {
	title: "",
	treatmentTypes: [""],
	image: null,
	errors: {
		title: { message: "" },
		treatmentTypes: [{ message: "" }],
		image: { message: "" },
	},
};

const aboutTreatmentUpdateFormSlice = createSlice({
	name: "aboutTreatmentUpdateForm",
	initialState,
	reducers: {
		// SET VALUES
		setAllAboutTreatmentDataOnLink(state, action: { payload: AboutTreatment }) {
			state.title = action.payload.title;
			state.treatmentTypes = action.payload.treatmentTypes;
			state.image = action.payload.image;
			state.errors = {
				title: { message: "" },
				treatmentTypes: Array(action.payload.treatmentTypes.length).fill({
					message: "",
				}),
				image: { message: "" },
			};
		},
		setAboutTreatmentUpdateTitle(state, action: PayloadAction<string>) {
			state.title = action.payload;
		},
		addAboutTreatmentUpdateTreatmentType(state) {
			const length = state.treatmentTypes.length;
			state.treatmentTypes[length] = "";
			state.errors.treatmentTypes[length] = { message: "" };
		},
		setAboutTreatmentUpdateTreatmentType(
			state,
			action: {
				payload: { index: number; value: string };
			},
		) {
			const { index, value } = action.payload;
			state.treatmentTypes[index] = value;
		},
		deleteAboutTreatmentUpdateTreatmentType(state, action: { payload: number }) {
			const index = action.payload;
			state.treatmentTypes.splice(index, 1);
			state.errors.treatmentTypes.splice(index, 1);
		},
		setAboutTreatmentUpdateImage(state, action: PayloadAction<string>) {
			state.image = action.payload;
		},

		// SET ERRORS
		setAboutTreatmentUpdateBasicValueError(
			state,
			action: {
				payload: {
					field: AboutTreatmentEnum.TITLE | AboutTreatmentEnum.IMG;
					message: string;
				};
			},
		) {
			const field = action.payload.field;
			state.errors[field] = { message: action.payload.message };
		},
		setAboutTreatmentUpdateTreatmentTypesValueError(
			state,
			action: {
				payload: {
					index: number;
					message: string;
				};
			},
		) {
			const index = action.payload.index;
			state.errors[AboutTreatmentEnum.TREATMENTTYPES][index] = {
				message: action.payload.message,
			};
		},

		// RESET FORM
		resetAboutTreatmentUpdateForm: () => initialState,
	},
});

export const {
	setAllAboutTreatmentDataOnLink,
	setAboutTreatmentUpdateTitle,
	addAboutTreatmentUpdateTreatmentType,
	setAboutTreatmentUpdateTreatmentType,
	deleteAboutTreatmentUpdateTreatmentType,
	setAboutTreatmentUpdateImage,

	setAboutTreatmentUpdateBasicValueError,
	setAboutTreatmentUpdateTreatmentTypesValueError,

	resetAboutTreatmentUpdateForm,
} = aboutTreatmentUpdateFormSlice.actions;

export default aboutTreatmentUpdateFormSlice.reducer;
