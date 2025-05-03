import { ChangeEvent } from "react"

export interface CheckboxProps {
    handleFunction: (event: ChangeEvent<HTMLInputElement>) => void
    isChecked: boolean
    elemId?: string
    className?: CheckboxStyles
    [key: string]: any;
}

interface CheckboxStyles {
    label?: string
    input?: string
    span?: string
    i?: string
}