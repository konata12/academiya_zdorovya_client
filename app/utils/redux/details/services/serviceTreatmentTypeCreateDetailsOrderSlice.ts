import { ComponentOrderState, DetailsFormDataErrorType, OrderComponent } from '@/app/types/data/details.type';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ComponentOrderState = {
    order: []
};

const serviceTreatmentTypeCreateDetailsOrderSlice = createSlice({
    name: 'serviceTreatmentTypeCreateDetailsOrder',
    initialState,
    reducers: {
        setServiceTreatmentTypeCreateDetailsInitialDataOnLink(state, action: {payload: OrderComponent[]}) {
            state.order = action.payload
        },
        addServiceTreatmentTypeCreateDetailsComponent(state, action: {
            payload: OrderComponent
        }) {
            state.order.push(action.payload)
        },
        removeServiceTreatmentTypeCreateDetailsComponent(state, action: {
            payload: string
        }) {
            state.order = state.order.filter(component => {
                return component.data.orderId !== action.payload
            });
        },
        updateServiceTreatmentTypeCreateDetailsComponent(state, action: {
            payload: {
                detailsComponent: OrderComponent,
                index: number,
            }
        }) {
            const index = action.payload.index

            state.order[index] = action.payload.detailsComponent
        },
        setServiceTreatmentTypeCreateDetailsStateOrder(state, action: {
            payload: OrderComponent[]
        }) {
            state.order = action.payload
        },
        setServiceTreatmentTypeCreateDetailsComponentError(state, action: {
            payload: {
                error: DetailsFormDataErrorType,
                index: number,
            }
        }) {
            const index = action.payload.index

            state.order[index].error = action.payload.error
        },


        resetServiceTreatmentTypeCreateDetailsComponentsOrder: () => initialState,
    }
})

export const {
    setServiceTreatmentTypeCreateDetailsInitialDataOnLink,
    addServiceTreatmentTypeCreateDetailsComponent,
    removeServiceTreatmentTypeCreateDetailsComponent,
    updateServiceTreatmentTypeCreateDetailsComponent,
    setServiceTreatmentTypeCreateDetailsStateOrder,
    setServiceTreatmentTypeCreateDetailsComponentError,

    resetServiceTreatmentTypeCreateDetailsComponentsOrder,
} = serviceTreatmentTypeCreateDetailsOrderSlice.actions

export default serviceTreatmentTypeCreateDetailsOrderSlice.reducer