import { PriceSectionUI } from "@/app/types/prices";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState: PriceSectionUI = {
    addTitlePriceCheckbox: [false],
    optionalService: false,

    addPriceVariantCheckbox: [false],
    priceVariantsCheckbox: false,
    meetingsCount: false,
    meetingDuration: false,
    meetingPrice: false,
    meetingsTotalPrice: false,
}

const pricesCreateFormUiSlice = createSlice({
    name: 'pricesCreateFormUi',
    initialState,
    reducers: {
        // TITLES
        triggerTitleCheckbox(state, action: {
            payload: {
                index: number
                state: boolean
            }
        }) {
            state.addTitlePriceCheckbox[action.payload.index] = action.payload.state
        },

        createPriceSectionTitle(state) {
            state.addTitlePriceCheckbox.push(false)
        },
        deletePriceSectionTitle(state, action: { payload: number }) {
            const index = action.payload
            if (state.addTitlePriceCheckbox.length > 1) {
                state.addTitlePriceCheckbox.splice(index, 1)
            }
        },

        // PRICE VARIANTS
        triggerPriceVariantsDescriptionCheckbox(state, action: {
            payload: {
                index: number
                state: boolean
            }
        }) {
            state.addPriceVariantCheckbox[action.payload.index] = action.payload.state
        },

        triggerPriceVariantsCheckbox(state, action: { payload: boolean }) {
            state.priceVariantsCheckbox = action.payload
        },
        triggerMeetingsCountCheckbox(state, action: { payload: boolean }) {
            state.meetingsCount = action.payload
        },
        triggerMeetingDurationCheckbox(state, action: { payload: boolean }) {
            state.meetingDuration = action.payload
        },
        triggerMeetingPriceCheckbox(state, action: { payload: boolean }) {
            state.meetingPrice = action.payload
        },
        triggerMeetingsTotalPriceCheckbox(state, action: { payload: boolean }) {
            state.meetingsTotalPrice = action.payload
        },

        createPriceVariant(state) {
            state.addPriceVariantCheckbox.push(false)
        },
        deletePriceVariant(state, action: { payload: number }) {
            const index = action.payload
            if (state.addPriceVariantCheckbox.length > 1) {
                state.addPriceVariantCheckbox.splice(index, 1)
            }
        },

        // OPTIONAL SERVICE
        triggerOptionalServiceCheckbox(state, action: { payload: boolean }) {
            state.optionalService = action.payload
        },
    }
})

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
} = pricesCreateFormUiSlice.actions

export default pricesCreateFormUiSlice.reducer