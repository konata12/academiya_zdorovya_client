import React from 'react'
import styles from './page.module.scss'
import CreateEmployeeFrom from '@/app/admin/(provider)/ui/Forms/employees/create/CreateEmployeeFrom'

export default function page() {
    return (
        <div className={styles.container}>
            <p className={`title left md ${styles.title}`}>Додати лікаря</p>
            <CreateEmployeeFrom />
        </div>
    )
}
