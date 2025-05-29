import React from 'react'
import styles from './CreateDetailsInputBtn.module.scss'

interface createDetailsInputBtnProps {
    label: string
    handleFunction: (e: React.MouseEvent<HTMLButtonElement>) => void
    className?: string
}
export default function CreateDetailsInputBtn({
    label,
    handleFunction,
    className = '',
}: createDetailsInputBtnProps) {
    return (
        <div className={`${styles.link}`}>
            <button
                onClick={handleFunction}
                type='button'
                className={`${styles.btn} ${className}`}
            >
                {label}
            </button>
            <div className={`${styles.bottom}`}></div>
        </div>
    )
}
