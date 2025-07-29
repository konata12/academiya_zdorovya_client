import { AboutTreatmentEnum, AboutTreatmentFormData } from "@/app/types/data/about_treatment.type"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: AboutTreatmentFormData = {
    title: '',
    treatmentTypes: [''],
    image: null,
    errors: {
        title: { message: '' },
        treatmentTypes: [{ message: '' }],
        image: { message: '' },
    }
}

const aboutTreatmentCreateFormSlice = createSlice({
    name: 'aboutTreatmentCreateForm',
    initialState,
    reducers: {
        // SET VALUES
        setAboutTreatmentCreateTitle(state, action: PayloadAction<string>) {
            state.title = action.payload
        },
        addAboutTreatmentCreateTreatmentType(state) {
            const length = state.treatmentTypes.length
            state.treatmentTypes[length] = ''
            state.errors.treatmentTypes[length] = { message: '' }
        },
        setAboutTreatmentCreateTreatmentType(state, action: {
            payload: { index: number, value: string }
        }) {
            const { index, value } = action.payload
            state.treatmentTypes[index] = value
        },
        deleteAboutTreatmentCreateTreatmentType(state, action: { payload: number }) {
            const index = action.payload
            state.treatmentTypes.splice(index, 1)
            state.errors.treatmentTypes.splice(index, 1)
        },
        setAboutTreatmentCreateImage(state, action: PayloadAction<string>) {
            state.image = action.payload
        },

        // SET ERRORS
        setAboutTreatmentCreateBasicValueError(state, action: {
            payload: {
                field: AboutTreatmentEnum.TITLE | AboutTreatmentEnum.IMG,
                message: string
            }
        }) {
            const field = action.payload.field
            state.errors[field] = { message: action.payload.message }
        },
        setAboutTreatmentCreateTreatmentTypesValueError(state, action: {
            payload: {
                index: number,
                message: string
            }
        }) {
            const index = action.payload.index
            state.errors[AboutTreatmentEnum.TREATMENTTYPES][index] = { message: action.payload.message }
        },

        // RESET FORM
        resetAboutTreatmentCreateForm: () => initialState,
    }
})

export const {
    setAboutTreatmentCreateTitle,
    addAboutTreatmentCreateTreatmentType,
    setAboutTreatmentCreateTreatmentType,
    deleteAboutTreatmentCreateTreatmentType,
    setAboutTreatmentCreateImage,

    setAboutTreatmentCreateBasicValueError,
    setAboutTreatmentCreateTreatmentTypesValueError,

    resetAboutTreatmentCreateForm,
} = aboutTreatmentCreateFormSlice.actions

export default aboutTreatmentCreateFormSlice.reducer