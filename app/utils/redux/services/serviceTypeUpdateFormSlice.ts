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

const serviceTypeUpdateFormSlice = createSlice({
    name: 'serviceTypeUpdateForm',
    initialState,
    reducers: {
        setServiceTypeUpdateFormInitData() {
            const { orderId, ...data } = initialState
            return {
                ...data,
                orderId: uuidv4()
            }
        },
        setServiceTypeUpdateFormDataOnLink(state, action: { payload: ServiceTypeBasicType }) {
            state.title = action.payload.title
            state.description = action.payload.description
            state.backgroundImg = action.payload.backgroundImg
            state.details = action.payload.details
        },
        setServiceTypeUpdateFormTitle(state, action: { payload: string }) {
            state.title = action.payload
        },
        setServiceTypeUpdateFormDescription(state, action: { payload: string }) {
            state.description = action.payload
        },
        setServiceTypeUpdateFormBackgroundImg(state, action: { payload: string }) {
            state.backgroundImg = action.payload
        },
        setServiceTypeUpdateFormDetails(state, action: { payload: DetailsRedactorType }) {
            state.details = action.payload
        },
        setServiceTypeUpdateFormError(state, action: {
            payload: {
                field: ServiceTypesEnumType,
                message: string
            }
        }) {
            const field = action.payload.field
            state.errors[field] = { message: action.payload.message }
        },

        resetServiceTypeUpdateFormData: () => initialState,
    },
    extraReducers(builder) {
        builder
    }
})

export const {
    setServiceTypeUpdateFormInitData,
    setServiceTypeUpdateFormDataOnLink,
    setServiceTypeUpdateFormTitle,
    setServiceTypeUpdateFormDescription,
    setServiceTypeUpdateFormBackgroundImg,
    setServiceTypeUpdateFormDetails,
    setServiceTypeUpdateFormError,

    resetServiceTypeUpdateFormData,
} = serviceTypeUpdateFormSlice.actions

export default serviceTypeUpdateFormSlice.reducer