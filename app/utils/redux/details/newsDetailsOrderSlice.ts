import { ComponentOrderState, OrderComponent } from "@/app/types/data/details.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ComponentOrderState = {
    order: []
};

const newsDetailsOrderSlice = createSlice({
    name: 'newsDetailsOrderSlice',
    initialState,
    reducers: {
        addNewsDetailsComponent(state, action: {
            payload: OrderComponent
        }) {
            state.order.push(action.payload)
        },
        removeNewsDetailsComponent(state, action: {
            payload: string
        }) {
            state.order = state.order.filter(component => {
                return component.componentData.orderId !== action.payload
            });
        },
        updateNewsDetailsComponent(state, action: {
            payload: {
                detailsComponent: OrderComponent,
                index: number,
            }
        }) {
            const index = action.payload.index
            
            state.order[index] = action.payload.detailsComponent
        },
        setNewsDetailsStateOrder(state, action: {
            payload: OrderComponent[]
        }) {
            state.order = action.payload
        },
        

        resetNewsDetailsComponentsOrder: () => initialState,
    }
})

export const {
    addNewsDetailsComponent,
    removeNewsDetailsComponent,
    updateNewsDetailsComponent,
    setNewsDetailsStateOrder,

    resetNewsDetailsComponentsOrder,
} = newsDetailsOrderSlice.actions

export default newsDetailsOrderSlice.reducer