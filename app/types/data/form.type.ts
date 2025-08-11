import { ErrorBase } from "@/app/types/data/response.type"

export interface FormInputError
    extends ErrorBase { }

export interface FormErrors {
    [key: string]: FormInputError
}