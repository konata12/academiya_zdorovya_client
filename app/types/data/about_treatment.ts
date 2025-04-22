import { ErrorsResponses, Status } from "@/app/types/data/response"

// GENERAL TYPES
export interface AboutTreatment {
    id: number
    title: string
    image: string | null
    treatmentTypes: string[]
}
export interface AboutTreatmentInit {
    aboutTreatments: AboutTreatment[]
    aboutTreatmentsIsModalOpen: boolean[]
    status: Status
    error: ErrorsResponses
}

// FORM DATA
export interface AboutTreatmentFormData {
    title: string
    image: FileList | null
    treatmentTypes: TreatmentType[]
}
export interface TreatmentType {
    value: string
}

// FORM UI
export interface AboutTreatmentFormUI {
    treatmentTypesModalIsOpen: boolean[]
}

// ENUMS
export enum AboutTreatmentEnum {
    TITLE = 'title',
    IMG = 'image',
    TREATMENTTYPES= 'treatmentTypes'
}