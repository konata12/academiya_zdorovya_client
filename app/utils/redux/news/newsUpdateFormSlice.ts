import { DetailsRedactorType } from "@/app/types/data/details.type"
import { News, NewsFormData, NewsFormDataEnumType } from "@/app/types/data/news.type"
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

const newsUpdateFormSlice = createSlice({
    name: 'newsUpdateForm',
    initialState,
    reducers: {
        setAllNewsFormUpdateDataOnLink(state, action: {payload: News}) {
            state.title = action.payload.title
            state.description = action.payload.description
            state.backgroundImg = action.payload.backgroundImg
            state.details = action.payload.details
        },
        setNewsUpdateFormTitle(state, action: { payload: string }) {
            state.title = action.payload
        },
        setNewsUpdateFormDescription(state, action: { payload: string }) {
            state.description = action.payload
        },
        setNewsUpdateFormBackgroundImage(state, action: { payload: string }) {
            state.backgroundImg = action.payload
        },
        setNewsUpdateFormDetails(state, action: { payload: DetailsRedactorType }) {
            state.details = action.payload
        },
        setNewsUpdateFormError(state, action: {
            payload: {
                field: NewsFormDataEnumType,
                message: string
            }
        }) {
            const field = action.payload.field
            state.errors[field] = { message: action.payload.message }
        },

        resetNewsUpdateFromData: () => initialState,
    },
    extraReducers(builder) {
        builder
    }
})

export const {
    setAllNewsFormUpdateDataOnLink,

    setNewsUpdateFormTitle,
    setNewsUpdateFormDescription,
    setNewsUpdateFormBackgroundImage,
    setNewsUpdateFormDetails,
    setNewsUpdateFormError,

    resetNewsUpdateFromData,
} = newsUpdateFormSlice.actions

export default newsUpdateFormSlice.reducer