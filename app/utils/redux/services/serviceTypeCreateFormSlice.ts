import { createSlice } from '@reduxjs/toolkit';
import { DetailsRedactorType } from '@/app/types/data/details.type';
import { ServiceTypeBasicType, ServiceTypeFormData, ServiceTypesEnumType } from '@/app/types/data/services.type';
import { v4 as uuidv4 } from 'uuid';

const initialState: ServiceTypeFormData = {
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

const serviceTypeCreateFormSlice = createSlice({
    name: 'serviceTypeCreateForm',
    initialState,
    reducers: {
        setServiceTypeCreateFormInitData() {
            const { orderId, ...data } = initialState
            return {
                ...data,
                orderId: uuidv4()
            }
        },
        setServiceTypeCreateFormDataOnLink(state, action: { payload: ServiceTypeBasicType }) {
            state.title = action.payload.title
            state.description = action.payload.description
            state.backgroundImg = action.payload.backgroundImg
            state.details = action.payload.details
        },
        setServiceTypeCreateFormTitle(state, action: { payload: string }) {
            state.title = action.payload
        },
        setServiceTypeCreateFormDescription(state, action: { payload: string }) {
            state.description = action.payload
        },
        setServiceTypeCreateFormBackgroundImg(state, action: { payload: string }) {
            state.backgroundImg = action.payload
        },
        setServiceTypeCreateFormDetails(state, action: { payload: DetailsRedactorType }) {
            state.details = action.payload
        },
        setServiceTypeCreateFormError(state, action: {
            payload: {
                field: ServiceTypesEnumType,
                message: string
            }
        }) {
            const field = action.payload.field
            state.errors[field] = { message: action.payload.message }
        },

        resetServiceTypeCreateFormData: () => initialState,
    },
    extraReducers(builder) {
        builder
    }
})

export const {
    setServiceTypeCreateFormInitData,
    setServiceTypeCreateFormDataOnLink,
    setServiceTypeCreateFormTitle,
    setServiceTypeCreateFormDescription,
    setServiceTypeCreateFormBackgroundImg,
    setServiceTypeCreateFormDetails,
    setServiceTypeCreateFormError,

    resetServiceTypeCreateFormData,
} = serviceTypeCreateFormSlice.actions

export default serviceTypeCreateFormSlice.reducer