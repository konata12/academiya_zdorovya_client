import {
	ComponentOrderState,
	DetailsFormDataErrorType,
	OrderComponent,
} from "@/app/types/data/details.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ComponentOrderState = {
	order: [],
};

const publicOfferUpdateDetailsOrderSlice = createSlice({
	name: "publicOfferUpdateDetailsOrder",
	initialState,
	reducers: {
		addPublicOfferDetailsComponent(
			state,
			action: {
				payload: OrderComponent;
			},
		) {
			state.order.push(action.payload);
		},
		removePublicOfferDetailsComponent(
			state,
			action: {
				payload: string;
			},
		) {
			state.order = state.order.filter((component) => {
				return component.data.orderId !== action.payload;
			});
		},
		updatePublicOfferDetailsComponent(
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
		setPublicOfferDetailsStateOrder(
			state,
			action: {
				payload: OrderComponent[];
			},
		) {
			state.order = action.payload;
		},
		setPublicOfferDetailsComponentError(
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

		resetPublicOfferDetailsComponentsOrder: () => initialState,
	},
});

export const {
	addPublicOfferDetailsComponent,
	removePublicOfferDetailsComponent,
	updatePublicOfferDetailsComponent,
	setPublicOfferDetailsStateOrder,
	setPublicOfferDetailsComponentError,

	resetPublicOfferDetailsComponentsOrder,
} = publicOfferUpdateDetailsOrderSlice.actions;

export default publicOfferUpdateDetailsOrderSlice.reducer;
