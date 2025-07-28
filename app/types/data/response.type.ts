// ERROR RESPONSE TYPES
export interface ErrorResponse {
    statusCode: number
    message: string
    error?: string
    id?: number
}

export interface ErrorsResponsesBasic {
    getAll: ErrorResponse | null
    create: ErrorResponse | null
    delete: (ErrorResponse | null)[]
}
export interface ErrorsResponses extends ErrorsResponsesBasic {
    update: ErrorResponse | null
    getOne?: ErrorResponse | null
}

// RESPONSE STATUS TYPES
export type StatusType = null
    | 'loading'
    | 'succeeded'
    | 'failed'

export interface StatusBasic {
    getAll: StatusType
    create: StatusType
    delete: StatusType
}

export interface Status extends StatusBasic {
    update: StatusType
    getOne?: StatusType
}

// ERROR ENUMS
export enum ParsingResponseErrorsEnum {
    GETNAMEFROMSIGNEDURL = 'ERROR'
}