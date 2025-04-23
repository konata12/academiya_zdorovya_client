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
    className: InputContainerWithCheckboxStyles;
}
// export type InputContainerWithCheckboxProps<T extends Record<string, any>> = InputContainerProps<T> & Partial<CheckboxProps>

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
interface InputContainerWithCheckboxStyles extends InputContainerStyles {
    checkboxContainer?: string;
}