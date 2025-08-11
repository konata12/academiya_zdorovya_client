'use client'

import React, { useEffect } from 'react';
import styles from './layout.module.scss';
import { checkCreatePage } from '@/app/services/navigation.service';
import { clear } from 'idb-keyval';
import {
    closeServiceModal,
    deleteService as deleteServiceAction,
    fetchServices,
    openServiceModal
    } from '@/app/utils/redux/services/servicesSlice';
import { getIndexedDBStoreForImages } from '@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages';
import { News } from '@/app/types/data/news.type';
import { parseDetailsResponseToOrderComponent } from '@/app/services/details.service';
import { RootState } from '@/app/utils/redux/store';
import { Service } from '@/app/types/data/services.type';
import { setAllNewsFormUpdateDataOnLink } from '@/app/utils/redux/news/newsUpdateFormSlice';
import { setInitialDataOnLink } from '@/app/utils/redux/details/news/newsUpdateDetailsOrderSlice';
import { transferNewsImagesBetweenIndexDBStores } from '@/app/services/news.service';
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks';
import { useParsedDate } from '@/app/utils/hooks/common/useParsedDate';
import { useRouter } from 'next/navigation';


import SafeLink from '@/app/admin/(provider)/ui/Links/SafeLink/SafeLink'; import { usePathname } from 'next/navigation'

import CommonTable from '@/app/admin/(provider)/ui/Tables/Common/CommonTable';
import CommonTable404 from '@/app/admin/(provider)/ui/Tables/Common/CommonTable404/CommonTable404';
import TableLine from '@/app/admin/(provider)/ui/Tables/ListOption/TableLine';
import DeleteModalWindow from '@/app/admin/(provider)/ui/Modals/DeleteModalWindow/DeleteModalWindow';


const titles = ['Назва', 'Опції']
const storeName = 'service_images'
const updateStoreName = 'service_update_images'

export default function page({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const {
        services,
        servicesIsModalOpen,
        error,
        status
    } = useAppSelector((state: RootState) => state.services)
    const { getParsedDateString } = useParsedDate()

    const dispatch = useAppDispatch()
    const router = useRouter()
    const pathname = usePathname()
    const isCreatePage = checkCreatePage(pathname)

    useEffect(() => {
        dispatch(fetchServices())
    }, [])

    const deleteService = async (id: number) => {
        dispatch(deleteServiceAction(id))
    }

    const openModalWindow = (i: number) => {
        dispatch(openServiceModal(i))
    }
    const closeModalWindow = (i: number) => {
        dispatch(closeServiceModal(i))
    }
    // LOAD DATA TO FORM AND ORDER SLICES AND LOAD IMAGES TO UPLOAD STORE
    const linkToUpdatePage = async (service: Service) => {
        // const getStore = getIndexedDBStoreForImages(storeName)
        // const setStore = getIndexedDBStoreForImages(updateStoreName)
        // // CLEAR PREVIOUS NEWS UPDATE FORM DATA IMAGES
        // await clear(setStore)
        // // PARSE DETAILS TO REDUX TYPE
        // const parsedDetails = parseDetailsResponseToOrderComponent(news.details)

        // // TRANSFER IMAGES TO ANOTHER STORE
        // await transferNewsImagesBetweenIndexDBStores(news, getStore, setStore)

        // // SET DATA TO UPDATE SLICES
        // dispatch(resetNewsUpdateError())
        // dispatch(setAllNewsFormUpdateDataOnLink(news))
        // dispatch(setInitialDataOnLink(parsedDetails))
        // router.push(`news/update/${news.id}`)
    }

    console.log('services: ', services)

    return (
        <>
            {pathname.includes('serviceType') || <>
                <p className={`title lg`}>
                    Послуги
                </p>

                <CommonTable titles={titles}>
                    {!services.length ? (
                        <CommonTable404
                            error={error}
                            status={status}
                            notFoundMessage='Немає послуг'
                        />
                    ) : (services.map((service, i) => <TableLine key={service.id}>
                        <span>{service.title}</span>

                        {servicesIsModalOpen[i] && <DeleteModalWindow
                            title='Ви дійсно бажаєте видалити цю послугу?'
                            error={error}
                            index={i}
                            id={service.id}
                            closeModalHandler={closeModalWindow}
                            deleteHandler={deleteService}
                        />}

                        <span className={styles.tableLineOptions}>
                            <button
                                onClick={() => { openModalWindow(i) }}
                                className={`btn gray sm`}
                            >
                                Видалити
                            </button>
                            <button
                                className={`btn blue sm`}
                                onClick={() => linkToUpdatePage(service)}
                            >
                                Змінити
                            </button>
                        </span>
                    </TableLine>))}
                </CommonTable>

                <SafeLink
                    className={`btn blue xl ${styles.addButton} ${isCreatePage ? 'disabled' : ''}`}
                    href={'/admin/services/create'}
                >
                    Додати послугу
                </SafeLink>
            </>}

            {children}
        </>
    )
}
