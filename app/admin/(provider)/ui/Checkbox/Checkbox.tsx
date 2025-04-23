import React from 'react'
import styles from './Checkbox.module.scss'
import { CheckboxProps } from '@/app/types/ui/form_components/form_basic'

export default function Checkbox({
    handleFunction,
    isChecked,
    elemId
}: CheckboxProps) {
    return (
        <label className={styles.checkbox}>
            <input
                checked={isChecked}
                onChange={handleFunction}
                type="checkbox"
                id={elemId}
            />
            <span>
                <i></i>
            </span>
        </label>
    )
}