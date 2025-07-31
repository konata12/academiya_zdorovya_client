import { EmployeeFormData, EmployeesBackgroundImgColorType, EmployeesFormDataEnum, EmployeeSocialMediaKeysType, EmployeeStringArrayKeysType, EmployeeStringKeysType } from "@/app/types/data/employees.type";
import { createSlice } from "@reduxjs/toolkit";

export const employeeCreateFormInitialState: EmployeeFormData = {
    name: '',
    surname: '',
    position: '',
    description: '',
    degree: '',
    instagram: '',
    facebook: '',
    X: '',
    youtube: '',
    workSpecialities: [''],
    achivements: undefined,
    backgroundImgColor: 'blue',
    image: null,
    errors: {
        name: { message: '' },
        surname: { message: '' },
        position: { message: '' },
        description: { message: '' },
        degree: { message: '' },
        instagram: { message: '' },
        facebook: { message: '' },
        X: { message: '' },
        youtube: { message: '' },
        workSpecialities: [],
        achivements: [],
        backgroundImgColor: { message: '' },
        image: { message: '' },
    }
}

const employeeCreateFormSlice = createSlice({
    name: 'employeeCreateForm',
    initialState: employeeCreateFormInitialState,
    reducers: {
        // SET VALUES
        setEmployeeCreateStringValue(state, action: {
            payload: {
                field: EmployeeStringKeysType,
                value: string
            }
        }) {
            const { field, value } = action.payload
            state[field] = value
        },
        setEmployeeCreateSocialMediaValue(state, action: {
            payload: {
                field: EmployeeSocialMediaKeysType,
                value: string | undefined
            }
        }) {
            const { field, value } = action.payload
            state[field] = value
        },
        addEmployeeCreateStringArrayValue(state, action: {
            payload: EmployeeStringArrayKeysType
        }) {
            const field = action.payload
            // ACHIVEMENTS CAN BE UNDEFINED
            if (!state[field]) {
                // IF PARAMETER IS UNDEFINED MAKE IT ARRAY
                state[field] = [''];
            }
            const length = state[field].length;
            state[field][length] = '';
            if (!state.errors[field]) {
                state.errors[field] = [{ message: '' }];
            }
        },
        setEmployeeCreateStringArrayValue(state, action: {
            payload: {
                index: number,
                value: string,
                field: EmployeeStringArrayKeysType,
            }
        }) {
            const { field, index, value } = action.payload
            if (state[field]) {
                state[field][index] = value
            } else {
                state[field] = [value]
            }
        },
        deleteEmployeeCreateStringArrayValue(state, action: {
            payload: {
                index: number,
                field: EmployeeStringArrayKeysType,
            }
        }) {
            const { index, field } = action.payload
            if (state[field] && state.errors[field]) {
                state[field].splice(index, 1)
                state.errors[field].splice(index, 1)
            }
        },
        setAchivementsFirstValue(state) {
            state.achivements = ['']
            state.errors.achivements = [{ message: '' }]
        },
        setEmployeeCreateBackgroundImgColor(state, action: { payload: EmployeesBackgroundImgColorType }) {
            const value = action.payload
            state[EmployeesFormDataEnum.BACKGROUNDIMGCOLOR] = value
        },
        // SET ERRORS
        setEmployeeCreateBasicValueError(state, action: {
            payload: {
                field: Exclude<EmployeesFormDataEnum, EmployeeStringArrayKeysType>,
                message: string
            }
        }) {
            const { field, message } = action.payload
            state.errors[field] = { message }
        },
        setEmployeeCreateStringArrayError(state, action: {
            payload: {
                field: EmployeeStringArrayKeysType,
                index: number,
                message: string
            }
        }) {
            const { field, index, message } = action.payload
            state.errors[field][index] = { message }
        },

        // RESET FORM
        resetEmployeeCreateForm: () => employeeCreateFormInitialState,
    },
})

export const {
    setEmployeeCreateStringValue,
    setEmployeeCreateSocialMediaValue,
    addEmployeeCreateStringArrayValue,
    setEmployeeCreateStringArrayValue,
    deleteEmployeeCreateStringArrayValue,
    setAchivementsFirstValue,
    setEmployeeCreateBackgroundImgColor,

    setEmployeeCreateBasicValueError,
    setEmployeeCreateStringArrayError,

    resetEmployeeCreateForm,
} = employeeCreateFormSlice.actions

export default employeeCreateFormSlice.reducer