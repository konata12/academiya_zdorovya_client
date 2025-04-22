import React from 'react'
import styles from './BasicInputContainer.module.scss'
import { InputContainerBasicProps } from '@/app/types/ui/form_components/inputs';

export default function BasicInputContainer<T extends Record<string, any>>({
    label,
    className,
    name,
    errors,
    children,
}: InputContainerBasicProps<T>) {
    const error = errors[name];
    
    return (
        <div className={`${styles.inputContainer} ${className?.inputContainer || ''}`}>
            <label
                className={`inputLabel ${className?.inputLabel || ''}`}
                htmlFor={name}
            >
                {label}
            </label>
            {children}
            {error && (
                <p className={`${styles.error} ${className?.error || ''}`}>
                    {error.message as string}
                </p>
            )}
        </div>
    );
}
