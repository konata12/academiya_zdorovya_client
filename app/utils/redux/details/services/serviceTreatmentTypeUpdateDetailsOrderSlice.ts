import { ComponentOrderState, DetailsFormDataErrorType, OrderComponent } from '@/app/types/data/details.type';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ComponentOrderState = {
    order: []
};

const serviceTreatmentTypeUpdateDetailsOrderSlice = createSlice({
    name: 'serviceTreatmentTypeUpdateDetailsOrder',
    initialState,
    reducers: {
        addServiceTreatmentTypeUpdateDetailsComponent(state, action: {
            payload: OrderComponent
        }) {
            state.order.push(action.payload)
        },
        removeServiceTreatmentTypeUpdateDetailsComponent(state, action: {
            payload: string
        }) {
            state.order = state.order.filter(component => {
                return component.data.orderId !== action.payload
            });
        },
        updateServiceTreatmentTypeUpdateDetailsComponent(state, action: {
            payload: {
                detailsComponent: OrderComponent,
                index: number,
            }
        }) {
            const index = action.payload.index

            state.order[index] = action.payload.detailsComponent
        },
        setServiceTreatmentTypeUpdateDetailsStateOrder(state, action: {
            payload: OrderComponent[]
        }) {
            state.order = action.payload
        },
        setServiceTreatmentTypeUpdateDetailsComponentError(state, action: {
            payload: {
                error: DetailsFormDataErrorType,
                index: number,
            }
        }) {
            const index = action.payload.index

            state.order[index].error = action.payload.error
        },


        resetServiceTreatmentTypeUpdateDetailsComponentsOrder: () => initialState,
    }
})

export const {
    addServiceTreatmentTypeUpdateDetailsComponent,
    removeServiceTreatmentTypeUpdateDetailsComponent,
    updateServiceTreatmentTypeUpdateDetailsComponent,
    setServiceTreatmentTypeUpdateDetailsStateOrder,
    setServiceTreatmentTypeUpdateDetailsComponentError,

    resetServiceTreatmentTypeUpdateDetailsComponentsOrder,
} = serviceTreatmentTypeUpdateDetailsOrderSlice.actions

export default serviceTreatmentTypeUpdateDetailsOrderSlice.reducer