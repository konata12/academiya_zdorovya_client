'use client'

import SafeLink from '@/app/admin/(provider)/ui/Links/SafeLink/SafeLink'
import React from 'react'
import styles from './page.module.scss'
import DetailsForm from '@/app/admin/(provider)/ui/Forms/details/DetailsForm'

export default function page() {
    return (
        <div>
            <div className={styles.titleContainer}>
                <p className={`title left md`}>
                    Редактор новини
                </p>
                <SafeLink
                    className='btn blue md'
                    href='/admin/news/create'
                >
                    Повернутись до створення
                </SafeLink>
            </div>

            <DetailsForm
                titles={true}
                paragraphs={true}
                quoutes={true}
                lists={true}
                images={true}
                orderSliceName='newsCreateDetailsOrder'
            />
        </div>
    )
}