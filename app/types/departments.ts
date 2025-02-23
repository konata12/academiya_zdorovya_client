import { ErrorResponse, Status } from "@/app/types/response"

export interface Department {
    id: number
    city: string
    hotline: string
    address: string
    googleMapUrl: string
    googleMapReviewsUrl: string
}

export interface DepartmentsInit {
    departments: Department[]
    departmentsIsModalOpen: boolean[]
    status: Status
    error: {
        getAll: ErrorResponse | null
        getOne: ErrorResponse | null
        create: ErrorResponse | null
        delete: ErrorResponse | null
        update: ErrorResponse | null
    }
}

export interface DepartmentsFormData {
    city: string
    hotline: string
    address: string
    googleMapUrl: string
    googleMapReviewsUrl: string
}

export enum DepartmentsFormDataEnum {
    CITY = 'city',
    HOTLINE = 'hotline',
    ADDRESS ='address',
    GOOGLEMAPURSL ='googleMapUrl',
    GOOGLEMAPREVIEWSURL = 'googleMapReviewsUrl',
}

export type DepartmentsDefaultFormData = Partial<DepartmentsFormData>