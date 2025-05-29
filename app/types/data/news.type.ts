import { DetailsFormDataType, DetailsRedactorType } from "@/app/types/data/details.type"
import { ErrorsResponses, Status } from "@/app/types/data/response.type"

// GENERAL TYPES
export interface News {
    id: number
    title: string
    description: string
    backgroundImgUrl: string
    createdAt: Date
    details: DetailsRedactorType[]
}

export interface NewsInit {
    news: News[]
    newsIsModalOpen: boolean[]
    status: Status
    error: ErrorsResponses
}

// FORM DATA
export interface NewsFormData {
    title: string
    description: string
    backgroundImg: FileList | null
    createdAt: Date
    details: DetailsFormDataType[]
}

// ENUMS
export enum NewsFormDataEnum {
    TITLE = 'title',
    DESCRIPTION = 'description',
    BACKGROUNDIMG = 'backgroundImg',
    CREATEDAT = 'createdAt',
    DETAILS = 'details',
}