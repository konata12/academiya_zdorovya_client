import BasicInputContainer from '@/app/common_ui/form_components/BasicInputContainer/BasicInputContainer'
import { InputContainerProps } from '@/app/types/ui/form_components/inputs'
import styles from './InputContainer.module.scss'
import React from 'react'

export default function InputContainer<T extends Record<string, any>>({
    label,
    className = {},
    name,
    register,
    errors,
    registerOptions,
    type = 'text'
}: InputContainerProps<T>) {
    const error = errors[name]
    const { input = '', ...childrenClassName } = className

    return (
        <>
            <BasicInputContainer<T>
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
            </BasicInputContainer>
        </>
    )
}
