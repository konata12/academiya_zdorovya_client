import { ComponentOrderState, DetailsFormDataErrorType, OrderComponent } from '@/app/types/data/details.type';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ComponentOrderState = {
    order: []
};

const newsUpdateDetailsOrderSlice = createSlice({
    name: 'newsUpdateDetailsOrder',
    initialState,
    reducers: {
        setInitialDataOnLink(state, action: {payload: OrderComponent[]}) {
            state.order = action.payload
        },
        addDetailsComponent(state, action: {
            payload: OrderComponent
        }) {
            state.order.push(action.payload)
        },
        removeDetailsComponent(state, action: {
            payload: string
        }) {
            state.order = state.order.filter(component => {
                return component.data.orderId !== action.payload
            });
        },
        updateDetailsComponent(state, action: {
            payload: {
                detailsComponent: OrderComponent,
                index: number,
            }
        }) {
            const index = action.payload.index

            state.order[index] = action.payload.detailsComponent
        },
        setDetailsStateOrder(state, action: {
            payload: OrderComponent[]
        }) {
            state.order = action.payload
        },
        setDetailsComponentError(state, action: {
            payload: {
                error: DetailsFormDataErrorType,
                index: number,
            }
        }) {
            const index = action.payload.index

            state.order[index].error = action.payload.error
        },


        resetDetailsComponentsOrder: () => initialState,
    }
})

export const {
    setInitialDataOnLink,

    addDetailsComponent,
    removeDetailsComponent,
    updateDetailsComponent,
    setDetailsStateOrder,
    setDetailsComponentError,

    resetDetailsComponentsOrder,
} = newsUpdateDetailsOrderSlice.actions

export default newsUpdateDetailsOrderSlice.reducer