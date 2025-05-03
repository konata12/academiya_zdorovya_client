import { CheckboxProps } from "@/app/types/ui/form_components/form_basic";
import { FieldErrors, Path, RegisterOptions, UseFormRegister } from "react-hook-form";


// CONTAINER PROPS
export interface InputContainerBasicProps<T extends Record<string, any>> {
    children?: React.ReactNode;
    className?: Styles;
    label: string;
    name: Path<T>;  // This ensures the name is a key of T
    errors: FieldErrors<T>;
}

export interface FromElementContainerWithCheckboxProps<T extends Record<string, any>>
    extends CheckboxProps {
    children: React.ReactNode;
    className?: FormElementWithCheckboxStyles;
    label: string;
    name: Path<T>;
}


// CHILDREN
export interface InputContainerProps<T extends Record<string, any>>
    extends InputContainerBasicProps<T> {
    register: UseFormRegister<T>;
    registerOptions?: RegisterOptions<T>;

    className?: InputContainerStyles;
    type?: React.HTMLInputTypeAttribute;
}
export interface TextareaContainerProps<T extends Record<string, any>>
    extends InputContainerBasicProps<T> {
    register: UseFormRegister<T>;
    registerOptions?: RegisterOptions<T>;

    value: string; // for autosizing textarea
    className?: TextareaContainerStyles;
    minRows?: number;
    maxRows?: number;
}
export interface InputContainerWithCheckboxProps<T extends Record<string, any>>
    extends InputContainerProps<T>, CheckboxProps {
    className?: FormElementWithCheckboxStyles;
}
export interface InputContainerWithDeleteBtnProps<T extends Record<string, any>>
    extends InputContainerProps<T> {
    fieldKey?: string
    index?: number
    handleFunction: (e: React.MouseEvent<HTMLButtonElement>) => void
    className?: InputContainerWithDeleteBtnStyles;
}


// STYLES
export interface Styles {
    inputContainer?: string;
    inputLabel?: string;
    error?: string;
}


// STYLES CHILDREN
interface InputContainerStyles extends Styles {
    input?: string;
}
interface TextareaContainerStyles extends Styles {
    textarea?: string;
}
interface FormElementWithCheckboxStyles extends InputContainerStyles {
    checkboxContainer?: string;
}
interface InputContainerWithDeleteBtnStyles extends InputContainerStyles {
    buttonContainer?: string;
}