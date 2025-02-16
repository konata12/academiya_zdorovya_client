'use client'

import { fullfilled } from '@/app/services/response'
import { createBookingService } from '@/app/utils/redux/booking_services/bookingServicesSlice'
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import styles from './createBookingServiceForm.module.scss'
import { RootState } from '@/app/utils/redux/store'

export default function CreateBookingServiceForm() {
    const [bookingServiceName, setBookingServiceName] = useState('')
    const { error } = useAppSelector((state: RootState) => state.bookingServices)

    const dispatch = useAppDispatch()
    const router = useRouter()

    const formSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const response = await dispatch(createBookingService({ name: bookingServiceName }))
        const isFulfilled = fullfilled(response.meta.requestStatus)

        if (isFulfilled) {
            router.push('/admin/booking_services')
        }
    }

    return (
        <form
            onSubmit={formSubmit}
            className={styles.form}
        >
            <label
                className={`inputLabel `}
                htmlFor="city"
            >
                Повна назва послуги
            </label>
            <input
                className={`input `}
                type="text"
                value={bookingServiceName}
                onChange={(e) => setBookingServiceName(e.target.value)}
                required
            />
            <div className={styles.formErrorWrap}>
                {error.create && <p className={`error ${styles.formError}`}>{error.create.message}</p>}
                <button
                    className={`btn blue xl ${styles.submit}`}
                    type='submit'
                >
                    Створити
                </button>
            </div>
        </form>
    )
}
