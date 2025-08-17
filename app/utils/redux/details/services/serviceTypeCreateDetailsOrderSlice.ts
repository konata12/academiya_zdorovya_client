import {
	ComponentOrderState,
	DetailsFormDataErrorType,
	OrderComponent,
} from "@/app/types/data/details.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ComponentOrderState = {
	order: [],
};

const serviceTypeCreateDetailsOrderSlice = createSlice({
	name: "serviceTypeCreateDetailsOrder",
	initialState,
	reducers: {
		setServiceTypeCreateDetailsInitialDataOnLink(
			state,
			action: { payload: OrderComponent[] },
		) {
			state.order = action.payload;
		},
		addServiceTypeCreateDetailsComponent(
			state,
			action: {
				payload: OrderComponent;
			},
		) {
			state.order.push(action.payload);
		},
		removeServiceTypeCreateDetailsComponent(
			state,
			action: {
				payload: string;
			},
		) {
			state.order = state.order.filter((component) => {
				return component.data.orderId !== action.payload;
			});
		},
		updateServiceTypeCreateDetailsComponent(
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
		setServiceTypeCreateDetailsStateOrder(
			state,
			action: {
				payload: OrderComponent[];
			},
		) {
			state.order = action.payload;
		},
		setServiceTypeCreateDetailsComponentError(
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

		resetServiceTypeCreateDetailsComponentsOrder: () => initialState,
	},
});

export const {
	setServiceTypeCreateDetailsInitialDataOnLink,
	addServiceTypeCreateDetailsComponent,
	removeServiceTypeCreateDetailsComponent,
	updateServiceTypeCreateDetailsComponent,
	setServiceTypeCreateDetailsStateOrder,
	setServiceTypeCreateDetailsComponentError,

	resetServiceTypeCreateDetailsComponentsOrder,
} = serviceTypeCreateDetailsOrderSlice.actions;

export default serviceTypeCreateDetailsOrderSlice.reducer;
