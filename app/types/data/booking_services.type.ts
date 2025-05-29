import { ErrorsResponsesBasic, StatusBasic } from "@/app/types/data/response.type"

export interface BookingService {
    id: number
    name: string
}

export interface BookingServiceInit {
    bookingServices: BookingService[]
    bookingServicesIsModalOpen: boolean[]
    status: StatusBasic
    error: ErrorsResponsesBasic
}

export interface BookingServiceFormData {
    name: string
}