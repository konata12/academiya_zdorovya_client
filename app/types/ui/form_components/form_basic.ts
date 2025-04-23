import { ChangeEvent } from "react"

export interface CheckboxProps {
    handleFunction: (event: ChangeEvent<HTMLInputElement>) => void
    isChecked: boolean
    elemId?: string
}