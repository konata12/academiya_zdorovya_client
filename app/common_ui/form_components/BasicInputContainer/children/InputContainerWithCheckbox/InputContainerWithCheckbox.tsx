import React from 'react'
import styles from './InputContainerWithCheckbox.module.scss'
import Checkbox from '@/app/admin/(provider)/ui/Checkbox/Checkbox'
import { InputContainerWithCheckboxProps } from '@/app/types/ui/form_components/inputContainers'

export default function InputContainerWithCheckbox<T extends Record<string, any>>({
    label,
    className = {},
    name,
    register,
    errors,
    registerOptions,
    type = 'text',

    handleFunction,
    isChecked,
}: InputContainerWithCheckboxProps<T>) {
    const error = errors[name]

    return (
        <div className={`${styles.inputContainer} ${className?.inputContainer || ''}`}>
            <div className={`${styles.checkboxContainer} ${className?.checkboxContainer || ''}`}>
                <label
                    className={`inputLabel ${className?.inputLabel || ''}`}
                    htmlFor={name}
                >
                    {label}
                </label>
                <Checkbox
                    handleFunction={handleFunction}
                    isChecked={isChecked}
                />
            </div>

            <input
                className={`input
                    ${(error && 'wrong') || ''}
                    ${styles.input}
                    ${className?.input || ''}
                    ${isChecked ? styles.active : ''}`}
                {...register(name, registerOptions)}
                type={type}
                id={name}
            />
            {error && (
                <p className={`${styles.error} ${className?.error || ''}`}>
                    {error.message as string}
                </p>
            )}
        </div>
    )
}
