import { SideNavigationType } from "@/app/types/ui/side_navigation";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SideNavigationType = {
    sideNavigationOpen: true
}

const sideNavigationSlice = createSlice({
    name: 'sideNavigation',
    initialState,
    reducers: {
        // CHECKBOXES
        setSideNavigationOpen(state, action: {
            payload: boolean
        }) {
            state.sideNavigationOpen = action.payload
        },

        // INITIAL STATE
        setSideNavigationSliceState() {
            return initialState
        }
    }
})

export const {
    setSideNavigationOpen,
    setSideNavigationSliceState,
} = sideNavigationSlice.actions

export default sideNavigationSlice.reducer