import {
	ComponentOrderState,
	DetailsFormDataErrorType,
	OrderComponent,
} from "@/app/types/data/details.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ComponentOrderState = {
	order: [],
};

const privacyPolicyUpdateDetailsOrderSlice = createSlice({
	name: "privacyPolicyUpdateDetailsOrder",
	initialState,
	reducers: {
		addPrivacyPolicyDetailsComponent(
			state,
			action: {
				payload: OrderComponent;
			},
		) {
			state.order.push(action.payload);
		},
		removePrivacyPolicyDetailsComponent(
			state,
			action: {
				payload: string;
			},
		) {
			state.order = state.order.filter((component) => {
				return component.data.orderId !== action.payload;
			});
		},
		updatePrivacyPolicyDetailsComponent(
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
		setPrivacyPolicyDetailsStateOrder(
			state,
			action: {
				payload: OrderComponent[];
			},
		) {
			state.order = action.payload;
		},
		setPrivacyPolicyDetailsComponentError(
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

		resetPrivacyPolicyDetailsComponentsOrder: () => initialState,
	},
});

export const {
	addPrivacyPolicyDetailsComponent,
	removePrivacyPolicyDetailsComponent,
	updatePrivacyPolicyDetailsComponent,
	setPrivacyPolicyDetailsStateOrder,
	setPrivacyPolicyDetailsComponentError,

	resetPrivacyPolicyDetailsComponentsOrder,
} = privacyPolicyUpdateDetailsOrderSlice.actions;

export default privacyPolicyUpdateDetailsOrderSlice.reducer;
