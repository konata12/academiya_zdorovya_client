import { PriceSectionUI } from "@/app/types/prices";
import { createSlice } from "@reduxjs/toolkit";

const initialState: PriceSectionUI = {
    addTitlePriceCheckbox: [false],

    optionalServiceCheckbox: false,
    optionalServiceInputHeight: 0,

    priceVariantsHeight: 0,
    addPriceVariantCheckbox: [false],
    priceVariantsCheckbox: false,
    meetingsCountCheckbox: false,
    meetingDurationCheckbox: false,
    meetingPriceCheckbox: false,
    meetingsTotalPriceCheckbox: false,
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

        // OPTIONAL SERVICE
        triggerOptionalServiceCheckbox(state, action: { payload: boolean }) {
            state.optionalServiceCheckbox = action.payload
        },
        setOptionalServiceInputHeight(state, action: { payload: number }) {
            state.optionalServiceInputHeight = action.payload
        },

        // PRICE VARIANTS
        setPriceVariantsHeight(state, action: { payload: number }) {
            state.priceVariantsHeight = action.payload
        },
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
            state.meetingsCountCheckbox = action.payload
        },
        triggerMeetingDurationCheckbox(state, action: { payload: boolean }) {
            state.meetingDurationCheckbox = action.payload
        },
        triggerMeetingPriceCheckbox(state, action: { payload: boolean }) {
            state.meetingPriceCheckbox = action.payload
        },
        triggerMeetingsTotalPriceCheckbox(state, action: { payload: boolean }) {
            state.meetingsTotalPriceCheckbox = action.payload
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
    }
})

export const {
    // TITLE
    triggerTitleCheckbox,
    createPriceSectionTitle,
    deletePriceSectionTitle,
    // OPTIONAL SERVICE
    triggerOptionalServiceCheckbox,
    setOptionalServiceInputHeight,
    // PRICE VARIANTS
    setPriceVariantsHeight,
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