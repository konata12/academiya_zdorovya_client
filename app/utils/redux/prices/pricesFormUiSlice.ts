import { PriceFormDataWithoutError, PriceSectionUI } from "@/app/types/data/prices.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: PriceSectionUI = {
	addTitlePriceCheckbox: [false],

	optionalServiceCheckbox: false,

	addPriceVariantDescriptionCheckbox: [],
	priceVariantsCheckbox: false,
	meetingCountCheckbox: false,
	meetingDurationCheckbox: false,
	meetingPriceCheckbox: false,
	meetingTotalPriceCheckbox: false,
};

const pricesFormUiSlice = createSlice({
	name: "pricesFormUi",
	initialState,
	reducers: {
		// TITLES
		triggerTitleCheckbox(
			state,
			action: {
				payload: {
					index: number;
					state: boolean;
				};
			},
		) {
			state.addTitlePriceCheckbox[action.payload.index] = action.payload.state;
		},

		createPriceSectionTitle(state) {
			state.addTitlePriceCheckbox.push(false);
		},
		deletePriceSectionTitle(state, action: { payload: number }) {
			const index = action.payload;
			if (state.addTitlePriceCheckbox.length > 1) {
				state.addTitlePriceCheckbox.splice(index, 1);
			}
		},

		// OPTIONAL SERVICE
		triggerOptionalServiceCheckbox(state, action: { payload: boolean }) {
			state.optionalServiceCheckbox = action.payload;
		},

		// PRICE VARIANTS
		triggerPriceVariantsDescriptionCheckbox(
			state,
			action: {
				payload: {
					index: number;
					state: boolean;
				};
			},
		) {
			state.addPriceVariantDescriptionCheckbox[action.payload.index] =
				action.payload.state;
		},

		triggerPriceVariantsCheckbox(state, action: { payload: boolean }) {
			state.priceVariantsCheckbox = action.payload;
		},
		triggerMeetingsCountCheckbox(state, action: { payload: boolean }) {
			state.meetingCountCheckbox = action.payload;
		},
		triggerMeetingDurationCheckbox(state, action: { payload: boolean }) {
			state.meetingDurationCheckbox = action.payload;
		},
		triggerMeetingPriceCheckbox(state, action: { payload: boolean }) {
			state.meetingPriceCheckbox = action.payload;
		},
		triggerMeetingsTotalPriceCheckbox(state, action: { payload: boolean }) {
			state.meetingTotalPriceCheckbox = action.payload;
		},

		createPriceVariant(state) {
			const newIndex = state.addPriceVariantDescriptionCheckbox.length;
			state.addPriceVariantDescriptionCheckbox[newIndex] = false;
		},
		deletePriceVariant(state, action: { payload: number }) {
			const index = action.payload;
			if (state.addPriceVariantDescriptionCheckbox.length > 1) {
				state.addPriceVariantDescriptionCheckbox.splice(index, 1);
			}
		},

		// SET DATA
		setPricesUIFromData(
			state,
			action: {
				payload: PriceFormDataWithoutError;
			},
		) {
			const { titles, optionalService, prices } = action.payload;

			let countCheckbox: boolean = false;
			let durationCheckbox: boolean = false;
			let priceCheckbox: boolean = false;
			let totalPriceCheckbox: boolean = false;

			prices?.forEach((price) => {
				if (price.meetingCount?.length) countCheckbox = true;
				if (price.meetingDuration?.length) durationCheckbox = true;
				if (price.meetingPrice?.length) priceCheckbox = true;
				if (price.coursePrice?.length) totalPriceCheckbox = true;
			});
			return {
				addTitlePriceCheckbox: titles.map((title) => {
					return !!title.priceNearTitle;
				}),

				optionalServiceCheckbox: !!optionalService,

				addPriceVariantDescriptionCheckbox: prices
					? prices.map((price) => {
							return !!price.titleDescription;
						})
					: [],
				priceVariantsCheckbox: !!prices,
				meetingCountCheckbox: countCheckbox,
				meetingDurationCheckbox: durationCheckbox,
				meetingPriceCheckbox: priceCheckbox,
				meetingTotalPriceCheckbox: totalPriceCheckbox,
			};
		},
	},
});

export const {
	// TITLE
	triggerTitleCheckbox,
	createPriceSectionTitle,
	deletePriceSectionTitle,
	// OPTIONAL SERVICE
	triggerOptionalServiceCheckbox,
	// PRICE VARIANTS
	triggerPriceVariantsCheckbox,
	triggerPriceVariantsDescriptionCheckbox,
	triggerMeetingsCountCheckbox,
	triggerMeetingDurationCheckbox,
	triggerMeetingPriceCheckbox,
	triggerMeetingsTotalPriceCheckbox,
	createPriceVariant,
	deletePriceVariant,
	setPricesUIFromData,
} = pricesFormUiSlice.actions;

export default pricesFormUiSlice.reducer;
