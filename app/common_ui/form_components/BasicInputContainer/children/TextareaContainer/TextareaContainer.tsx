import BasicInputContainer from '@/app/common_ui/form_components/BasicInputContainer/BasicInputContainer'
import { TextareaContainerProps } from '@/app/types/ui/form_components/inputContainers.type'
import styles from './TextareaContainer.module.scss'
import React from 'react'
import AutoResizingTextareaHookForm from '@/app/common_ui/form_components/basic_components/AutoResizingTextarea/HookForm/AutoResizingTextareaHookForm'

export default function TextareaContainer<T extends Record<string, any>>({
    label,
    className = {},
    name,
    register,
    errors,
    value,
    registerOptions,
    minRows = 1,
    maxRows
}: TextareaContainerProps<T>) {
    const error = errors[name]
    const { textarea = '', ...childrenClassName } = className

    return (
        <>
            <BasicInputContainer<T>
                label={label}
                className={childrenClassName}
                name={name}
                errors={errors}
            >
                <AutoResizingTextareaHookForm
                    {...register(name, registerOptions)}
                    className={`input ${(error && 'wrong') || ''} ${styles.textarea} ${className?.textarea || ''}`}
                    id={name}
                    value={value}
                    minRows={minRows}
                    maxRows={maxRows}
                />
            </BasicInputContainer>
        </>
    )
}
