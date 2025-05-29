'use client'

import CommonTable from '@/app/admin/(provider)/ui/Tables/Common/CommonTable'
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks'
import { RootState } from '@/app/utils/redux/store'
import React, { useEffect } from 'react'
import styles from './layout.module.scss'
import TableLine from '@/app/admin/(provider)/ui/Tables/ListOption/TableLine'
import SafeLink from '@/app/admin/(provider)/ui/Links/SafeLink/SafeLink'
import { closeModalBookingServices, deleteBookingServiceFromState, fetchBookingServices, openModalBookingServices, deleteBookingService as deleteBookingServiceAction } from '@/app/utils/redux/booking_services/bookingServicesSlice'
import ModalWindow from '@/app/admin/(provider)/ui/Forms/ModalWindow/ModalWindow'
import { fullfilled } from '@/app/services/response'
import { usePathname } from 'next/navigation'
import { checkCreatePage } from '@/app/services/navigation'
import CommonTable404 from '@/app/admin/(provider)/ui/Tables/Common/CommonTable404/CommonTable404'

const titles = ['Послуга', 'Опції']

export default function BookingServices({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const {
        bookingServices,
        bookingServicesIsModalOpen,
        error,
        status
    } = useAppSelector((state: RootState) => state.bookingServices)
    const dispatch = useAppDispatch()
    const pathname = usePathname()
    const isCreatePage = checkCreatePage(pathname)

    useEffect(() => {
        dispatch(fetchBookingServices())
    }, [])

    const deleteBookingService = async (id: number, i: number) => {
        const response = await dispatch(deleteBookingServiceAction(id))
        const isFulfilled = fullfilled(response.meta.requestStatus)

        if (isFulfilled) {
            dispatch(deleteBookingServiceFromState(id))
            closeModalWindow(i)
        }
    }

    const openModalWindow = (i: number) => {
        dispatch(openModalBookingServices({ i }))
    }

    const closeModalWindow = (i: number) => {
        dispatch(closeModalBookingServices({ i }))
    }

    return (
        <>
            <p className={`title lg `}>Послуги для запису</p>
            <CommonTable titles={titles}>
                {!bookingServices.length ? (
                    <CommonTable404
                        error={error}
                        status={status}
                        notFoundMessage='Немає послуг'
                    />
                ) : (bookingServices.map((service, i) => <TableLine key={service.id}>
                    <span>{service.name}</span>
                    {bookingServicesIsModalOpen[i] && <ModalWindow
                        title="Ви дійсно бажаєте видалити це відділеня?"
                    >
                        <button
                            className={`btn cancel`}
                            onClick={() => { closeModalWindow(i) }}
                        >
                            Скасувати видалення
                        </button>
                        <button
                            onClick={() => { deleteBookingService(service.id, i) }}
                            className={`btn blue lg`}
                        >
                            Підтвердити
                        </button>
                    </ModalWindow>}
                    <button
                        onClick={() => { openModalWindow(i) }}
                        className={`btn gray sm`}
                    >
                        Видалити
                    </button>
                </TableLine>))}
            </CommonTable>
            <SafeLink
                className={`btn blue xl ${styles.addButton} ${isCreatePage ? 'disabled' : ''}`}
                href={'/admin/booking_services/create'}
            >
                Додати послугу
            </SafeLink>
            {children}
        </>
    )
}
