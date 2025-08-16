'use client'

import React from 'react';
import styles from './page.module.scss';
import SafeLink from '@/app/admin/(provider)/ui/Links/SafeLink/SafeLink'
import ServiceTypeForm from '@/app/admin/(provider)/ui/Forms/services/serviceType/ServiceTypeForm';


export default function page() {

    return (
        <div className={styles.newsCreateFormPage}>
            <div className={styles.titleContainer}>
                <p className={`title left md`}>
                    Додати вид послуги
                </p>
                <SafeLink
                    className='btn blue md'
                    href='../'
                >
                    Повернутись до послуг
                </SafeLink>
            </div>

            <ServiceTypeForm
                sliceName='serviceTypeCreateForm'
                detailsSliceName='serviceTypeCreateDetailsOrder'
            />
        </div>
    )
}
