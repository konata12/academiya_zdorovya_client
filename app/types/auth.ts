import { ErrorResponse, Status } from "@/app/types/response"

export type AccessToken = {
    access_token: string
}

export interface Auth {
    accessToken: string | null
    status: Status
    error: {
        login: ErrorResponse | null,
        refresh: ErrorResponse | null,
    }
}

export interface Login {
    userName: string
    password: string
}