import { BookingService, BookingServiceFormData, BookingServiceInit } from "@/app/types/data/booking_services";
import { ErrorResponse } from "@/app/types/data/response";
import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: BookingServiceInit = {
    bookingServices: [],
    bookingServicesIsModalOpen: [],
    status: null,
    error: {
        getAll: null,
        create: null,
        delete: null,
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

        deleteBookingServiceFromState(state, action: { payload: number }) {
            if (state.bookingServices) {
                const index = state.bookingServices.findIndex(service => {
                    return service.id === action.payload
                })
                state.bookingServices.splice(index, 1)
            }
        },
    },
    extraReducers(builder) {
        builder
            // GET BOOKING SERVICES
            .addCase(fetchBookingServices.pending, (state) => {
                state.status = "loading"
                state.error.getAll = null
            })
            .addCase(fetchBookingServices.fulfilled, (state, action: PayloadAction<BookingService[] | undefined>) => {
                state.status = "succeeded"
                if (action.payload) {
                    state.bookingServices = action.payload
                    state.bookingServicesIsModalOpen = new Array(state.bookingServices.length).fill(false)
                }
            })
            .addCase(fetchBookingServices.rejected, (state, action) => {
                state.status = "failed"
                state.error.getAll = action.payload as ErrorResponse
            })

            // CREATE BOOKING SERVICES
            .addCase(createBookingService.pending, (state) => {
                state.status = "loading"
                state.error.create = null
            })
            .addCase(createBookingService.fulfilled, (state, action: PayloadAction<BookingService[] | undefined>) => {
                state.status = "succeeded"
                console.log(action.payload)
                if (action.payload) {
                    state.bookingServices = action.payload
                    state.bookingServicesIsModalOpen = new Array(state.bookingServices.length).fill(false)
                }
            })
            .addCase(createBookingService.rejected, (state, action) => {
                state.status = "failed"
                state.error.create = action.payload as ErrorResponse
            })

            // DELETE BOOKING SERVICES
            .addCase(deleteBookingService.pending, (state) => {
                state.status = "loading"
                state.error.delete = null
            })
            .addCase(deleteBookingService.fulfilled, (state) => {
                state.status = "succeeded"
            })
            .addCase(deleteBookingService.rejected, (state, action) => {
                state.status = "failed"
                state.error.delete = action.payload as ErrorResponse
            })
    }
})

export const {
    openModalBookingServices,
    closeModalBookingServices,
    deleteBookingServiceFromState,
} = bookingServicesSlice.actions

export default bookingServicesSlice.reducer