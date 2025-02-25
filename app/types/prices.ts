import { ErrorResponse, Status } from "@/app/types/response"

// GENERAL TYPES
export interface Price extends PriceFormData {
    id: number
}
export interface Titles extends TitlesFormData {
    id: number
}
export interface PriceSection {
    id: number
    titles: Titles[]
    optionalService: string | null
    prices: Price[]
}
export interface PriceSectionInit {
    priceSections: PriceSection[]
    priceSectionsIsModalOpen: boolean[]
    status: Status
    error: {
        getAll: ErrorResponse | null
        getOne: ErrorResponse | null
        create: ErrorResponse | null
        delete: ErrorResponse | null
        update: ErrorResponse | null
    }
}

// FORM DATA
interface TitlesFormData {
    text: string
    priceNearTitle: string | null
}
interface PriceFormData {
    title: string
    titleDescription: string | null
    meetingsCount: string | null
    meetingsDuration: string | null
    meetingPrice: string | null
    coursePrice: string | null
}
export interface PriceSectionFormData {
    titles: TitlesFormData[]
    optionalService: string | null
    prices: PriceFormData[]
}

// PRICE FORM UI TYPES
export interface PriceSectionUI {
    addTitlePriceCheckbox: boolean[]

    optionalServiceCheckbox: boolean
    optionalServiceInputHeight: number

    priceVariantsHeight: number
    addPriceVariantCheckbox: boolean[]
    priceVariantsCheckbox: boolean
    meetingsCountCheckbox: boolean
    meetingDurationCheckbox: boolean
    meetingPriceCheckbox: boolean
    meetingsTotalPriceCheckbox: boolean
}

// ENUMS
export enum PriceTitleEnum {
    TEXT = 'text',
    PRICENEARTITLE = 'priceNearTitle',
}
export enum PriceVariantOptionsEnum {
    TITLE = 'title',
    TITLEDESCRIPTION = 'titleDescription',
    COUNT = 'meetingsCount',
    DURATION = 'meetingsDuration',
    PRICE = 'meetingPrice',
    TOTALPRICE = 'coursePrice',
}
export enum PriceSectionEnum {
    OPTIONALSERVICE = 'optionalService'
}

// export type DepartmentsDefaultFormData = Partial<DepartmentsFormData>