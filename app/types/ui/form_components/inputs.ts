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