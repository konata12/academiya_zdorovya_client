import React from 'react'
import styles from './page.module.scss'
import CreateAboutTreatmentForm from '@/app/admin/(provider)/ui/Forms/aboutTreatment/create/CreateAboutTreatmentForm'

export default function page() {
    return (
        <div className={styles.container}>
            <p className={`title left md ${styles.title}`}>Додати послугу</p>
            <CreateAboutTreatmentForm />
        </div>
    )
}
