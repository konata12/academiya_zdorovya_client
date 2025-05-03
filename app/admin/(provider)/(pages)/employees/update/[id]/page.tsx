import React from 'react'
import styles from './page.module.scss'
import UpdateEmployeeFrom from '@/app/admin/(provider)/ui/Forms/employees/update/UpdateEmployeeForm'

export default function page() {
    return (
        <div className={styles.container}>
            <p className={`title left md ${styles.title}`}>Редагувати лікаря</p>
            <UpdateEmployeeFrom />
        </div>
    )
}
