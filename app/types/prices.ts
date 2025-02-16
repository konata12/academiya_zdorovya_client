import { ErrorResponse, Status } from "@/app/types/response"

export interface Price {
    id: number
    title: string
    titleDescription: string | null
    meetingsCount: string | null
    meetingsDuration: string | null
    meetingsPrice: string | null
    coursePrice: string | null
}

export interface PriceSection {
    id: number
    title: string
    priceNearTitle: string | null
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

// export interface DepartmentsFormData {
//     city: string
//     hotline: string
//     address: string
//     googleMapUrl: string
//     googleMapReviewsUrl: string
// }

// export type DepartmentsDefaultFormData = Partial<DepartmentsFormData>