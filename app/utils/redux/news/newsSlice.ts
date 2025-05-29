import { News, NewsFormData, NewsInit } from "@/app/types/data/news.type";
import { ErrorResponse } from "@/app/types/data/response.type";
import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: NewsInit = {
    news: [
        // {
        // id: 1,
        // title: '123',
        // description: '123',
        // backgroundImgUrl: '123',
        // createdAt: new Date(),
        // details: []
        // }
    ],
    // need for every new to have seperate state for ModalWindow of every new
    newsIsModalOpen: [],
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

const baseUrl = 'news'

export const fetchNews = createAsyncThunk('news/getAll', async (
    _,
    { rejectWithValue }
) => {
    try {
        const response = await axiosInstance.get<News[]>(`${baseUrl}`)
        console.log(response)
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate delay
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

export const fetchOneNew = createAsyncThunk('news/getOne', async (
    id: string,
    { rejectWithValue }
) => {
    try {
        const response = await axiosInstance.get<News[]>(`${baseUrl}/admin/${id}`)
        // console.log(response)
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

export const createNew = createAsyncThunk('news/create', async (
    data: NewsFormData,
    { rejectWithValue }
) => {
    try {
        // const formData = createNewsFormData(data)
        const response = await axiosInstance.post<News[]>(`${baseUrl}/admin/create`, data)
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

export const updateNew = createAsyncThunk('news/update', async ({
    data,
    id
}: {
    data: NewsFormData
    id: string
}, { rejectWithValue }) => {
    try {
        console.log('redux', data)
        // const formData = createNewsFormData(data)
        const response = await axiosInstance.put(`${baseUrl}/admin/update/${id}`, data)
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

export const deleteNew = createAsyncThunk('news/delete', async (
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

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        openNewsModal(state, action: { payload: { i: number } }) {
            state.newsIsModalOpen[action.payload.i] = true
        },
        closeNewsModal(state, action: { payload: { i: number } }) {
            state.newsIsModalOpen[action.payload.i] = false
        },

        deleteNewsFromState(state, action: { payload: number }) {
            // if (state.news) {
            //     const index = state.news.findIndex(new => {
            //         return new.id === action.payload
            //     })
            //     state.news.splice(index, 1)
            // }
        },
        updateNewInState(state, action: {
            payload: {
                data: NewsFormData,
                id: string
            }
        }) {
            // const index = state.news.findIndex(new => {
            //     return new.id === +action.payload.id
            // })
            // state.news[index] = parseNewsFormDataToUpdate(action.payload.data, action.payload.id)
        },
        setNewsUpdateError(state) {
            state.error.update = {
                message: 'Дані ті самі, окрім картинки, спочатку змініть значення',
                statusCode: 0
            }
        }
    },
    extraReducers(builder) {
        builder
            // GET ALL NEWS
            .addCase(fetchNews.pending, (state) => {
                state.status.getAll = "loading"
                state.error.getAll = null
            })
            .addCase(fetchNews.fulfilled, (state, action: PayloadAction<News[] | undefined>) => {
                state.status.getAll = "succeeded"
                if (action.payload) {
                    state.news = action.payload
                    state.newsIsModalOpen = new Array(state.news.length).fill(false)
                }
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status.getAll = "failed"
                state.error.getAll = action.payload as ErrorResponse
            })

            // GET ONE NEWS
            .addCase(fetchOneNew.pending, (state) => {
                state.status.getOne = "loading"
                state.error.getOne = null
            })
            .addCase(fetchOneNew.fulfilled, (state, action: PayloadAction<News[] | undefined>) => {
                state.status.getOne = "succeeded"
                if (action.payload) {
                    state.news = action.payload
                    state.newsIsModalOpen = new Array(state.news.length).fill(false)
                }
            })
            .addCase(fetchOneNew.rejected, (state, action) => {
                state.status.getOne = "failed"
                state.error.getOne = action.payload as ErrorResponse
            })

            // CREATE NEW
            .addCase(createNew.pending, (state) => {
                state.status.create = "loading"
                state.error.create = null
            })
            .addCase(createNew.fulfilled, (state, action: PayloadAction<News[] | undefined>) => {
                state.status.create = "succeeded"
                if (action.payload) {
                    state.news = action.payload
                    state.newsIsModalOpen = new Array(state.news.length).fill(false)
                }
            })
            .addCase(createNew.rejected, (state, action) => {
                state.status.create = "failed"
                state.error.create = action.payload as ErrorResponse
            })

            // UPDATE NEW
            .addCase(updateNew.pending, (state) => {
                state.status.update = "loading"
                state.error.update = null
            })
            .addCase(updateNew.fulfilled, (state) => {
                state.status.update = "succeeded"
            })
            .addCase(updateNew.rejected, (state, action) => {
                state.status.update = "failed"
                state.error.update = action.payload as ErrorResponse
            })

            // DELETE NEWS
            .addCase(deleteNew.pending, (state) => {
                state.status.delete = "loading"
                state.error.delete = null
            })
            .addCase(deleteNew.fulfilled, (state) => {
                state.status.delete = "succeeded"
            })
            .addCase(deleteNew.rejected, (state, action) => {
                state.status.delete = "failed"
                state.error.delete = action.payload as ErrorResponse
            })
    }
})

export const {
    openNewsModal,
    closeNewsModal,
    deleteNewsFromState,
    setNewsUpdateError,
    updateNewInState,
} = newsSlice.actions

export default newsSlice.reducer