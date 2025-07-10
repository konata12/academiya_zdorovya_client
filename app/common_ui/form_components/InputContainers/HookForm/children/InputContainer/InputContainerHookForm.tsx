import BasicInputContainerHookForm from '@/app/common_ui/form_components/InputContainers/HookForm/BasicInputContainerHookForm'
import { HookFormInputContainerProps } from '@/app/types/ui/form_components/inputContainers.type'
import styles from './InputContainerHookForm.module.scss'
import React from 'react'

export default function HookFormInputContainer<T extends Record<string, any>>({
    label,
    className = {},
    name,
    register,
    errors,
    registerOptions,
    type = 'text',
}: HookFormInputContainerProps<T>) {
    const error = errors[name]
    const { input = '', ...childrenClassName } = className

    return (
        <>
            <BasicInputContainerHookForm<T>
                label={label}
                className={childrenClassName}
                name={name}
                errors={errors}
            >
                <input
                    className={`input ${(error && 'wrong') || ''} ${styles.input} ${className?.input || ''}`}
                    {...register(name, registerOptions)}
                    type={type}
                    id={name}
                />
            </BasicInputContainerHookForm>
        </>
    )
}
