import { Department, DepartmentsFormData, DepartmentsInit } from "@/app/types/data/departments.type";
import { ErrorResponse } from "@/app/types/data/response.type";
import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: DepartmentsInit = {
    departments: [],
    // need for every department to have seperate state for ModalWindow of every department
    departmentsIsModalOpen: [],
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
        delete: null,
        update: null,
    }
}

const baseUrl = 'departments'

export const fetchDepartments = createAsyncThunk('departments/getAll', async (
    _,
    { rejectWithValue }
) => {
    try {
        const response = await axiosInstance.get<Department[]>(`${baseUrl}`)
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

export const fetchOneDepartment = createAsyncThunk('departments/getOne', async (
    id: string,
    { rejectWithValue }
) => {
    try {
        const response = await axiosInstance.get<Department[]>(`${baseUrl}/admin/${id}`)
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

export const createDepartment = createAsyncThunk('departments/create', async (
    data: DepartmentsFormData,
    { rejectWithValue }
) => {
    try {
        const response = await axiosInstance.post<Department[]>(`${baseUrl}/admin/create`, data)
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

export const updateDepartment = createAsyncThunk('departments/update', async ({
    data,
    id
}: {
    data: DepartmentsFormData
    id: string
}, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`${baseUrl}/admin/${id}`, data)
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

export const deleteDepartment = createAsyncThunk('departments/delete', async (
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

const departmentsSlice = createSlice({
    name: 'departments',
    initialState,
    reducers: {
        openDepartmentsModal(state, action: { payload: { i: number } }) {
            state.departmentsIsModalOpen[action.payload.i] = true
        },
        closeDepartmentsModal(state, action: { payload: { i: number } }) {
            state.departmentsIsModalOpen[action.payload.i] = false
        },

        deleteDepartmentFromState(state, action: { payload: number }) {
            if (state.departments) {
                const index = state.departments.findIndex(department => {
                    return department.id === action.payload
                })
                state.departments.splice(index, 1)
            }
        },
        updateDepartmentInState(state, action: {
            payload: {
                data: DepartmentsFormData,
                id: string
            }
        }) {
            console.log(action)
            const index = state.departments.findIndex(department => {
                return department.id === +action.payload.id
            })
            console.log(index)
            state.departments[index] = {
                id: +action.payload.id,
                ...action.payload.data
            }
        },
        setUpdateError(state) {
            state.error.update = {
                message: 'Дані ті самі, спочатку змініть значення',
                statusCode: 0
            }
        }
    },
    extraReducers(builder) {
        builder
            // GET ALL DEPARTMENTS
            .addCase(fetchDepartments.pending, (state) => {
                state.status.getAll = "loading"
                state.error.getAll = null
            })
            .addCase(fetchDepartments.fulfilled, (state, action: PayloadAction<Department[] | undefined>) => {
                state.status.getAll = "succeeded"
                if (action.payload) {
                    state.departments = action.payload
                    state.departmentsIsModalOpen = new Array(state.departments.length).fill(false)
                }
            })
            .addCase(fetchDepartments.rejected, (state, action) => {
                state.status.getAll = "failed"
                state.error.getAll = action.payload as ErrorResponse
            })

            // GET ONE DEPARTMENTS
            .addCase(fetchOneDepartment.pending, (state) => {
                state.status.getOne = "loading"
                state.error.getOne = null
            })
            .addCase(fetchOneDepartment.fulfilled, (state, action: PayloadAction<Department[] | undefined>) => {
                state.status.getOne = "succeeded"
                if (action.payload) {
                    state.departments = action.payload
                    state.departmentsIsModalOpen = new Array(state.departments.length).fill(false)
                }
            })
            .addCase(fetchOneDepartment.rejected, (state, action) => {
                state.status.getOne = "failed"
                state.error.getOne = action.payload as ErrorResponse
            })

            // CREATE DEPARTMENT
            .addCase(createDepartment.pending, (state) => {
                state.status.create = "loading"
                state.error.create = null
            })
            .addCase(createDepartment.fulfilled, (state, action: PayloadAction<Department[] | undefined>) => {
                state.status.create = "succeeded"
                if (action.payload) {
                    state.departments = action.payload
                    state.departmentsIsModalOpen = new Array(state.departments.length).fill(false)
                }
            })
            .addCase(createDepartment.rejected, (state, action) => {
                state.status.create = "failed"
                state.error.create = action.payload as ErrorResponse
            })

            // UPDATE DEPARTMENT
            .addCase(updateDepartment.pending, (state) => {
                state.status.update = "loading"
                state.error.update = null
            })
            .addCase(updateDepartment.fulfilled, (state) => {
                state.status.update = "succeeded"
            })
            .addCase(updateDepartment.rejected, (state, action) => {
                state.status.update = "failed"
                state.error.update = action.payload as ErrorResponse
            })

            // DELETE DEPARTMENTS
            .addCase(deleteDepartment.pending, (state) => {
                state.status.delete = "loading"
                state.error.delete = null
            })
            .addCase(deleteDepartment.fulfilled, (state) => {
                state.status.delete = "succeeded"
            })
            .addCase(deleteDepartment.rejected, (state, action) => {
                state.status.delete = "failed"
                state.error.delete = action.payload as ErrorResponse
            })
    }
})

export const {
    openDepartmentsModal,
    closeDepartmentsModal,
    deleteDepartmentFromState,
    setUpdateError,
    updateDepartmentInState,
} = departmentsSlice.actions

export default departmentsSlice.reducer