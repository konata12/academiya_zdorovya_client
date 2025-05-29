import { ErrorResponse, StatusType } from "@/app/types/data/response.type"

export type AccessToken = {
    access_token: string
}

export interface Auth {
    accessToken: string | null
    status: {
        login: StatusType
        refresh: StatusType
    }
    error: {
        login: ErrorResponse | null
        refresh: ErrorResponse | null
    }
}

export interface Login {
    userName: string
    password: string
}