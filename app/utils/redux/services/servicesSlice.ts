import axiosInstance from '@/app/utils/axios';
import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    CreateServiceFormData,
    // CreateServiceFormData,
    Service,
    ServiceFormData,
    ServiceInit,
    // UpdateServiceFormData
} from '@/app/types/data/services.type';
import { ErrorResponse } from '@/app/types/data/response.type';
import { createServiceFormData } from '@/app/services/service.service';

const initialState: ServiceInit = {
    service: [],
    // need for every new to have seperate state for ModalWindow of every new
    serviceIsModalOpen: [],
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

const baseUrl = 'services'

export const fetchService = createAsyncThunk('service/getAll', async (
    _,
    { rejectWithValue }
) => {
    try {
        const response = await axiosInstance.get<Service[]>(`${baseUrl}`)
        // const parsedService = await parseServiceResponse(response.data)

        // return parsedService
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error)
            const serializableError: ErrorResponse = {
                message: error.response?.data.message || 'Unexpected server error',
                statusCode: error.status || 500
            }
            return rejectWithValue(serializableError)
        } else if (error instanceof Error) {
            const serializableError: ErrorResponse = {
                message: error.message,
                statusCode: 500
            }
            return rejectWithValue(serializableError)
        }
    }
})
export const fetchOneService = createAsyncThunk('service/getOne', async (
    id: string,
    { rejectWithValue }
) => {
    try {
        const response = await axiosInstance.get<Service[]>(`${baseUrl}/admin/${id}`)
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
export const createService = createAsyncThunk('service/create', async (
    data: CreateServiceFormData,
    { rejectWithValue }
) => {
    try {
        const formData = await createServiceFormData(data)
        console.log('formData: ', Array.from(formData))

        const response = await axiosInstance.post<Service[]>(`${baseUrl}/admin/create`, formData)
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
        } else if (error instanceof Error) {
            const serializableError: ErrorResponse = {
                message: error.message,
                statusCode: 500
            }
            return rejectWithValue(serializableError)
        }
    }
})
export const updateService = createAsyncThunk('service/update', async (
    //     {
    //     data,
    //     id
    // }: {
    //     data: UpdateServiceFormData
    //     id: string
    //     }, { rejectWithValue }
) => {
    // try {
    //     const formData = await updateServiceFormData(data)
    //     console.log('formData: ', Array.from(formData))

    //     const response = await axiosInstance.put(`${baseUrl}/admin/update/${id}`, formData)
    //     console.log(response)
    //     return response.data
    // } catch (error) {
    //     if (error instanceof AxiosError) {
    //         console.log(error)
    //         const serializableError: ErrorResponse = {
    //             message: error.response?.data.message || 'Unexpected server error',
    //             statusCode: error.status || 500
    //         }
    //         return rejectWithValue(serializableError)
    //     } else if (error instanceof Error) {
    //         const serializableError: ErrorResponse = {
    //             message: error.message,
    //             statusCode: 500
    //         }
    //         return rejectWithValue(serializableError)
    //     }
    // }
})
export const deleteService = createAsyncThunk('service/delete', async (
    id: number,
    { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`${baseUrl}/admin/${id}`)
        console.log(response)
        return id
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error)
            const serializableError: ErrorResponse = {
                message: error.response?.data.message || 'Unexpected server error',
                statusCode: error.status || 500,
                id
            }
            return rejectWithValue(serializableError)
        }
    }
})

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        openServiceModal(state, action: { payload: number }) {
            state.serviceIsModalOpen[action.payload] = true
        },
        closeServiceModal(state, action: { payload: number }) {
            state.serviceIsModalOpen[action.payload] = false
        },

        setServiceUpdateError(state) {
            state.error.update = {
                message: 'Дані ті самі, спочатку змініть значення',
                statusCode: 0
            }
        },
        resetServiceUpdateError(state) {
            state.error.update = null
        },
    },
    extraReducers(builder) {
        builder
            // GET ALL NEWS
            .addCase(fetchService.pending, (state) => {
                state.status.getAll = "loading"
                state.error.getAll = null
            })
            .addCase(fetchService.fulfilled, (state, action: PayloadAction<Service[] | undefined>) => {
                state.status.getAll = "succeeded"
                if (action.payload) {
                    state.service = action.payload
                    state.serviceIsModalOpen = new Array(state.service.length).fill(false)
                    state.error.delete = new Array(state.service.length).fill(null)
                }
            })
            .addCase(fetchService.rejected, (state, action) => {
                state.status.getAll = "failed"
                state.service = []
                state.error.getAll = action.payload as ErrorResponse
            })

            // GET ONE NEWS
            .addCase(fetchOneService.pending, (state) => {
                state.status.getOne = "loading"
                state.error.getOne = null
            })
            .addCase(fetchOneService.fulfilled, (state, action: PayloadAction<Service[] | undefined>) => {
                state.status.getOne = "succeeded"
                if (action.payload) {
                    state.service = action.payload
                    state.serviceIsModalOpen = new Array(state.service.length).fill(false)
                }
            })
            .addCase(fetchOneService.rejected, (state, action) => {
                state.status.getOne = "failed"
                state.error.getOne = action.payload as ErrorResponse
            })

            // CREATE NEW
            .addCase(createService.pending, (state) => {
                state.status.create = "loading"
                state.error.create = null
            })
            .addCase(createService.fulfilled, (state) => {
                state.status.create = "succeeded"
            })
            .addCase(createService.rejected, (state, action) => {
                state.status.create = "failed"
                state.error.create = action.payload as ErrorResponse
            })

            // UPDATE NEW
            .addCase(updateService.pending, (state) => {
                state.status.update = "loading"
                state.error.update = null
            })
            .addCase(updateService.fulfilled, (state) => {
                state.status.update = "succeeded"
            })
            .addCase(updateService.rejected, (state, action) => {
                state.status.update = "failed"
                state.error.update = action.payload as ErrorResponse
            })

        // DELETE NEWS
        // .addCase(deleteService.pending, (state, action: PayloadAction<number | undefined>) => {
        //     state.status.delete = "loading"
        //     const index = state.service.findIndex(service => service.id === action.payload)
        //     if (index !== -1) {
        //         state.error.delete[index] = null
        //     }
        // })
        // .addCase(deleteService.fulfilled, (state, action: PayloadAction<number | undefined>) => {
        //     state.status.delete = "succeeded"
        //     const index = state.service.findIndex(service => service.id === action.payload)
        //     if (index !== -1) {
        //         state.service.splice(index, 1)
        //         state.serviceIsModalOpen.splice(index, 1)
        //         state.error.delete.splice(index, 1)
        //     }
        // })
        // .addCase(deleteService.rejected, (state, action) => {
        //     state.status.delete = "failed"
        //     if (action.payload && typeof action.payload === 'object' && 'id' in action.payload) {
        //         const error = action.payload as ErrorResponse;
        //         const index = state.service.findIndex(service => service.id === error.id);
        //         if (index !== -1) {
        //             state.error.delete[index] = error;
        //         }
        //     }
        // })
    }
})

export const {
    openServiceModal,
    closeServiceModal,
    setServiceUpdateError,
    resetServiceUpdateError,
} = servicesSlice.actions

export default servicesSlice.reducer