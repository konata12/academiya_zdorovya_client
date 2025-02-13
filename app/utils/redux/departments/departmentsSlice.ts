import { Department, DepartmentsFormData, DepartmentsInit } from "@/app/types/departments";
import { ErrorResponse } from "@/app/types/response";
import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: DepartmentsInit = {
    departments: [],
    // need for every department to have seperate state for ModalWindow of every department
    departmentsIsModalOpen: [],
    status: null,
    error: {
        get: null,
        create: null,
        delete: null,
        update: null,
    }
}

export const fetchDepartments = createAsyncThunk('departments/get', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get<Department[]>('departments')
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

export const createDepartment = createAsyncThunk('departments/create', async (data: DepartmentsFormData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post<Department[]>(`departments/admin/create`, data)
        console.log(response)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error)
            const serializableError: ErrorResponse = {
                message: error.response?.data.error || 'Unexpected server error',
                statusCode: error.status || 500
            }
            return rejectWithValue(serializableError)
        }
    }
})

export const updateDepartment = createAsyncThunk('departments/update', async ({
    data,
    departmentId
}: {
    data: DepartmentsFormData
    departmentId: number
}, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put<Department[]>(`departments/admin/${departmentId}`, data)
        console.log(response)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error)
            const serializableError: ErrorResponse = {
                message: error.response?.data.error || 'Unexpected server error',
                statusCode: error.status || 500
            }
            return rejectWithValue(serializableError)
        }
    }
})

export const deleteDepartment = createAsyncThunk('departments/delete', async (id: number, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete<Department[]>(`departments/admin/${id}`)
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

const departmentsSlice = createSlice({
    name: 'departments',
    initialState,
    reducers: {
        openModal(state, action: { payload: { i: number } }) {
            state.departmentsIsModalOpen[action.payload.i] = true
        },
        closeModal(state, action: { payload: { i: number } }) {
            state.departmentsIsModalOpen[action.payload.i] = false
        },

        deleteDepartmentFromState(state, action: { payload: { id: number } }) {
            if (state.departments) {
                console.log(current(state.error))
                const index = state.departments.findIndex(department => {
                    department.id === action.payload.id
                })
                state.departments.splice(index, 1)
            }
        },
        setUpdateError(state) {
            state.error.update = {
                message: 'Дані ті самі, спочатку змініть значення',
                statusCode: 0
            }
            console.log(current(state.error))
        }
    },
    extraReducers(builder) {
        builder
            // GET DEPARTMENTS
            .addCase(fetchDepartments.pending, (state) => {
                state.status = "loading"
                state.error.get = null
            })
            .addCase(fetchDepartments.fulfilled, (state, action: PayloadAction<Department[] | undefined>) => {
                state.status = "succeeded"
                if (action.payload) {
                    state.departments = action.payload
                    state.departmentsIsModalOpen = new Array(state.departments.length).fill(false)
                }
            })
            .addCase(fetchDepartments.rejected, (state, action) => {
                state.status = "failed"
                state.error.get = action.payload as ErrorResponse
            })

            // CREATE DEPARTMENT
            .addCase(createDepartment.pending, (state) => {
                state.status = "loading"
                state.error.create = null
            })
            .addCase(createDepartment.fulfilled, (state, action: PayloadAction<Department[] | undefined>) => {
                state.status = "succeeded"
                if (action.payload) {
                    state.departments = action.payload
                    state.departmentsIsModalOpen = new Array(state.departments.length).fill(false)
                }
            })
            .addCase(createDepartment.rejected, (state, action) => {
                state.status = "failed"
                state.error.create = action.payload as ErrorResponse
            })

            // CREATE DEPARTMENT
            .addCase(updateDepartment.pending, (state) => {
                state.status = "loading"
                state.error.update = null
                console.log('started')
            })
            .addCase(updateDepartment.fulfilled, (state) => {
                state.status = "succeeded"
            })
            .addCase(updateDepartment.rejected, (state, action) => {
                state.status = "failed"
                state.error.update = action.payload as ErrorResponse
                console.log(state.error)
            })

            // DELETE DEPARTMENTS
            .addCase(deleteDepartment.pending, (state) => {
                state.status = "loading"
                state.error.delete = null
            })
            .addCase(deleteDepartment.fulfilled, (state) => {
                state.status = "succeeded"
            })
            .addCase(deleteDepartment.rejected, (state, action) => {
                state.status = "failed"
                state.error.delete = action.payload as ErrorResponse
            })
    }
})

export const {
    openModal,
    closeModal,
    deleteDepartmentFromState,
    setUpdateError,
} = departmentsSlice.actions

export default departmentsSlice.reducer