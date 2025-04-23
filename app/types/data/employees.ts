import { ErrorResponse, ErrorsResponses, Status } from "@/app/types/data/response"

// GENERAL TYPES
export interface Employee {
    id: number
    name: string
    surname: string
    position: string
    description: string
    degree: string
    instagram: string | null
    facebook: string | null
    X: string | null
    youtube: string | null
    workSpeciality: string[]
    achivement: string[]
    backgroundImgColor: string
    imgName: string
}

export interface EmployeesInit {
    employees: Employee[]
    employeesIsModalOpen: boolean[]
    status: Status
    error: ErrorsResponses
}

// FORM DATA
export interface EmployeesFormData {
    name: string
    surname: string
    position: string
    description: string
    degree: string
    instagram: string | null
    facebook: string | null
    X: string | null
    youtube: string | null
    workSpeciality: string[]
    achivement: string[]
    backgroundImgColor: string
    imgName: string
}

// UI FORM DATA
export interface EmployeesFormDataUICheckboxes {
    instagramCheckbox: boolean
    facebookCheckbox: boolean
    XCheckbox: boolean
    youtubeCheckbox: boolean
}
export interface EmployeesFormDataUI extends EmployeesFormDataUICheckboxes {}
export type EmployeesCheckboxesType = `${EmployeesFormDataUICheckboxesEnum}`

// ENUMS
export enum EmployeesFormDataEnum {
    NAME = 'name',
    SURNAME = 'surname',
    POSITION = 'position',
    DESCRIPTION = 'description',
    DEGREE = 'degree',
    INSTAGRAM = 'instagram',
    FACEBOOK = 'facebook',
    X = 'X',
    YOUTUBE = 'youtube',
    WORKSPECIALITY = 'workSpeciality',
    ACHIVEMENT = 'achivement',
    BACKGROUNDIMGCOLOR = 'backgroundImgColor',
    IMGNAME = 'imgName'
}
export enum EmployeesFormDataUICheckboxesEnum {
    INSTAGRAMCHECKBOX = 'instagramCheckbox',
    FACEBOOKCHECKBOX = 'facebookCheckbox',
    XCHECKBOX = 'XCheckbox',
    YOUTUBECHECKBOX = 'youtubeCheckbox',
}