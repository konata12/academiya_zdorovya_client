import { createSlice } from "@reduxjs/toolkit";
import {
	PriceSectionFormData,
	PricesFromErrorBasicValueType,
	PriceTitleEnumType,
	PriceVariantOptionsEnumType,
} from "@/app/types/data/prices.type";

const initialState: PriceSectionFormData = {
	titles: [
		{
			text: "",
			priceNearTitle: "",
		},
	],
	optionalService: null,
	prices: null,
	errors: {
		titles: [
			{
				text: { message: "" },
				priceNearTitle: { message: "" },
			},
		],
		optionalService: { message: "" },
		prices: [
			{
				title: { message: "" },
				titleDescription: { message: "" },
				meetingCount: { message: "" },
				meetingDuration: { message: "" },
				meetingPrice: { message: "" },
				coursePrice: { message: "" },
			},
		],
		pricesEmpty: { message: "" },
	},
};

// noinspection DuplicatedCode
const pricesCreateFormSlice = createSlice({
	name: "pricesCreateForm",
	initialState,
	reducers: {
		// 	TITLES
		addPricesCreateTitleValue(state) {
			const newIndex = state.titles.length;
			state.titles[newIndex] = {
				text: "",
				priceNearTitle: "",
			};
			state.errors.titles[newIndex] = {
				text: { message: "" },
				priceNearTitle: { message: "" },
			};
		},
		deletePricesCreateTitleValue(state, action: { payload: number }) {
			const index = action.payload;
			state.titles.splice(index, 1);
			state.errors.titles.splice(index, 1);
		},
		setPricesCreateTitleFieldValue(
			state,
			action: {
				payload: {
					field: PriceTitleEnumType;
					value: string;
					index: number;
				};
			},
		) {
			const { field, value, index } = action.payload;
			state.titles[index][field] = value;
			if (value.length > 0) {
				state.errors.titles[index][field].message = "";
			}
		},
		// 	OPTIONAL SERVICE
		setPricesCreateOptionalServiceValue(
			state,
			action: {
				payload: string;
			},
		) {
			state.optionalService = action.payload;
			if (action.payload.length > 0) {
				state.errors.optionalService.message = "";
			}
		},
		// 	PRICES
		addPricesCreatePriceValue(state) {
			if (state.prices) {
				const newIndex = state.prices.length;
				state.prices[newIndex] = {
					title: "",
					titleDescription: "",
					meetingCount: "",
					meetingDuration: "",
					meetingPrice: "",
					coursePrice: "",
				};
				state.errors.prices[newIndex] = {
					title: { message: "" },
					titleDescription: { message: "" },
					meetingCount: { message: "" },
					meetingDuration: { message: "" },
					meetingPrice: { message: "" },
					coursePrice: { message: "" },
				};
			} else {
				state.prices = [
					{
						title: "",
						titleDescription: "",
						meetingCount: "",
						meetingDuration: "",
						meetingPrice: "",
						coursePrice: "",
					},
				];
				state.errors.prices = [
					{
						title: { message: "" },
						titleDescription: { message: "" },
						meetingCount: { message: "" },
						meetingDuration: { message: "" },
						meetingPrice: { message: "" },
						coursePrice: { message: "" },
					},
				];
			}
		},
		deletePricesCreatePriceValue(state, action: { payload: number }) {
			const index = action.payload;
			if (state.prices) {
				state.prices.splice(index, 1);
				state.errors.prices.splice(index, 1);
			}
		},
		setPricesCreatePriceFieldValue(
			state,
			action: {
				payload: {
					field: PriceVariantOptionsEnumType;
					value: string;
					index: number;
				};
			},
		) {
			const { field, value, index } = action.payload;
			if (state.prices) {
				state.prices[index][field] = value;
				if (value.length > 0) {
					state.errors.prices[index][field].message = "";
				}
			}
		},
		// ERRORS
		setPricesCreateTitleFieldValueError(
			state,
			action: {
				payload: {
					field: PriceTitleEnumType;
					message: string;
					index: number;
				};
			},
		) {
			const { field, message, index } = action.payload;
			state.errors.titles[index][field].message = message;
		},
		setPricesCreateBasicValueError(
			state,
			action: {
				payload: {
					field: PricesFromErrorBasicValueType;
					message: string;
				};
			},
		) {
			const { field, message } = action.payload;
			state.errors[field].message = message;
		},
		setPricesCreatePricesFieldValueError(
			state,
			action: {
				payload: {
					field: PriceVariantOptionsEnumType;
					message: string;
					index: number;
				};
			},
		) {
			const { field, message, index } = action.payload;
			if (state.prices) {
				state.errors.prices[index][field].message = message;
			}
		},

		resetPricesCreateFromData: () => initialState,
	},
});

export const {
	// 	TITLES
	addPricesCreateTitleValue,
	deletePricesCreateTitleValue,
	setPricesCreateTitleFieldValue,
	// 	OPTIONAL SERVICE
	setPricesCreateOptionalServiceValue,
	// PRICES
	addPricesCreatePriceValue,
	deletePricesCreatePriceValue,
	setPricesCreatePriceFieldValue,

	// ERRORS
	setPricesCreateTitleFieldValueError,
	setPricesCreateBasicValueError,
	setPricesCreatePricesFieldValueError,

	resetPricesCreateFromData,
} = pricesCreateFormSlice.actions;

// @ts-ignore
export default pricesCreateFormSlice.reducer;
