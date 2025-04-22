import { PriceSection, PriceSectionFormData, PriceSectionInit } from "@/app/types/data/prices";
import { ErrorResponse } from "@/app/types/data/response";
import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: PriceSectionInit = {
    priceSections: [],
    priceSectionsIsModalOpen: [],
    status: null,
    error: {
        getOne: null,
        getAll: null,
        create: null,
        delete: null,
        update: null
    }
}

const baseUrl = 'prices'

export const fetchPriceSections = createAsyncThunk('prices/get', async (
    id: string,
    { rejectWithValue }
) => {
    try {
        const response = await axiosInstance.get<PriceSection[]>(`${baseUrl}/admin/all`, {
            params: {
                departmentId: id
            }
        })
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

export const createPriceSection = createAsyncThunk('prices/create', async ({
    data,
    departmentId
}: {
    data: PriceSectionFormData
    departmentId: number
},
    { rejectWithValue }
) => {
    try {
        const response = await axiosInstance.post<PriceSection[]>(`${baseUrl}/admin/create`, {
            ...data,
            departmentId
        })
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

export const deletePriceSection = createAsyncThunk('prices/delete', async (
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
                message: error.response?.data.error || 'Unexpected server error',
                statusCode: error.status || 500
            }
            return rejectWithValue(serializableError)
        }
    }
})

const pricesSlice = createSlice({
    name: 'prices',
    initialState,
    reducers: {
        openPriceSectionsModal(state, action: { payload: { i: number } }) {
            state.priceSectionsIsModalOpen[action.payload.i] = true
        },
        closePriceSectionsModal(state, action: { payload: { i: number } }) {
            state.priceSectionsIsModalOpen[action.payload.i] = false
        },

        deletePriceSectionFromState(state, action: { payload: number }) {
            if (state.priceSections) {
                const index = state.priceSections.findIndex(priceSection => {
                    return priceSection.id === action.payload
                })
                state.priceSections.splice(index, 1)
            }
        },
    },
    extraReducers(builder) {
        builder
            // GET PRICE SECTIONS
            .addCase(fetchPriceSections.pending, (state) => {
                state.status = "loading"
                state.error.getAll = null
            })
            .addCase(fetchPriceSections.fulfilled, (state, action: PayloadAction<PriceSection[] | undefined>) => {
                state.status = "succeeded"
                if (action.payload) {
                    state.priceSections = action.payload
                    state.priceSectionsIsModalOpen = new Array(state.priceSections.length).fill(false)
                }
            })
            .addCase(fetchPriceSections.rejected, (state, action) => {
                state.status = "failed"
                state.error.getAll = action.payload as ErrorResponse
            })

            // CREATE PRICE SECTION
            .addCase(createPriceSection.pending, (state) => {
                state.status = "loading"
                state.error.create = null
            })
            .addCase(createPriceSection.fulfilled, (state, action: PayloadAction<PriceSection[] | undefined>) => {
                state.status = "succeeded"
                console.log(action.payload)
                if (action.payload) {
                    state.priceSections = action.payload
                    state.priceSectionsIsModalOpen = new Array(state.priceSections.length).fill(false)
                }
            })
            .addCase(createPriceSection.rejected, (state, action) => {
                state.status = "failed"
                state.error.create = action.payload as ErrorResponse
            })

            // DELETE BOOKING SERVICES
            .addCase(deletePriceSection.pending, (state) => {
                state.status = "loading"
                state.error.delete = null
            })
            .addCase(deletePriceSection.fulfilled, (state) => {
                state.status = "succeeded"
            })
            .addCase(deletePriceSection.rejected, (state, action) => {
                state.status = "failed"
                state.error.delete = action.payload as ErrorResponse
            })
    }
})

export const {
    openPriceSectionsModal,
    closePriceSectionsModal,
    deletePriceSectionFromState,
} = pricesSlice.actions

export default pricesSlice.reducer