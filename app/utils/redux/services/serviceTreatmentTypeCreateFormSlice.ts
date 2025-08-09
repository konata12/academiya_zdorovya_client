import { createSlice } from '@reduxjs/toolkit';
import { DetailsRedactorType } from '@/app/types/data/details.type';
import { ServiceTreatmentType, ServiceTreatmentBasicType, ServiceTreatmentTypeFormData, ServiceTreatmentTypesEnumType } from '@/app/types/data/services.type';
import { v4 as uuidv4 } from 'uuid';

const initialState: ServiceTreatmentTypeFormData = {
    orderId: '',
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

const serviceTreatmentTypeCreateFormSlice = createSlice({
    name: 'serviceTreatmentTypeCreateForm',
    initialState,
    reducers: {
        setServiceTreatmentTypeCreateFormInitData() {
            const { orderId, ...data } = initialState
            return {
                ...data,
                orderId: uuidv4()
            }
        },
        setServiceTreatmentTypeCreateFormDataOnLink(state, action: { payload: ServiceTreatmentBasicType }) {
            state.title = action.payload.title
            state.description = action.payload.description
            state.backgroundImg = action.payload.backgroundImg
            state.details = action.payload.details
        },
        setServiceTreatmentTypeCreateFormTitle(state, action: { payload: string }) {
            state.title = action.payload
        },
        setServiceTreatmentTypeCreateFormDescription(state, action: { payload: string }) {
            state.description = action.payload
        },
        setServiceTreatmentTypeCreateFormBackgroundImg(state, action: { payload: string }) {
            state.backgroundImg = action.payload
        },
        setServiceTreatmentTypeCreateFormDetails(state, action: { payload: DetailsRedactorType }) {
            state.details = action.payload
        },
        setServiceTreatmentTypeCreateFormError(state, action: {
            payload: {
                field: ServiceTreatmentTypesEnumType,
                message: string
            }
        }) {
            const field = action.payload.field
            state.errors[field] = { message: action.payload.message }
        },

        resetServiceTreatmentTypeCreateFormData: () => initialState,
    },
    extraReducers(builder) {
        builder
    }
})

export const {
    setServiceTreatmentTypeCreateFormInitData,
    setServiceTreatmentTypeCreateFormDataOnLink,
    setServiceTreatmentTypeCreateFormTitle,
    setServiceTreatmentTypeCreateFormDescription,
    setServiceTreatmentTypeCreateFormBackgroundImg,
    setServiceTreatmentTypeCreateFormDetails,
    setServiceTreatmentTypeCreateFormError,

    resetServiceTreatmentTypeCreateFormData,
} = serviceTreatmentTypeCreateFormSlice.actions

export default serviceTreatmentTypeCreateFormSlice.reducer