export interface FormError {
    message: string
}

export interface FormErrors {
    [key: string]: FormError
}