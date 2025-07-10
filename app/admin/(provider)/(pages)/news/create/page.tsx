'use client'

import React from 'react'
import styles from './page.module.scss'
import CreateNewsForm from '@/app/admin/(provider)/ui/Forms/news/create/CreateNewsForm'
import SafeLink from '@/app/admin/(provider)/ui/Links/SafeLink/SafeLink'

export default function page() {

    return (
        <div className={styles.newsCreateFormPage}>
            <div className={styles.titleContainer}>
                <p className={`title left md`}>
                    Додати новину
                </p>
                <SafeLink
                    className='btn blue md'
                    href='/admin/news'
                >
                    Повернутись до новин
                </SafeLink>
            </div>
            <CreateNewsForm />
        </div>
    )
}
