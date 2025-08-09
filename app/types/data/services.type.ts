import { DraggableComponent } from "@/app/common_ui/animated_components/DraggableAreaContainers/DraggableAreaContainer"
import { DetailsDataRenderElementBasicType, DetailsRedactorType } from "@/app/types/data/details.type"
import { FormInputError } from "@/app/types/data/form.type"
import { ErrorsResponses, Status } from "@/app/types/data/response.type"
import { OrderElementBasicType } from "@/app/utils/hooks/admin/dragAndDrop/useOrderedList"

export type ServiceFormIndexedDBType = "service_create_images" | 'service_update_images'


export interface Service {
    id: number
    title: string
    shortDescription: string
    image: string

    treatmentStages: ServiceTreatmentStageBasicType[]
    mainDescription: string
    treatmentTypesDescription: string | null
}

// BASIC
export interface ServiceTreatmentStageBasicType {
    title: string
    description: string
}
export interface ServiceTreatmentStageType
    extends DetailsDataRenderElementBasicType,
    ServiceTreatmentStageBasicType { }

export interface ServiceTreatmentBasicType {
    title: string
    description: string
    backgroundImg: string | null
    details: DetailsRedactorType | null
}
export interface ServiceTreatmentType
    extends DetailsDataRenderElementBasicType,
    ServiceTreatmentBasicType {
    id: number
}
export interface ServiceEmployeeBasicType {
    id: number
    name: string
    surname: string
    position: string
}

// HANDLESUBMIT 
export type ServiceHandleSubmitErrorIdType = ServiceFormDataEnumType
    | `${ServiceFormDataEnum.TREATMENTSTAGES}_${ServiceTreatmentStageEnumType}_${number}`

export type ServiceHandleSubmitStringKeysType = Exclude<ServiceStringKeysType, ServiceFormDataEnum.IMAGE | ServiceFormDataEnum.TREATMENTTYPESDESCRIPTION>

// REDUX
export interface ServiceInit {
    service: Service[]
    serviceIsModalOpen: boolean[]
    status: Status
    error: ErrorsResponses
}


// FORM DATA
export interface ServiceFormData {
    title: string
    shortDescription: string
    image: string

    treatmentStages: ServiceTreatmentStageBasicType[]
    mainDescription: string

    treatmentTypesDescription: string | null
    treatmentTypes: ServiceTreatmentTypeServiceFormData[]
    employees: ServiceEmployeeFormData[]

    errors: ServiceFormDataErrors
}

export interface ServiceTreatmentTypeServiceFormData
    extends DraggableComponent,
    ServiceTreatmentBasicType {
    backgroundImg: string
    details: DetailsRedactorType
}
export interface ServiceEmployeeFormData
    extends DraggableComponent, ServiceEmployeeBasicType { }

// TREATMENT TYPES FORM DATA
export interface ServiceTreatmentTypeFormData
    extends DraggableComponent,
    ServiceTreatmentBasicType {
    errors: {
        title: FormInputError
        description: FormInputError
        backgroundImg: FormInputError
        details: FormInputError
    }
}

// FORM DATA ERROR TYPES
export interface ServiceFormDataErrors {
    title: FormInputError
    shortDescription: FormInputError
    image: FormInputError
    treatmentStages: ServiceTreatmentStageFormDataError[]
    mainDescription: FormInputError
    treatmentTypesDescription: FormInputError
    treatmentTypes: FormInputError
    employees: FormInputError
}
export interface ServiceTreatmentStageFormDataError {
    title: FormInputError
    description: FormInputError
}

// CREATE/UPDATE FORM DATA TYPES
export interface CreateServiceFormData {
    title: string
    shortDescription: string
    image: string

    treatmentStages: CreateServiceTreatmentStagesFormData[]
    mainDescription: string

    treatmentTypesDescription: string | null
    treatmentTypes: CreateServiceTreatmentTypesFormData[] | null
    employees: CreateServiceEmployeesFormData[]
}

