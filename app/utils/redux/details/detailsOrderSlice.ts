import { ComponentOrderState, OrderComponent } from "@/app/types/data/details.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ComponentOrderState = {
    order: []
};

const detailsOrderSlice = createSlice({
    name: 'detailsOrderSlice',
    initialState,
    reducers: {
        addDetailsComponent(state, action: {
            payload: OrderComponent
        }) {
            state.order.push(action.payload)
        },
        removeDetailsComponent(state, action: {
            payload: string
        }) {
            state.order = state.order.filter(component => {
                return component.componentData.orderId !== action.payload
            });
        },
        setDetailsStateOrder(state, action: {
            payload: OrderComponent[]
        }) {
            state.order = action.payload
        },
        

        resetDetailsComponentsOrder: () => initialState,
    }
})

export const {
    addDetailsComponent,
    removeDetailsComponent,
    setDetailsStateOrder,

    resetDetailsComponentsOrder,
} = detailsOrderSlice.actions

export default detailsOrderSlice.reducer