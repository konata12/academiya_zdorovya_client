import { EmployeesBackgroundImgColorType, EmployeesCheckboxesType, EmployeesFormDataUI, EmployeesModalsStatesType } from "@/app/types/data/employees";
import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";

const initialState: EmployeesFormDataUI = {
    // CHECKBOXES
    instagramCheckbox: false,
    facebookCheckbox: false,
    XCheckbox: false,
    youtubeCheckbox: false,
    achivementsCheckbox: false,
    backgroundImgColor: 'blue',

    // MODALS
    workSpecialitysModalIsOpen: [],
    achivementsModalIsOpen: []
}

const employeesFormUISlice = createSlice({
    name: 'employeesFormUI',
    initialState,
    reducers: {
        // CHECKBOXES
        triggerEmployeeUICheckbox(state, action: {
            payload: {
                state: boolean,
                checkboxName: EmployeesCheckboxesType
            }
        }) {
            const checkboxName = action.payload.checkboxName
            state[checkboxName] = action.payload.state
        },
        setEmployeeBackgroundImgColorCheckbox(state, action: {
            payload: EmployeesBackgroundImgColorType
        }) {
            state.backgroundImgColor = action.payload
        },
        setCheckboxesDefaultValuesForUpdateForm(state, action: {
            payload: {
                instagram: string | null,
                facebook: string | null,
                X: string | null,
                youtube: string | null,
                achivements: string[],
                backgroundImgColor: EmployeesBackgroundImgColorType
            }
        }) {
            state.instagramCheckbox = !!action.payload.instagram
            state.facebookCheckbox = !!action.payload.facebook
            state.XCheckbox = !!action.payload.X
            state.youtubeCheckbox = !!action.payload.youtube
            state.achivementsCheckbox = !!action.payload.achivements.length
            state.backgroundImgColor = action.payload.backgroundImgColor
        },

        // MODALS
        setModalStateInitValue(state, action: {
            payload: {
                length: number,
                modalName: EmployeesModalsStatesType
            }
        }) {
            const modalName = action.payload.modalName
            const lehgth = action.payload.length

            for (let i = 0; i < lehgth; i++) {
                state[modalName].push(false)
            }
        },
        setModalState(state, action: {
            payload: {
                state: boolean,
                index: number,
                modalName: EmployeesModalsStatesType
            }
        }) {
            const modalName = action.payload.modalName
            const index = action.payload.index

            state[modalName][index] = action.payload.state
        },
        addModalState(state, action: {
            payload: {
                modalName: EmployeesModalsStatesType
            }
        }) {
            const modalName = action.payload.modalName
            state[modalName].push(false)
        },
        deleteModalState(state, action: {
            payload: {
                index: number,
                modalName: EmployeesModalsStatesType
            }
        }) {
            const modalName = action.payload.modalName
            const index = action.payload.index

            if (state[modalName].length > 1) {
                state[modalName].splice(index, 1)
            }
        },

        // INITIAL STATE
        setEmployeeUIInitialState() {
            return initialState
        }
    }
})

export const {
    // CHECKBOXES
    triggerEmployeeUICheckbox,
    setEmployeeBackgroundImgColorCheckbox,
    setCheckboxesDefaultValuesForUpdateForm,
    // MODALS
    setModalStateInitValue,
    setModalState,
    addModalState,
    deleteModalState,
    // INITIAL STATE
    setEmployeeUIInitialState,
} = employeesFormUISlice.actions

export default employeesFormUISlice.reducer