export interface CreateServiceTreatmentStagesFormData
    extends OrderElementBasicType,
    ServiceTreatmentStageBasicType { }

export interface CreateServiceTreatmentTypesFormData
    extends OrderElementBasicType,
    ServiceTreatmentBasicType {
    backgroundImg: string
    details: DetailsRedactorType
}
export interface UpdateServiceTreatmentTypesFormData
    extends CreateServiceTreatmentTypesFormData {
    id: number
}

export interface CreateServiceEmployeesFormData
    extends OrderElementBasicType,
    ServiceEmployeeBasicType { }
export interface UpdateServiceEmployeesFormData
    extends CreateServiceEmployeesFormData{ }

// CREATE/UPDATE FORM DATA SLICE TYPES
export type ServiceStringKeysType = ServiceFormDataEnum.TITLE
    | ServiceFormDataEnum.SHORTDESCRIPTION
    | ServiceFormDataEnum.IMAGE
    | ServiceFormDataEnum.MAINDESCRIPTION
    | ServiceFormDataEnum.TREATMENTTYPESDESCRIPTION

// UI FORM DATA
export interface ServiceFormDataUICheckboxes {
    treatmentTypesCheckbox: boolean
    treatmentTypesDescriptionCheckbox: boolean
}
export interface ServiceFormDataUIModalsStates {
    treatmentStagesModalIsOpen: boolean[]
    treatmentTypesModalIsOpen: boolean[]
    employeesModalIsOpen: boolean[]
}
export interface ServiceFormDataUI
    extends ServiceFormDataUICheckboxes,
    ServiceFormDataUIModalsStates { }

// HOOKS
export type ServiceFormHandleChangeField = Exclude<ServiceFormDataEnum, ServiceFormDataEnum.TREATMENTSTAGES>
    | `${ServiceFormDataEnum.TREATMENTSTAGES}_${ServiceTreatmentStageEnumType}`

// ENUMS
export enum ServiceFormDataEnum {
    TITLE = 'title',
    SHORTDESCRIPTION = 'shortDescription',
    IMAGE = 'image',
    TREATMENTSTAGES = 'treatmentStages',
    MAINDESCRIPTION = 'mainDescription',
    TREATMENTTYPESDESCRIPTION = 'treatmentTypesDescription',
    TREATMENTTYPES = 'treatmentTypes',
    EMPLOYEES = 'employees',
}
export enum ServiceTreatmentStageEnum {
    TITLE = 'title',
    DESCRIPTION = 'description',
}
export enum ServiceTreatmentTypesEnum {
    TITLE = 'title',
    DESCRIPTION = 'description',
    BACKGROUNDIMG = 'backgroundImg',
    DETAILS = 'details',
}

export enum ServiceFormDataUICheckboxesEnum {
    TREATMENTTYPESCHECKBOX = 'treatmentTypesCheckbox',
    TREATMENTTYPESDESCRIPTIONCHECKBOX = 'treatmentTypesDescriptionCheckbox',
}
export enum ServiceFormDataUIModalsStatesEnum {
    TREATMENTSTAGESMODALISOPEN = 'treatmentStagesModalIsOpen',
    TREATMENTSTYPESMODALISOPEN = 'treatmentTypesModalIsOpen',
    EMPLOYEEMODALISOPEN = 'employeesModalIsOpen',
}

export enum ServiceEmployeesFormDataEnum {
    ID = 'id',
    NAME = 'name',
    SURNAME = 'surname',
    POSITION = 'position',
}

// ENUM TYPES
export type ServiceFormDataEnumType = `${ServiceFormDataEnum}`
export type ServiceTreatmentStageEnumType = `${ServiceTreatmentStageEnum}`
export type ServiceTreatmentTypesEnumType = `${ServiceTreatmentTypesEnum}`
export type ServiceFormDataUICheckboxesType = `${ServiceFormDataUICheckboxesEnum}`
export type ServiceModalsStatesType = `${ServiceFormDataUIModalsStatesEnum}`