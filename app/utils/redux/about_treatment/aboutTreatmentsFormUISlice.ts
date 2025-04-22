import { AboutTreatmentFormUI } from "@/app/types/data/about_treatment";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AboutTreatmentFormUI = {
    treatmentTypesModalIsOpen: []
}

const aboutTreatmentsFormUISlice = createSlice({
    name: 'aboutTreatmentsFormUI',
    initialState,
    reducers: {
        openTreatmentTypeModal(state, action: { payload: { index: number } }) {
            const index = action.payload.index
            state.treatmentTypesModalIsOpen[index] = true
        },
        closeTreatmentTypeModal(state, action: { payload: { index: number } }) {
            const index = action.payload.index
            state.treatmentTypesModalIsOpen[index] = false
        },

        addTreatmentTypeModal(state) {
            state.treatmentTypesModalIsOpen.push(false)
        },
        deleteTreatmentTypeModal(state, action: { payload: { index: number } }) {
            const index = action.payload.index
            if (state.treatmentTypesModalIsOpen.length > 1) {
                state.treatmentTypesModalIsOpen.splice(index, 1)
            }
        },
    }
})

export const {
    openTreatmentTypeModal,
    closeTreatmentTypeModal,
    addTreatmentTypeModal,
    deleteTreatmentTypeModal
} = aboutTreatmentsFormUISlice.actions

export default aboutTreatmentsFormUISlice.reducer