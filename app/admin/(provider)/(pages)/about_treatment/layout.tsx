'use client'

import React, { useEffect } from 'react';
import styles from './layout.module.scss';
import TableLine from './../../ui/Tables/ListOption/TableLine';
import { AboutTreatment } from '@/app/types/data/about_treatment.type';
import { checkCreatePage, getUrlLastElement } from '@/app/services/navigation.service';
import { clear } from 'idb-keyval';
import {
    closeAboutTreatmentsModal,
    deleteAboutTreatment as deleteAboutTreatmentAction,
    fetchAboutTreatments,
    openAboutTreatmentsModal,
    resetAboutTreatmentUpdateError
    } from '@/app/utils/redux/about_treatment/aboutTreatmentSlice';
import { getIndexedDBStoreForImages } from '@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages';
import { RootState } from '@/app/utils/redux/store';
import { setAllAboutTreatmentDataOnLink } from '@/app/utils/redux/about_treatment/aboutTreatmentUpdateFormSlice';
import { transferImageBetweenIndexDBStores } from '@/app/services/indexedDB.service';
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks';
import { usePathname, useRouter } from 'next/navigation';

import SafeLink from '@/app/admin/(provider)/ui/Links/SafeLink/SafeLink'
import CommonTable from '@/app/admin/(provider)/ui/Tables/Common/CommonTable'
import CommonTable404 from '@/app/admin/(provider)/ui/Tables/Common/CommonTable404/CommonTable404'
import DeleteModalWindow from '@/app/admin/(provider)/ui/Modals/DeleteModalWindow/DeleteModalWindow'

const titles = ['Послуга', 'Опції']

const storeName = 'about_treatment_images'
const updateStoreName = 'about_treatment_update_images'

export default function WhatWeTreat({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const {
        aboutTreatments,
        aboutTreatmentsIsModalOpen,
        error,
        status
    } = useAppSelector((state: RootState) => state.aboutTreatment)

    const dispatch = useAppDispatch()
    const router = useRouter()
    const pathname = usePathname()
    const isCreatePage = checkCreatePage(pathname)

    useEffect(() => {
        dispatch(fetchAboutTreatments())
    }, [])

    const deleteAboutTreatment = async (id: number) => {
        dispatch(deleteAboutTreatmentAction(id))
    }
    const openModalWindow = (i: number) => {
        dispatch(openAboutTreatmentsModal({ i }))
    }
    const closeModalWindow = (i: number) => {
        dispatch(closeAboutTreatmentsModal({ i }))
    }

    return (
        <>
            <p className={`title lg`}>Що лікуємо</p>
            <CommonTable titles={titles}>
                {!aboutTreatments.length ? (
                    <CommonTable404
                        error={error}
                        status={status}
                    />
                ) : (aboutTreatments.map((aboutTreatment, i) => <TableLine key={i}>
                    <span>{aboutTreatment.title}</span>
                    {aboutTreatmentsIsModalOpen[i] && <DeleteModalWindow
                        title='Ви дійсно бажаєте видалити цю новину?'
                        error={error}
                        index={i}
                        id={aboutTreatment.id}
                        closeModalHandler={closeModalWindow}
                        deleteHandler={deleteAboutTreatment}
                    />}
                    <span>
                        <button
                            onClick={() => { openModalWindow(i) }}
                            className={`btn gray sm`}
                        >
                            Видалити
                        </button>
                        <SafeLink
                            className={`btn blue sm ${(getUrlLastElement(pathname) === `${aboutTreatment.id}`) ? 'disabled' : ''}`}
                            href={`/admin/about_treatment/update/${aboutTreatment.id}`}
                        >
                            Змінити
                        </SafeLink>
                    </span>
                </TableLine>))}
            </CommonTable>

            <SafeLink
                className={`btn blue xl ${styles.addButton} ${isCreatePage ? 'disabled' : ''}`}
                href={'/admin/about_treatment/create'}
            >
                Додати опис лікування
            </SafeLink>
            {children}
        </>
    )
}
