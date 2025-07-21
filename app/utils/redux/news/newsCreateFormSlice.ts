import { DetailsRedactorType } from "@/app/types/data/details.type"
import { NewsFormData, NewsFormDataEnumType } from "@/app/types/data/news.type"
import { createSlice } from "@reduxjs/toolkit"

const initialState: NewsFormData = {
    title: '',
    description: '',
    backgroundImg: null,
    details: null,
    errors: {
        title: { message: '' },
        description: { message: '' },
        backgroundImg: { message: '' },
        details: { message: '' },
    }
}

const newsCreateFormSlice = createSlice({
    name: 'newsCreateForm',
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
        setNewsFormDetails(state, action: { payload: DetailsRedactorType }) {
            state.details = action.payload
        },
        setNewsFormError(state, action: {
            payload: {
                field: NewsFormDataEnumType,
                message: string
            }
        }) {
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
    setNewsFormDetails,
    setNewsFormError,

    resetNewsFromData,
} = newsCreateFormSlice.actions

export default newsCreateFormSlice.reducer