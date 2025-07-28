import { BookingService, BookingServiceFormData, BookingServiceInit } from "@/app/types/data/booking_services.type";
import { ErrorResponse } from "@/app/types/data/response.type";
import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: BookingServiceInit = {
    bookingServices: [],
    bookingServicesIsModalOpen: [],
    status: {
        getAll: null,
        create: null,
        delete: null,
    },
    error: {
        getAll: null,
        create: null,
        delete: [],
    }
}

const requesUrlBase = 'booking-services'

export const fetchBookingServices = createAsyncThunk('bookingServices/get', async (
    _,
    { rejectWithValue }
) => {
    try {
        const response = await axiosInstance.get<BookingService[]>(`${requesUrlBase}`)
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

export const createBookingService = createAsyncThunk('bookingServices/create', async (
    data: BookingServiceFormData,
    { rejectWithValue }
) => {
    try {
        const response = await axiosInstance.post<BookingService[]>(`${requesUrlBase}/admin/create`, data)
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

export const deleteBookingService = createAsyncThunk('bookingServices/delete', async (
    id: number,
    { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`${requesUrlBase}/admin/${id}`)
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

const bookingServicesSlice = createSlice({
    name: 'bookingServices',
    initialState,
    reducers: {
        openModalBookingServices(state, action: { payload: { i: number } }) {
            state.bookingServicesIsModalOpen[action.payload.i] = true
        },
        closeModalBookingServices(state, action: { payload: { i: number } }) {
            state.bookingServicesIsModalOpen[action.payload.i] = false
        },
    },
    extraReducers(builder) {
        builder
            // GET BOOKING SERVICES
            .addCase(fetchBookingServices.pending, (state) => {
                state.status.getAll = "loading"
                state.error.getAll = null
            })
            .addCase(fetchBookingServices.fulfilled, (state, action: PayloadAction<BookingService[] | undefined>) => {
                state.status.getAll = "succeeded"
                if (action.payload) {
                    state.bookingServices = action.payload
                    state.bookingServicesIsModalOpen = new Array(state.bookingServices.length).fill(false)
                    state.error.delete = new Array(state.bookingServices.length).fill(null)
                }
            })
            .addCase(fetchBookingServices.rejected, (state, action) => {
                state.status.getAll = "failed"
                state.error.getAll = action.payload as ErrorResponse
            })

            // CREATE BOOKING SERVICES
            .addCase(createBookingService.pending, (state) => {
                state.status.create = "loading"
                state.error.create = null
            })
            .addCase(createBookingService.fulfilled, (state, action: PayloadAction<BookingService[] | undefined>) => {
                state.status.create = "succeeded"
                console.log(action.payload)
                if (action.payload) {
                    state.bookingServices = action.payload
                    state.bookingServicesIsModalOpen = new Array(state.bookingServices.length).fill(false)
                }
            })
            .addCase(createBookingService.rejected, (state, action) => {
                state.status.create = "failed"
                state.error.create = action.payload as ErrorResponse
            })

            // DELETE BOOKING SERVICES
            .addCase(deleteBookingService.pending, (state, action: PayloadAction<number | undefined>) => {
                state.status.delete = "loading"
                const index = state.bookingServices.findIndex(bookingServices => bookingServices.id === action.payload)
                if (index !== -1) {
                    state.error.delete[index] = null
                }
            })
            .addCase(deleteBookingService.fulfilled, (state, action: PayloadAction<number | undefined>) => {
                state.status.delete = "succeeded"
                const index = state.bookingServices.findIndex(bookingServices => bookingServices.id === action.payload)
                if (index !== -1) {
                    state.bookingServices.splice(index, 1)
                    state.bookingServicesIsModalOpen.splice(index, 1)
                    state.error.delete.splice(index, 1)
                }
            })
            .addCase(deleteBookingService.rejected, (state, action) => {
                state.status.delete = "failed"
                if (action.payload && typeof action.payload === 'object' && 'id' in action.payload) {
                    const error = action.payload as ErrorResponse;
                    const index = state.bookingServices.findIndex(bookingServices => bookingServices.id === error.id);
                    if (index !== -1) {
                        state.error.delete[index] = error;
                    }
                }
            })
    }
})

export const {
    openModalBookingServices,
    closeModalBookingServices,
} = bookingServicesSlice.actions

export default bookingServicesSlice.reducer