import { ErrorResponse, Status } from "@/app/types/response"

export type Department = {
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
        get: ErrorResponse | null,
        create: ErrorResponse | null,
        delete: ErrorResponse | null,
        update: ErrorResponse | null,
    }
}

export interface DepartmentsFormData {
    city: string
    hotline: string
    address: string
    googleMapUrl: string
    googleMapReviewsUrl: string
}

export type DepartmentsDefaultFormData = Partial<DepartmentsFormData>