'use client'

import React from 'react'
import styles from './page.module.scss'
import CreateServicesForm from '@/app/admin/(provider)/ui/Forms/services/create/CreateServicesForm'

export default function page() {

    return (
        <div className={styles.FormPage}>
            <div className={styles.titleContainer}>
                <p className={`title left md`}>
                    Додати послугу
                </p>
            </div>
            <CreateServicesForm />
        </div>
    )
}