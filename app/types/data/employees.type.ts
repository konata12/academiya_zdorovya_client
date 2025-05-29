import { ErrorsResponses, Status } from "@/app/types/data/response.type"

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
    workSpecialities: string[]
    achivements: string[]
    backgroundImgColor: EmployeesBackgroundImgColorType
    imgUrl: string | null
}

export interface EmployeesInit {
    employees: Employee[]
    employeesIsModalOpen: boolean[]
    status: Status
    error: ErrorsResponses
}

// FORM DATA
interface WorkSpecialityFromData {
    value: string
}
interface AchivementFromData extends WorkSpecialityFromData { }
export interface EmployeesFormData {
    name: string
    surname: string
    position: string
    description: string
    degree: string
    instagram?: string
    facebook?: string
    X?: string
    youtube?: string
    workSpecialities: WorkSpecialityFromData[]
    achivements?: AchivementFromData[]
    backgroundImgColor: EmployeesBackgroundImgColorType
    image: FileList | null
}

// UI FORM DATA
export interface EmployeesFormDataSocialMediaUICheckboxes {
    instagramCheckbox: boolean
    facebookCheckbox: boolean
    XCheckbox: boolean
    youtubeCheckbox: boolean
    achivementsCheckbox: boolean
}
export interface EmployeesFormDataUIModalsStates {
    workSpecialitysModalIsOpen: boolean[]
    achivementsModalIsOpen: boolean[]
}
export interface EmployeesFormDataUI
    extends
    EmployeesFormDataSocialMediaUICheckboxes,
    EmployeesFormDataUIModalsStates {
    backgroundImgColor: EmployeesBackgroundImgColorType
}

export type EmployeesCheckboxesType = `${EmployeesFormDataUICheckboxesEnum}`
export type EmployeesModalsStatesType = `${EmployeesFormDataUIModalsStatesEnum}`
export type EmployeesBackgroundImgColorType = `${EmployeesBackgroundImgColorEnum}`

// ENUMS
export enum WorkSpecialitysFormDataEnum {
    VALUE = 'value'
}
export enum AhivementsFormDataEnum {
    VALUE = 'value'
}
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
    WORKSPECIALITIES = 'workSpecialities',
    ACHIVEMENTS = 'achivements',
    BACKGROUNDIMGCOLOR = 'backgroundImgColor',
    IMAGE = 'image'
}
export enum EmployeesBackgroundImgColorEnum {
    GREY = 'grey',
    BLUE = 'blue',
}
export enum EmployeesFormDataUICheckboxesEnum {
    INSTAGRAMCHECKBOX = 'instagramCheckbox',
    FACEBOOKCHECKBOX = 'facebookCheckbox',
    XCHECKBOX = 'XCheckbox',
    YOUTUBECHECKBOX = 'youtubeCheckbox',
    ACHIVEMENTSCHECKBOX = 'achivementsCheckbox'
}
export enum EmployeesFormDataUIModalsStatesEnum {
    WORKSPECIALITYSMODALISOPEN = 'workSpecialitysModalIsOpen',
    ACHIVEMENTSISMODALOPEN = 'achivementsModalIsOpen'
}