import { AboutTreatmentFormUI } from "@/app/types/data/about_treatment.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AboutTreatmentFormUI = {
	treatmentTypesModalIsOpen: [],
};

const aboutTreatmentsFormUISlice = createSlice({
	name: "aboutTreatmentsFormUI",
	initialState,
	reducers: {
		openTreatmentTypeModal(state, action: { payload: number }) {
			const index = action.payload;
			state.treatmentTypesModalIsOpen[index] = true;
		},
		closeTreatmentTypeModal(state, action: { payload: number }) {
			const index = action.payload;
			state.treatmentTypesModalIsOpen[index] = false;
		},

		addTreatmentTypeModal(state) {
			state.treatmentTypesModalIsOpen.push(false);
		},
		deleteTreatmentTypeModal(state, action: { payload: { index: number } }) {
			const index = action.payload.index;
			if (state.treatmentTypesModalIsOpen.length > 1) {
				state.treatmentTypesModalIsOpen.splice(index, 1);
			}
		},
		setAboutTreatmentsFormUISliceDefaultValues(
			state,
			action: PayloadAction<number>,
		) {
			state.treatmentTypesModalIsOpen = Array(action.payload).fill(false);
		},
	},
});

export const {
	openTreatmentTypeModal,
	closeTreatmentTypeModal,
	addTreatmentTypeModal,
	deleteTreatmentTypeModal,

	setAboutTreatmentsFormUISliceDefaultValues,
} = aboutTreatmentsFormUISlice.actions;

export default aboutTreatmentsFormUISlice.reducer;
