import BasicInputContainer from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/BasicInputContainer";
import type { TextareaContainer } from "@/app/types/ui/form_components/inputContainers.type";
import styles from './TextareaContainer.module.scss';
import AutoResizingTextarea from "@/app/common_ui/form_components/basic_components/AutoResizingTextarea/AutoResizingTextarea";


export function TextareaContainer({
    label,
    inputId,
    value = '',
    error,
    minRows,
    maxRows,
    className,
    changeEvent,
}: TextareaContainer<HTMLTextAreaElement>) {
    const errorForStyle = error && error.message

    return (
        <BasicInputContainer
            label={label}
            inputId={inputId}
            error={error}
            className={className}
        >
            <AutoResizingTextarea
                className={`input ${(errorForStyle && 'wrong') || ''} ${styles.textarea} ${className?.textarea || ''}`}
                id={inputId}
                minRows={minRows}
                maxRows={maxRows}
                onChange={changeEvent}
                value={value}
            />
        </BasicInputContainer>
    )
}