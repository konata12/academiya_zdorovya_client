import { ChangeEvent } from "react"
import { Path, RegisterOptions, UseFormRegister, UseFormSetValue } from "react-hook-form";

export interface ReactHookFromComponent<T extends Record<string, any>> {
    name: Path<T>
    register: UseFormRegister<T>;
    registerOptions?: RegisterOptions<T>;
    setValue?: UseFormSetValue<T>
}
export interface CheckboxProps {
    handleFunction: (e: ChangeEvent<HTMLInputElement>) => void
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