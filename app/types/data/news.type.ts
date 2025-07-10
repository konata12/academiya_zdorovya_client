import { DetailsFormDataType, DetailsRedactorType } from "@/app/types/data/details.type"
import { FormErrors } from "@/app/types/data/form.type"
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
    backgroundImg: string | null
    details: DetailsFormDataType[]
    errors: FormErrors
}

// ENUMS
export enum NewsFormDataEnum {
    TITLE = 'title',
    DESCRIPTION = 'description',
    BACKGROUNDIMG = 'backgroundImg',
    CREATEDAT = 'createdAt',
    DETAILS = 'details',
}

// ENUM TYPES
export type NewsFormDataEnumType = `${NewsFormDataEnum}`