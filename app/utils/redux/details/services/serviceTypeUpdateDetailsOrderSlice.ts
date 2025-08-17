import {
	ComponentOrderState,
	DetailsFormDataErrorType,
	OrderComponent,
} from "@/app/types/data/details.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ComponentOrderState = {
	order: [],
};

const serviceTypeUpdateDetailsOrderSlice = createSlice({
	name: "serviceTypeUpdateDetailsOrder",
	initialState,
	reducers: {
		setServiceTypeUpdateDetailsInitialDataOnLink(
			state,
			action: { payload: OrderComponent[] },
		) {
			state.order = action.payload;
		},
		addServiceTypeUpdateDetailsComponent(
			state,
			action: {
				payload: OrderComponent;
			},
		) {
			state.order.push(action.payload);
		},
		removeServiceTypeUpdateDetailsComponent(
			state,
			action: {
				payload: string;
			},
		) {
			state.order = state.order.filter((component) => {
				return component.data.orderId !== action.payload;
			});
		},
		updateServiceTypeUpdateDetailsComponent(
			state,
			action: {
				payload: {
					detailsComponent: OrderComponent;
					index: number;
				};
			},
		) {
			const index = action.payload.index;

			state.order[index] = action.payload.detailsComponent;
		},
		setServiceTypeUpdateDetailsStateOrder(
			state,
			action: {
				payload: OrderComponent[];
			},
		) {
			state.order = action.payload;
		},
		setServiceTypeUpdateDetailsComponentError(
			state,
			action: {
				payload: {
					error: DetailsFormDataErrorType;
					index: number;
				};
			},
		) {
			const index = action.payload.index;

			state.order[index].error = action.payload.error;
		},

		resetServiceTypeUpdateDetailsComponentsOrder: () => initialState,
	},
});

export const {
	setServiceTypeUpdateDetailsInitialDataOnLink,
	addServiceTypeUpdateDetailsComponent,
	removeServiceTypeUpdateDetailsComponent,
	updateServiceTypeUpdateDetailsComponent,
	setServiceTypeUpdateDetailsStateOrder,
	setServiceTypeUpdateDetailsComponentError,

	resetServiceTypeUpdateDetailsComponentsOrder,
} = serviceTypeUpdateDetailsOrderSlice.actions;

export default serviceTypeUpdateDetailsOrderSlice.reducer;
