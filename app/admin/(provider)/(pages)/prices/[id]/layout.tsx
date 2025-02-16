'use client'

import SafeLink from '@/app/admin/(provider)/ui/Links/SafeLink/SafeLink'
import { checkCreatePage, getUrlLastElement, getUrlOrderElement } from '@/app/services/navigation'
import { fetchOneDepartment } from '@/app/utils/redux/departments/departmentsSlice'
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks'
import { RootState } from '@/app/utils/redux/store'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import styles from './layout.module.scss'
import CommonTable from '@/app/admin/(provider)/ui/Tables/Common/CommonTable'
import {
    closePriceSectionsModal,
    deletePriceSectionFromState,
    fetchPriceSections,
    openPriceSectionsModal,
    deletePriceSection as deletePriceSectionAction
} from '@/app/utils/redux/prices/pricesSlice'
import TableLine from '@/app/admin/(provider)/ui/Tables/ListOption/TableLine'
import ModalWindow from '@/app/admin/(provider)/ui/Forms/ModalWindow/ModalWindow'
import { fullfilled } from '@/app/services/response'

const titles = ['Послуга', 'Опції']

export default function page({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { departments, error } = useAppSelector((state: RootState) => state.departments)
    const { priceSections, priceSectionsIsModalOpen } = useAppSelector((state: RootState) => state.prices)

    const dispatch = useAppDispatch()
    const pathname = usePathname()

    const isCreatePage = checkCreatePage(pathname)
    const departmentId = getUrlOrderElement(pathname, 3)
    const department = departments.find((department) => {
        return `${department.id}` === departmentId
    })

    useEffect(() => {
        // fetch department if there are no departments in state after reloading
        if (!departments.length) {
            dispatch(fetchOneDepartment(departmentId))
        }
        // fetch price sections
        dispatch(fetchPriceSections(departmentId))
    }, [])

    if (!department) {
        return (
            <div>Такого відділення не існує</div>
        )
    }

    const deletePriceSection = async (id: number, i: number) => {
        const response = await dispatch(deletePriceSectionAction(id))
        const isFulfilled = fullfilled(response.meta.requestStatus)

        if (isFulfilled) {
            dispatch(deletePriceSectionFromState(id))
            closeModalWindow(i)
        }
    }

    const openModalWindow = (i: number) => {
        dispatch(openPriceSectionsModal({ i }))
    }

    const closeModalWindow = (i: number) => {
        dispatch(closePriceSectionsModal({ i }))
    }

    return (
        <>
            <div className={styles.titleWrap}>
                <p className={`title lg ${styles.title}`}>{department?.city}, {department?.address}</p>
                <SafeLink
                    className={`btn blue md ${styles.backBtn}`}
                    href='/admin/prices'
                >
                    Назад
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.9661 1.04542C10.6583 1.15868 10.4928 1.37617 10.4703 1.69703C10.4429 2.08731 10.3634 1.98931 12.5011 4.19885L14.4625 6.22623L8.07752 6.22623C0.98218 6.22623 1.46891 6.20948 1.23013 6.46217C0.909245 6.80171 0.92552 7.26417 1.26902 7.56736C1.34753 7.63666 1.47895 7.71084 1.56105 7.73215C1.66731 7.75974 3.54819 7.77091 8.08668 7.77091L14.4631 7.77091L12.516 9.78072C10.4631 11.8998 10.432 11.9367 10.4303 12.2494C10.4292 12.4563 10.5837 12.7494 10.7603 12.8756C10.9419 13.0053 11.2144 13.0374 11.4263 12.9538C11.5419 12.9083 12.0948 12.3555 14.2484 10.1322C17.0716 7.21748 16.9998 7.29926 16.9998 6.99857C16.9998 6.69788 17.0715 6.7796 14.2484 3.86445C11.7508 1.2856 11.5588 1.09542 11.4022 1.0472C11.1994 0.984681 11.1319 0.984453 10.9661 1.04542Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.3"
                        />
                    </svg>
                </SafeLink>
            </div>
            <CommonTable titles={titles}>
                {!priceSections.length ? (
                    <p className='fetchError'>
                        {error.getAll?.statusCode === 404 || !error.delete ?
                            'Немає послуг з розцінками' :
                            'Виникла помилка'}
                    </p>
                ) : (priceSections.map((priceSection, i) => <TableLine key={priceSection.id}>
                    <span>{priceSection.title}</span>
                    {priceSectionsIsModalOpen[i] && <ModalWindow
                        title="Ви дійсно бажаєте видалити цю послугу з розцінками?"
                    >
                        <button
                            className={`btn cancel`}
                            onClick={() => { closeModalWindow(i) }}
                        >
                            Скасувати видалення
                        </button>
                        <button
                            onClick={() => { deletePriceSection(priceSection.id, i) }}
                            className={`btn blue lg`}
                        >
                            Підтвердити
                        </button>
                    </ModalWindow>}
                    <span className={styles.buttons}>
                        <button
                            onClick={() => { openModalWindow(i) }}
                            className={`btn gray sm`}
                        >
                            Видалити
                        </button>
                        <SafeLink
                            className={`btn blue sm ${(getUrlLastElement(pathname) === `${priceSection.id}`) ? 'disabled' : ''}`}
                            href={`/admin/prices/${departmentId}/update`}
                        >
                            Змінити
                        </SafeLink>
                    </span>
                </TableLine>))}
            </CommonTable>
            <SafeLink
                className={`btn blue xl ${styles.addButton} ${isCreatePage ? 'disabled' : ''}`}
                href={`/admin/prices/${departmentId}/create`}
            >
                Додати відділення
            </SafeLink>
            {children}
        </>
    )
}
