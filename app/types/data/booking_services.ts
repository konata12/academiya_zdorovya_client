import { ErrorsResponsesBasic, Status } from "@/app/types/data/response"

export interface BookingService {
    id: number
    name: string
}

export interface BookingServiceInit {
    bookingServices: BookingService[]
    bookingServicesIsModalOpen: boolean[]
    status: Status
    error: ErrorsResponsesBasic
}

export interface BookingServiceFormData {
    name: string
}