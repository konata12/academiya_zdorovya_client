import { createSlice } from '@reduxjs/toolkit';
import { DetailsRedactorType } from '@/app/types/data/details.type';
import { ServiceTypeFormData, ServiceTypesEnumType } from '@/app/types/data/services.type';

const initialState: ServiceTypeFormData = {
    title: '',
    description: '',
    backgroundImg: null,
    details: null,
    errors: {
        title: { message: '' },
        description: { message: '' },
        backgroundImg: { message: '' },
        details: { message: '' },
    }
}

const serviceTreatmentTypeUpdateFormSlice = createSlice({
    name: 'serviceTreatmentTypeUpdateForm',
    initialState,
    reducers: {
        setServiceTreatmentTypeUpdateFormTitle(state, action: { payload: string }) {
            state.title = action.payload
        },
        setServiceTreatmentTypeUpdateFormDescription(state, action: { payload: string }) {
            state.description = action.payload
        },
        setServiceTreatmentTypeUpdateFormBackgroundImg(state, action: { payload: string }) {
            state.backgroundImg = action.payload
        },
        setServiceTreatmentTypeUpdateFormDetails(state, action: { payload: DetailsRedactorType }) {
            state.details = action.payload
        },
        setServiceTreatmentTypeUpdateFormError(state, action: {
            payload: {
                field: ServiceTypesEnumType,
                message: string
            }
        }) {
            const field = action.payload.field
            state.errors[field] = { message: action.payload.message }
        },

        resetServiceTreatmentTypeUpdateFormData: () => initialState,
    },
    extraReducers(builder) {
        builder
    }
})

export const {
    setServiceTreatmentTypeUpdateFormTitle,
    setServiceTreatmentTypeUpdateFormDescription,
    setServiceTreatmentTypeUpdateFormBackgroundImg,
    setServiceTreatmentTypeUpdateFormDetails,
    setServiceTreatmentTypeUpdateFormError,

    resetServiceTreatmentTypeUpdateFormData,
} = serviceTreatmentTypeUpdateFormSlice.actions

export default serviceTreatmentTypeUpdateFormSlice.reducer