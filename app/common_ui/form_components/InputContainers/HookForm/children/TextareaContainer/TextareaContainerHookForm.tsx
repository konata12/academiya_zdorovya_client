import BasicInputContainerHookForm from '@/app/common_ui/form_components/InputContainers/HookForm/BasicInputContainerHookForm'
import { HookFormTextareaContainerProps } from '@/app/types/ui/form_components/inputContainers.type'
import styles from './TextareaContainerHookForm.module.scss'
import React from 'react'
import AutoResizingTextareaHookForm from '@/app/common_ui/form_components/basic_components/AutoResizingTextarea/HookForm/AutoResizingTextareaHookForm'

export default function HookFormTextareaContainer<T extends Record<string, any>>({
    label,
    className = {},
    name,
    register,
    errors,
    registerOptions,
    minRows = 1,
    maxRows
}: HookFormTextareaContainerProps<T>) {
    const error = errors[name]
    const { textarea = '', ...childrenClassName } = className

    return (
        <>
            <BasicInputContainerHookForm<T>
                label={label}
                className={childrenClassName}
                name={name}
                errors={errors}
            >
                <AutoResizingTextareaHookForm
                    {...register(name, registerOptions)}
                    className={`input ${(error && 'wrong') || ''} ${styles.textarea} ${className?.textarea || ''}`}
                    id={name}
                    minRows={minRows}
                    maxRows={maxRows}
                />
            </BasicInputContainerHookForm>
        </>
    )
}
