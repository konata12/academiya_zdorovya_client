import { createEmployeeFormData, parseEmployeeFormDataToUpdate } from "@/app/services/employee.service";
import { CreateEmployeesFormData, Employee, EmployeeFormData, EmployeesInit } from "@/app/types/data/employees.type";
import { ErrorResponse } from "@/app/types/data/response.type";
import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: EmployeesInit = {
    employees: [],
    // need for every employee to have seperate state for ModalWindow of every employee
    employeesIsModalOpen: [],
    status: {
        getAll: null,
        getOne: null,
        create: null,
        delete: null,
        update: null,
    },
    error: {
        getAll: null,
        getOne: null,
        create: null,
        delete: [],
        update: null,
    }
}

const baseUrl = 'employees'

export const fetchEmployees = createAsyncThunk('employees/getAll', async (
    _,
    { rejectWithValue }
) => {
    try {
        const response = await axiosInstance.get<Employee[]>(`${baseUrl}`)
        console.log(response)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error)
            const serializableError: ErrorResponse = {
                message: error.response?.data.message || 'Unexpected server error',
                statusCode: error.status || 500
            }
            return rejectWithValue(serializableError)
        }
    }
})
export const fetchOneEmployee = createAsyncThunk('employees/getOne', async (
    id: string,
    { rejectWithValue }
) => {
    try {

        const response = await axiosInstance.get<Employee[]>(`${baseUrl}/admin/${id}`)
        // console.log(response)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error)
            const serializableError: ErrorResponse = {
                message: error.response?.data.message || 'Unexpected server error',
                statusCode: error.status || 500
            }
            return rejectWithValue(serializableError)
        }
    }
})
export const createEmployee = createAsyncThunk('employees/create', async (
    data: CreateEmployeesFormData,
    { rejectWithValue }
) => {
    try {
        const formData = await createEmployeeFormData(data)
        console.log('formData: ', Array.from(formData))
        throw new Error('TEST ERROR')

        const response = await axiosInstance.post<Employee[]>(`${baseUrl}/admin/create`, formData)
        console.log(response)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error)
            const serializableError: ErrorResponse = {
                message: error.response?.data.message || 'Unexpected server error',
                statusCode: error.status || 500
            }
            return rejectWithValue(serializableError)
        }
    }
})
export const updateEmployee = createAsyncThunk('employees/update', async ({
    data,
    id
}: {
    data: CreateEmployeesFormData
    id: string
}, { rejectWithValue }) => {
    try {
        console.log('redux', data)
        const formData = await createEmployeeFormData(data)
        const response = await axiosInstance.put(`${baseUrl}/admin/update/${id}`, formData)
        console.log(response)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error)
            const serializableError: ErrorResponse = {
                message: error.response?.data.message || 'Unexpected server error',
                statusCode: error.status || 500
            }
            return rejectWithValue(serializableError)
        }
    }
})
export const deleteEmployee = createAsyncThunk('employees/delete', async (
    id: number,
    { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`${baseUrl}/admin/${id}`)
        console.log(response)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error)
            const serializableError: ErrorResponse = {
                message: error.response?.data.message || 'Unexpected server error',
                statusCode: error.status || 500
            }
            return rejectWithValue(serializableError)
        }
    }
})

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        openEmployeesModal(state, action: { payload: { i: number } }) {
            state.employeesIsModalOpen[action.payload.i] = true
        },
        closeEmployeesModal(state, action: { payload: { i: number } }) {
            state.employeesIsModalOpen[action.payload.i] = false
        },

        deleteEmployeeFromState(state, action: { payload: number }) {
            if (state.employees) {
                const index = state.employees.findIndex(employee => {
                    return employee.id === action.payload
                })
                state.employees.splice(index, 1)
            }
        },
        updateEmployeeInState(state, action: {
            payload: {
                data: EmployeeFormData,
                id: string
            }
        }) {
            const index = state.employees.findIndex(employee => {
                return employee.id === +action.payload.id
            })
            state.employees[index] = parseEmployeeFormDataToUpdate(action.payload.data, action.payload.id)
        },
        setEmployeeUpdateError(state) {
            state.error.update = {
                message: 'Дані ті самі, окрім картинки, спочатку змініть значення',
                statusCode: 0
            }
        }
    },
    extraReducers(builder) {
        builder
            // GET ALL EMPLOYEES
            .addCase(fetchEmployees.pending, (state) => {
                state.status.getAll = "loading"
                state.error.getAll = null
            })
            .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[] | undefined>) => {
                state.status.getAll = "succeeded"
                if (action.payload) {
                    state.employees = action.payload
                    state.employeesIsModalOpen = new Array(state.employees.length).fill(false)
                }
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status.getAll = "failed"
                state.error.getAll = action.payload as ErrorResponse
            })

            // GET ONE EMPLOYEES
            .addCase(fetchOneEmployee.pending, (state) => {
                state.status.getOne = "loading"
                state.error.getOne = null
            })
            .addCase(fetchOneEmployee.fulfilled, (state, action: PayloadAction<Employee[] | undefined>) => {
                state.status.getOne = "succeeded"
                if (action.payload) {
                    state.employees = action.payload
                    state.employeesIsModalOpen = new Array(state.employees.length).fill(false)
                }
            })
            .addCase(fetchOneEmployee.rejected, (state, action) => {
                state.status.getOne = "failed"
                state.error.getOne = action.payload as ErrorResponse
            })

            // CREATE EMPLOYEES
            .addCase(createEmployee.pending, (state) => {
                state.status.create = "loading"
                state.error.create = null
            })
            .addCase(createEmployee.fulfilled, (state, action: PayloadAction<Employee[] | undefined>) => {
                state.status.create = "succeeded"
                if (action.payload) {
                    state.employees = action.payload
                    state.employeesIsModalOpen = new Array(state.employees.length).fill(false)
                }
            })
            .addCase(createEmployee.rejected, (state, action) => {
                state.status.create = "failed"
                state.error.create = action.payload as ErrorResponse
            })

            // UPDATE EMPLOYEES
            .addCase(updateEmployee.pending, (state) => {
                state.status.update = "loading"
                state.error.update = null
            })
            .addCase(updateEmployee.fulfilled, (state) => {
                state.status.update = "succeeded"
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.status.update = "failed"
                state.error.update = action.payload as ErrorResponse
            })

            // DELETE EMPLOYEES
            .addCase(deleteEmployee.pending, (state) => {
                state.status.delete = "loading"
                // state.error.delete = null
            })
            .addCase(deleteEmployee.fulfilled, (state) => {
                state.status.delete = "succeeded"
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.status.delete = "failed"
                // state.error.delete = action.payload as ErrorResponse
            })
    }
})

export const {
    openEmployeesModal,
    closeEmployeesModal,
    deleteEmployeeFromState,
    setEmployeeUpdateError,
    updateEmployeeInState,
} = employeesSlice.actions

export default employeesSlice.reducer