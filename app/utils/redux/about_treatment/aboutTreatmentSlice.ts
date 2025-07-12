import { createFormData, parseFormDataToUpdate } from "@/app/services/about_treatment.service"
import { AboutTreatment, AboutTreatmentFormData, AboutTreatmentInit } from "@/app/types/data/about_treatment.type"
import { ErrorResponse } from "@/app/types/data/response.type"
import axiosInstance from "@/app/utils/axios"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

const initialState: AboutTreatmentInit = {
    aboutTreatments: [],
    aboutTreatmentsIsModalOpen: [],
    status: {
        getAll: null,
        create: null,
        delete: null,
        update: null
    },
    error: {
        getOne: null,
        getAll: null,
        create: null,
        delete: null,
        update: null
    }
}

const baseUrl = 'about-treatment'

export const fetchAboutTreatments = createAsyncThunk('aboutTreatment/get', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get<AboutTreatment[]>(`${baseUrl}`)
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

export const createAboutTreatment = createAsyncThunk('aboutTreatment/create', async (
    data: AboutTreatmentFormData,
    { rejectWithValue }
) => {
    try {
        const formData = createFormData(data)
        const response = await axiosInstance.post<AboutTreatment[]>(`${baseUrl}/admin/create`, formData)
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

export const updateAboutTreatment = createAsyncThunk('aboutTreatment/update', async ({
    data,
    aboutTreatmentId: id
}: {
    data: AboutTreatmentFormData
    aboutTreatmentId: string
},
    { rejectWithValue }
) => {
    try {
        const formData = createFormData(data)
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        const response = await axiosInstance.put<AboutTreatment[]>(`${baseUrl}/admin/update/${id}`, formData)
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

export const deleteAboutTreatment = createAsyncThunk('aboutTreatment/delete', async (
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

const aboutTreatmentSlice = createSlice({
    name: 'aboutTreatment',
    initialState,
    reducers: {
        openAboutTreatmentsModal(state, action: { payload: { i: number } }) {
            state.aboutTreatmentsIsModalOpen[action.payload.i] = true
        },
        closeAboutTreatmentsModal(state, action: { payload: { i: number } }) {
            state.aboutTreatmentsIsModalOpen[action.payload.i] = false
        },

        deleteAboutTreatmentsFromState(state, action: { payload: number }) {
            if (state.aboutTreatments) {
                const index = state.aboutTreatments.findIndex(priceSection => {
                    return priceSection.id === action.payload
                })
                state.aboutTreatments.splice(index, 1)
            }
        },
        updateAboutTreatmentInState(state, action: {
            payload: {
                data: AboutTreatmentFormData,
                aboutTreatmentId: string
            }
        }) {
            const index = state.aboutTreatments.findIndex(aboutTreatment => {
                return aboutTreatment.id === +action.payload.aboutTreatmentId
            })
            const parsedData: AboutTreatment = parseFormDataToUpdate(action.payload.data, action.payload.aboutTreatmentId)
            state.aboutTreatments[index] = parsedData
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
            // GET ABOUT TREATMENTS
            .addCase(fetchAboutTreatments.pending, (state) => {
                state.status.getAll = "loading"
                state.error.getAll = null
            })
            .addCase(fetchAboutTreatments.fulfilled, (state, action: PayloadAction<AboutTreatment[] | undefined>) => {
                state.status.getAll = "succeeded"
                if (action.payload) {
                    state.aboutTreatments = action.payload
                    state.aboutTreatmentsIsModalOpen = new Array(state.aboutTreatments.length).fill(false)
                }
            })
            .addCase(fetchAboutTreatments.rejected, (state, action) => {
                state.status.getAll = "failed"
                state.error.getAll = action.payload as ErrorResponse
            })

            // CREATE ABOUT TREATMENT
            .addCase(createAboutTreatment.pending, (state) => {
                state.status.create = "loading"
                state.error.create = null
            })
            .addCase(createAboutTreatment.fulfilled, (state, action: PayloadAction<AboutTreatment[] | undefined>) => {
                state.status.create = "succeeded"
                console.log(action.payload)
                if (action.payload) {
                    state.aboutTreatments = action.payload
                    state.aboutTreatmentsIsModalOpen = new Array(state.aboutTreatments.length).fill(false)
                }
            })
            .addCase(createAboutTreatment.rejected, (state, action) => {
                state.status.create = "failed"
                state.error.create = action.payload as ErrorResponse
            })

            // UPDATE ABOUT TREATMENT
            .addCase(updateAboutTreatment.pending, (state) => {
                state.status.update = "loading"
                state.error.update = null
            })
            .addCase(updateAboutTreatment.fulfilled, (state) => {
                state.status.update = "succeeded"
            })
            .addCase(updateAboutTreatment.rejected, (state, action) => {
                state.status.update = "failed"
                state.error.update = action.payload as ErrorResponse
            })

            // DELETE ABOUT TREATMENT
            .addCase(deleteAboutTreatment.pending, (state) => {
                state.status.delete = "loading"
                state.error.delete = null
            })
            .addCase(deleteAboutTreatment.fulfilled, (state) => {
                state.status.delete = "succeeded"
            })
            .addCase(deleteAboutTreatment.rejected, (state, action) => {
                state.status.delete = "failed"
                state.error.delete = action.payload as ErrorResponse
            })
    }
})

export const {
    openAboutTreatmentsModal,
    closeAboutTreatmentsModal,
    deleteAboutTreatmentsFromState,
    updateAboutTreatmentInState,
    setUpdateError
} = aboutTreatmentSlice.actions

export default aboutTreatmentSlice.reducer