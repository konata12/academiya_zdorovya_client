import {
    CreateServiceTreatmentTypesFormData,
    ServiceEmployeeFormData,
    ServiceEmployeeBasicType,
    ServiceFormData,
    ServiceFormDataEnum,
    ServiceStringKeysType,
    ServiceTreatmentStageEnumType,
    ServiceTreatmentTypeServiceFormData
    } from '@/app/types/data/services.type';
import { createSlice } from '@reduxjs/toolkit';
import { delMany } from 'idb-keyval';
import { getIndexedDBStoreForImages } from '@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages';
import { ImageFormDataEnum } from '@/app/types/data/details.type';
import { v4 as uuidv4 } from 'uuid';


const initialState: ServiceFormData = {
    title: '',
    shortDescription: '',
    image: '',
    treatmentStages: [{
        title: '',
        description: '',
    }],
    mainDescription: '',
    treatmentTypesDescription: null,
    treatmentTypes: [],
    employees: [],
    errors: {
        title: { message: '' },
        shortDescription: { message: '' },
        image: { message: '' },
        treatmentStages: [{
            title: { message: '' },
            description: { message: '' },
        }],
        mainDescription: { message: '' },
        treatmentTypesDescription: { message: '' },
        treatmentTypes: { message: '' },
        employees: { message: '' },
    }
}
const indexedDBStoreName = 'service_create_images'

const serviceCreateFormSlice = createSlice({
    name: 'serviceCreateForm',
    initialState,
    reducers: {
        setServiceCreateFormStringValue(state, action: {
            payload: {
                field: ServiceStringKeysType,
                value: string
            }
        }) {
            const { field, value } = action.payload
            state[field] = value
        },
        // TREATMENT STAGES
        addServiceCreateTreatmentStagesValue(state) {
            const newindex = state.treatmentStages.length
            state.treatmentStages[newindex] = {
                title: '',
                description: '',
            }
            state.errors.treatmentStages[newindex] = {
                title: { message: '' },
                description: { message: '' },
            }
        },
        deleteServiceCreateTreatmentStagesValue(state, action: { payload: number }) {
            const index = action.payload
            state.treatmentStages.splice(index, 1)
            state.errors.treatmentStages.splice(index, 1)
        },
        setServiceCreateTreatmentStagesValue(state, action: {
            payload: {
                field: ServiceTreatmentStageEnumType,
                index: number,
                value: string,
            }
        }) {
            const { field, index, value } = action.payload
            state.treatmentStages[index][field] = value
        },
        // TREATMENT TYPES
        deleteServiceCreateTreatmentTypesValue(state, action: { payload: number }) {
            const index = action.payload
            const imagesNames: string[] = [
                state.treatmentTypes[index].backgroundImg,
                ...(state.treatmentTypes[index].details.images.map(image => image[ImageFormDataEnum.IMAGE]))
            ]

            state.treatmentTypes.splice(index, 1)
            const store = getIndexedDBStoreForImages(indexedDBStoreName)
            delMany(imagesNames, store)
        },
        setServiceCreateTreatmentTypesValue(state, action: {
            payload: {
                index: number,
                value: ServiceTreatmentTypeServiceFormData,
            }
        }) {
            const { index, value } = action.payload
            if (!isNaN(index)) state.treatmentTypes[index] = value
        },
        setServiceCreateTreatmentTypes(state, action: { payload: ServiceTreatmentTypeServiceFormData[] }) {
            state.treatmentTypes = action.payload
        },
        // TREATMENT EMPLOYEES
        addServiceCreateEmployeesValue(state, action: { payload: ServiceEmployeeBasicType }) {
            const index = state.employees.length
            const contains = state.employees.some(employee => employee.id === action.payload.id)
            if (contains) return

            state.errors.employees.message = ''
            state.employees[index] = {
                ...action.payload,
                orderId: uuidv4()
            }
        },
        deleteServiceCreateEmployeesValue(state, action: { payload: number }) {
            const index = action.payload
            state.employees.splice(index, 1)
        },
        setServiceCreateEmployees(state, action: { payload: ServiceEmployeeFormData[] }) {
            state.employees = action.payload
        },
        // SET ERRORS
        setServiceCreateFormBasicValueError(state, action: {
            payload: {
                field: Exclude<ServiceFormDataEnum, ServiceFormDataEnum.TREATMENTSTAGES>,
                message: string
            }
        }) {
            const { field, message } = action.payload
            state.errors[field] = { message }
        },
        setServiceCreateTreatmentStagesError(state, action: {
            payload: {
                field: ServiceTreatmentStageEnumType,
                index: number,
                message: string
            }
        }) {
            const { field, index, message } = action.payload
            state.errors.treatmentStages[index][field] = { message }
        },

        resetServiceFromData: () => initialState,
    },
    extraReducers(builder) {
        builder
    }
})

export const {
    setServiceCreateFormStringValue,
    // TREATMENT STAGES
    addServiceCreateTreatmentStagesValue,
    deleteServiceCreateTreatmentStagesValue,
    setServiceCreateTreatmentStagesValue,
    // TREATMENT TYPES
    deleteServiceCreateTreatmentTypesValue,
    setServiceCreateTreatmentTypesValue,
    setServiceCreateTreatmentTypes,
    // TREATMENT EMPLOYEES
    addServiceCreateEmployeesValue,
    deleteServiceCreateEmployeesValue,
    setServiceCreateEmployees,
    // ERRORS
    setServiceCreateFormBasicValueError,
    setServiceCreateTreatmentStagesError,

    resetServiceFromData,
} = serviceCreateFormSlice.actions

export default serviceCreateFormSlice.reducer