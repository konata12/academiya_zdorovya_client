import { FormInputError } from "@/app/types/data/form.type"
import { ErrorsResponses, Status } from "@/app/types/data/response.type"

export type EmployeeFormIndexedDBType = "employee_create_images" | 'employee_update_images'
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
    achivements: string[] | null
    backgroundImgColor: EmployeesBackgroundImgColorType
    image: string
}

export interface EmployeesInit {
    employees: Employee[]
    employeesIsModalOpen: boolean[]
    status: Status
    error: ErrorsResponses
}


// FORM DATA
interface EmployeeFormDataErrorsType {
    name: FormInputError
    surname: FormInputError
    position: FormInputError
    description: FormInputError
    degree: FormInputError
    instagram: FormInputError
    facebook: FormInputError
    X: FormInputError
    youtube: FormInputError
    workSpecialities: FormInputError[]
    achivements: FormInputError[]
    backgroundImgColor: FormInputError
    image: FormInputError
}
export interface EmployeeFormData {
    name: string
    surname: string
    position: string
    description: string
    degree: string
    instagram?: string
    facebook?: string
    X?: string
    youtube?: string
    workSpecialities: string[]
    achivements?: string[]
    backgroundImgColor: EmployeesBackgroundImgColorType
    image: string | null

    errors: EmployeeFormDataErrorsType
}
// CREATE/UPDATE FORM DATA
export interface CreateEmployeeFormData {
    name: string
    surname: string
    position: string
    description: string
    degree: string
    instagram?: string
    facebook?: string
    X?: string
    youtube?: string
    workSpecialities: string[]
    achivements?: string[]
    backgroundImgColor: EmployeesBackgroundImgColorType
    image: string
}
export interface UpdateEmployeeRequestIsEuqalCheck {
    name: string
    surname: string
    position: string
    description: string
    degree: string
    instagram?: string
    facebook?: string
    X?: string
    youtube?: string
    workSpecialities: string[]
    achivements?: string[]
    backgroundImgColor: EmployeesBackgroundImgColorType
    image: string
}
// CREATE/UPDATE FORM DATA SLICE TYPES
export type EmployeeStringKeysType = EmployeesFormDataEnum.NAME
    | EmployeesFormDataEnum.SURNAME
    | EmployeesFormDataEnum.POSITION
    | EmployeesFormDataEnum.DESCRIPTION
    | EmployeesFormDataEnum.DEGREE
    | EmployeesFormDataEnum.IMAGE
export type EmployeeSocialMediaKeysType = EmployeesFormDataEnum.INSTAGRAM
    | EmployeesFormDataEnum.FACEBOOK
    | EmployeesFormDataEnum.X
    | EmployeesFormDataEnum.YOUTUBE
export type EmployeeStringArrayKeysType = EmployeesFormDataEnum.WORKSPECIALITIES
    | EmployeesFormDataEnum.ACHIVEMENTS

export type EmployeeStringKeysWithoutImageType = Exclude<EmployeeStringKeysType, EmployeesFormDataEnum.IMAGE>

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
    EmployeesFormDataUIModalsStates {}

export type EmployeesCheckboxesType = `${EmployeesFormDataUICheckboxesEnum}`
export type EmployeesModalsStatesType = `${EmployeesFormDataUIModalsStatesEnum}`
export type EmployeesBackgroundImgColorType = `${EmployeesBackgroundImgColorEnum}`
export type EmployeesFormDataEnumType = `${EmployeesFormDataEnum}`

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
    IMAGE = 'image',
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
    ACHIVEMENTSISMODALISOPEN = 'achivementsModalIsOpen'
}