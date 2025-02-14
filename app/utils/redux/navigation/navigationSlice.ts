import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formDefaultValues: true
}

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setFormDefaultValues(state, action: { payload: boolean }) {
            state.formDefaultValues = action.payload
        }
    }
})

export const {
    setFormDefaultValues
} = navigationSlice.actions

export default navigationSlice.reducer