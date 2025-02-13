export interface ErrorResponse {
    statusCode: number
    message: string
    error?: string
}

export type Status = null
    | 'loading'
    | 'succeeded'
    | 'failed'