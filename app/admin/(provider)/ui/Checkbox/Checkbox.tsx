import React, { ChangeEvent } from 'react'
import styles from './Checkbox.module.scss'

export default function Checkbox({
    handleFunction,
    isChecked,
    elemId
}: {
    handleFunction: (event: ChangeEvent<HTMLInputElement>) => void
        isChecked: boolean
        elemId?: string
}) {
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