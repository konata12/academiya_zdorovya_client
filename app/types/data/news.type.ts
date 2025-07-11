import { DetailsRedactorType } from '@/app/types/data/details.type';
import { ErrorsResponses, Status } from '@/app/types/data/response.type';
import { FormInputError } from '@/app/types/data/form.type';


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
    details: DetailsRedactorType | null
    errors: {
        title: FormInputError
        description: FormInputError
        backgroundImg: FormInputError
        details: FormInputError
    }
}

// CREATE/UPDATE FORM DATA
export interface CreateNewsFormData {
    title: string
    description: string
    backgroundImg: string
    details: DetailsRedactorType
}

// ENUMS
export enum NewsFormDataEnum {
    TITLE = 'title',
    DESCRIPTION = 'description',
    BACKGROUNDIMG = 'backgroundImg',
    DETAILS = 'details',
}

// ENUM TYPES
export type NewsFormDataEnumType = `${NewsFormDataEnum}`