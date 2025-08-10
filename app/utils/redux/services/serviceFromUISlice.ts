import { ServiceFormDataUI, ServiceFormDataUICheckboxesType, ServiceFormDataUIModalsStatesEnum, ServiceModalsStatesType } from '@/app/types/data/services.type';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ServiceFormDataUI = {
    // CHECKBOXES
    serviceTypesCheckbox: false,
    serviceTypesDescriptionCheckbox: false,

    // MODALS
    treatmentStagesModalIsOpen: [false],
    serviceTypesModalIsOpen: [],
    employeesModalIsOpen: [],
}

const serviceFormUISlice = createSlice({
    name: 'serviceFormUI',
    initialState,
    reducers: {
        // CHECKBOXES
        triggerServiceUICheckbox(state, action: {
            payload: {
                state: boolean,
                checkboxName: ServiceFormDataUICheckboxesType
            }
        }) {
            const checkboxName = action.payload.checkboxName
            state[checkboxName] = action.payload.state
        },
        // setCheckboxesDefaultValuesForUpdateForm(state, action: {
        //     payload: {
        //         instagram: string | null,
        //         facebook: string | null,
        //         X: string | null,
        //         youtube: string | null,
        //         achivements: string[],
        //         backgroundImgColor: ServiceBackgroundImgColorType
        //     }
        // }) {
        //     state.instagramCheckbox = !!action.payload.instagram
        //     state.facebookCheckbox = !!action.payload.facebook
        //     state.XCheckbox = !!action.payload.X
        //     state.youtubeCheckbox = !!action.payload.youtube
        //     state.achivementsCheckbox = !!action.payload.achivements.length
        // },

        // MODALS
        setModalState(state, action: {
            payload: {
                state: boolean,
                index: number,
                modalName: ServiceModalsStatesType
            }
        }) {
            const modalName = action.payload.modalName
            const index = action.payload.index

            state[modalName][index] = action.payload.state
        },
        addModalState(state, action: {
            payload: {
                modalName: ServiceModalsStatesType
            }
        }) {
            const modalName = action.payload.modalName
            state[modalName].push(false)
        },
        deleteModalState(state, action: {
            payload: {
                index: number,
                modalName: ServiceModalsStatesType
            }
        }) {
            const modalName = action.payload.modalName
            const index = action.payload.index

            if (
                state[modalName].length > 1 
                || modalName === ServiceFormDataUIModalsStatesEnum.SERVICETYPESMODALISOPEN
                || modalName === ServiceFormDataUIModalsStatesEnum.EMPLOYEEMODALISOPEN
            ) {
                state[modalName].splice(index, 1)
            }
        },

        // INITIAL STATE
        // setEmployeeUIFormValues(state, action: {
        //     payload: Omit<EmployeeFormData, 'errors'>
        // }) {
        //     const {
        //         workSpecialities,
        //         achivements,
        //     } = action.payload

        //     // SET CHECKBOCES
        //     for (const key in action.payload) {
        //         switch (key) {
        //             case ServiceFormDataEnum.INSTAGRAM:
        //             case ServiceFormDataEnum.FACEBOOK:
        //             case ServiceFormDataEnum.X:
        //             case ServiceFormDataEnum.YOUTUBE:
        //                 const valueSoc = action.payload[key]

        //                 state[`${key}Checkbox`] = !!valueSoc
        //                 break;

        //             case ServiceFormDataEnum.ACHIVEMENTS:
        //                 const valueAch = action.payload[key]

        //                 state[`${key}Checkbox`] = valueAch && !!valueAch.length ? true : false
        //                 break;
        //         }
        //     }

        //     // SET MODAL VALUES
        //     state.workSpecialitysModalIsOpen = new Array(workSpecialities.length).fill(false)
        //     if (achivements) state.achivementsModalIsOpen = new Array(achivements.length).fill(false)
        // }
    }
})

export const {
    // CHECKBOXES
    triggerServiceUICheckbox,
    // setCheckboxesDefaultValuesForUpdateForm,
    // MODALS
    setModalState,
    addModalState,
    deleteModalState,
    // INITIAL STATE
    // setEmployeeUIFormValues,
} = serviceFormUISlice.actions

export default serviceFormUISlice.reducer