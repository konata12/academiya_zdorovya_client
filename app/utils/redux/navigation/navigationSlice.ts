import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formDefaultValues: true,
    formName: 'не вказано'
}

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setFormDefaultValuesNavigation(state, action: { payload: boolean }) {
            state.formDefaultValues = action.payload
        },
        setFormNameNavigation(state, action: { payload: string }) {
            state.formName = action.payload
        }
    }
})

export const {
    setFormDefaultValuesNavigation,
    setFormNameNavigation
} = navigationSlice.actions

export default navigationSlice.reducer