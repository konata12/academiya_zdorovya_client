import { ErrorResponse, Status } from "@/app/types/response"

export interface BookingService {
    id: number
    name: string
}

export interface BookingServiceInit {
    bookingServices: BookingService[]
    bookingServicesIsModalOpen: boolean[]
    status: Status
    error: {
        get: ErrorResponse | null
        create: ErrorResponse | null
        delete: ErrorResponse | null
    }
}

export interface BookingServiceFormData {
    name: string
}