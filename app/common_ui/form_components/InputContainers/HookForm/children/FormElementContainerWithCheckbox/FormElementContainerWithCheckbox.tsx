import React from 'react'
import styles from './FormElementContainerWithCheckbox.module.scss'
import Checkbox from '@/app/admin/(provider)/ui/Checkbox/Checkbox'
import { FromElementContainerWithCheckboxProps } from '@/app/types/ui/form_components/inputContainers.type'
import AnimatePresenseWithDynamicHeight from '@/app/common_ui/animated_components/AnimatePresenseWrapper/AnimatePresenseWithDynamicHeight/AnimatePresenseWithDynamicHeight'

export default function FormElementContainerWithCheckbox<T extends Record<string, any>>({
    children,
    label,
    className = {},
    name,

    handleFunction,
    isChecked,
}: FromElementContainerWithCheckboxProps<T>) {

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
                    elemId={name}
                />
            </div>

            <AnimatePresenseWithDynamicHeight
                childrenIsrendered={isChecked}
                className={{
                    absoluteContainer: styles.absoluteContainer
                }}
            >
                {children}
            </AnimatePresenseWithDynamicHeight>
        </div>
    )
}
