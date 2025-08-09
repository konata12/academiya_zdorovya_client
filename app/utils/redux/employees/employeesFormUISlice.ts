import {
    EmployeeFormData,
    EmployeesBackgroundImgColorType,
    EmployeesCheckboxesType,
    EmployeesFormDataEnum,
    EmployeesFormDataUI,
    EmployeesModalsStatesType
} from '@/app/types/data/employees.type';
import { createSlice } from '@reduxjs/toolkit';

const initialState: EmployeesFormDataUI = {
    // CHECKBOXES
    instagramCheckbox: false,
    facebookCheckbox: false,
    XCheckbox: false,
    youtubeCheckbox: false,
    achivementsCheckbox: false,

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
        },

        // MODALS
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
        setEmployeeUIFormValues(state, action: {
            payload: Omit<EmployeeFormData, 'errors'>
        }) {
            const {
                workSpecialities,
                achivements,
            } = action.payload

            // SET CHECKBOCES
            for (const key in action.payload) {
                switch (key) {
                    case EmployeesFormDataEnum.INSTAGRAM:
                    case EmployeesFormDataEnum.FACEBOOK:
                    case EmployeesFormDataEnum.X:
                    case EmployeesFormDataEnum.YOUTUBE:
                        const valueSoc = action.payload[key]

                        state[`${key}Checkbox`] = !!valueSoc
                        break;

                    case EmployeesFormDataEnum.ACHIVEMENTS:
                        const valueAch = action.payload[key]

                        state[`${key}Checkbox`] = valueAch && !!valueAch.length ? true : false
                        break;
                }
            }

            // SET MODAL VALUES
            state.workSpecialitysModalIsOpen = new Array(workSpecialities.length).fill(false)
            if (achivements) state.achivementsModalIsOpen = new Array(achivements.length).fill(false)
        }
    }
})

export const {
    // CHECKBOXES
    triggerEmployeeUICheckbox,
    setCheckboxesDefaultValuesForUpdateForm,
    // MODALS
    setModalState,
    addModalState,
    deleteModalState,
    // INITIAL STATE
    setEmployeeUIFormValues,
} = employeesFormUISlice.actions

export default employeesFormUISlice.reducer