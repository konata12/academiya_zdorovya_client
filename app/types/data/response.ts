export interface ErrorResponse {
    statusCode: number
    message: string
    error?: string
}

export interface ErrorsResponsesBasic {
    getAll: ErrorResponse | null
    create: ErrorResponse | null
    delete: ErrorResponse | null
}
export interface ErrorsResponses extends ErrorsResponsesBasic {
    update: ErrorResponse | null
    getOne?: ErrorResponse | null
}

export type Status = null
    | 'loading'
    | 'succeeded'
    | 'failed'