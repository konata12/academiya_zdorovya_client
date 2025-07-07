import { ComponentOrderState, OrderComponent } from "@/app/types/data/details.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ComponentOrderState = {
    order: []
};

const newsDetailsOrderSlice = createSlice({
    name: 'newsDetailsOrderSlice',
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
        

        resetDetailsComponentsOrder: () => initialState,
    }
})

export const {
    addDetailsComponent,
    removeDetailsComponent,
    updateDetailsComponent,
    setDetailsStateOrder,

    resetDetailsComponentsOrder,
} = newsDetailsOrderSlice.actions

export default newsDetailsOrderSlice.reducer