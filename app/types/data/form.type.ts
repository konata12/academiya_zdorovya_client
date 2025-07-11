export interface FormInputError {
    message: string
}

export interface FormErrors {
    [key: string]: FormInputError
}