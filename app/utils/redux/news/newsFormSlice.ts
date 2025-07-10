import { NewsFormData, NewsFormDataEnum, NewsFormDataEnumType } from "@/app/types/data/news.type"
import { createSlice } from "@reduxjs/toolkit"

const initialState: NewsFormData = {
    title: '',
    description: '',
    backgroundImg: null,
    details: [],
    errors: {
        title: { message: '' },
        description: { message: '' },
        backgroundImg: { message: '' },
        createdAt: { message: '' },
        details: { message: '' },
    }
}

const newsFormSlice = createSlice({
    name: 'newsForm',
    initialState,
    reducers: {
        setNewsFormTitle(state, action: { payload: string }) {
            state.title = action.payload
        },
        setNewsFormDescription(state, action: { payload: string }) {
            state.description = action.payload
        },
        setNewsFormBackgroundImage(state, action: { payload: string }) {
            state.backgroundImg = action.payload
        },
        setNewsFormError(state, action: {
            payload: {
                field: NewsFormDataEnumType,
                message: string
            }
        }) {
            console.log(123)
            const field = action.payload.field

            state.errors[field] = { message: action.payload.message }
        },

        resetNewsFromData: () => initialState,
    },
    extraReducers(builder) {
        builder
    }
})

export const {
    setNewsFormTitle,
    setNewsFormDescription,
    setNewsFormBackgroundImage,
    setNewsFormError,

    resetNewsFromData,
} = newsFormSlice.actions

export default newsFormSlice.reducer