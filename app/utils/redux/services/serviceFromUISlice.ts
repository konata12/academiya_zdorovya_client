import { ServiceFormData, ServiceFormDataUI, ServiceFormDataUICheckboxesType, ServiceFormDataUIModalsStatesEnum, ServiceModalsStatesType } from '@/app/types/data/services.type';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ServiceFormDataUI = {
    // CHECKBOXES
    serviceTypesCheckbox: false,
    serviceTypesDescriptionCheckbox: false,

    // MODALS
    treatmentStagesModalIsOpen: [false],
    serviceTypesModalIsOpen: [],
    employeesModalIsOpen: [],

    // UPDATING CACHING
    updatingData: false
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
        // UPDATING CACHING
        setUpdatingState(state, action: {
            payload: boolean
        }) {
            state.updatingData = action.payload
        },

        resetServiceUIFormData: () => initialState,

        // INITIAL STATE
        setServiceUIFormValues(state, action: {
            payload: ServiceFormData
        }) {
            const {
                treatmentStages,
                serviceTypesDescription,
                serviceTypes,
                employees,
            } = action.payload

            state.serviceTypesCheckbox = !!serviceTypes || !!serviceTypesDescription
            state.serviceTypesDescriptionCheckbox = !!serviceTypesDescription

            state.treatmentStagesModalIsOpen = Array(treatmentStages.length).fill(false)
            state.serviceTypesModalIsOpen = Array(serviceTypes?.length || 0).fill(false)
            state.employeesModalIsOpen = Array(employees.length).fill(false)
        },
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
    // UPDATING CACHING
    setUpdatingState,
    // INITIAL STATE
    resetServiceUIFormData,
    setServiceUIFormValues,
} = serviceFormUISlice.actions

export default serviceFormUISlice.reducer