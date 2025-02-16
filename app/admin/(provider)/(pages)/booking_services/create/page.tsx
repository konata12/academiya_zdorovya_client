import CreateBookingServiceForm from '@/app/admin/(provider)/ui/Forms/bookingService/create/createBookingServiceForm'
import React from 'react'
import styles from './page.module.scss'

export default function page() {
    return (
        <div className={styles.container}>
            <p className={`title left md ${styles.title}`}>Додати послугу</p>
            <CreateBookingServiceForm />
        </div>
    )
}
