'use client'

import SafeLink from '@/app/admin/(provider)/ui/Links/SafeLink/SafeLink'
import React from 'react'
import styles from './page.module.scss'
import DetailsForm from '@/app/admin/(provider)/ui/Forms/details/DetailsForm'
import { usePathname } from 'next/navigation'

export default function page() {
    const pathname = usePathname()
    const linkBackURL = pathname.split('/').slice(0, pathname.split('/').length - 1).join('/')

    return (
        <div>
            <div className={styles.titleContainer}>
                <p className={`title left md`}>
                    Редактор новини
                </p>
                <SafeLink
                    className='btn blue md'
                    href={linkBackURL}
                >
                    Повернутись до створення
                </SafeLink>
            </div>

            <DetailsForm
                titles={true}
                paragraphs={true}
                quotes={true}
                lists={true}
                images={true}
                orderSliceName='newsUpdateDetailsOrder'
            />
        </div>
    )
}