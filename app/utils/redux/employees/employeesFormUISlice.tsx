import { EmployeesCheckboxesType, EmployeesFormDataUI } from "@/app/types/data/employees";
import { createSlice } from "@reduxjs/toolkit";

const initialState: EmployeesFormDataUI = {
    instagramCheckbox: false,
    facebookCheckbox: false,
    XCheckbox: false,
    youtubeCheckbox: false,
}

const employeesFormUISlice = createSlice({
    name: 'employeesFormUI',
    initialState,
    reducers: {
        triggerEmployeeUICheckbox(state, action: {
            payload: {
                state: boolean,
                checkboxName: EmployeesCheckboxesType
            }
        }) {
            const checkboxName = action.payload.checkboxName
            state[checkboxName] = action.payload.state
            console.log(checkboxName, action.payload.state)
        },
        setEmployeeUIInitialState() {
            return initialState;
        }
    }
})

export const {
    triggerEmployeeUICheckbox,
    setEmployeeUIInitialState,
} = employeesFormUISlice.actions

export default employeesFormUISlice.reducer