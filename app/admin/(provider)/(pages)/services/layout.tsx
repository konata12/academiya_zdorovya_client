'use client'

import React, { useEffect } from 'react';
import styles from './layout.module.scss';
import { clear } from 'idb-keyval';
import {
    closeNewsModal,
    deleteNews as deleteNewsAction,
    fetchNews,
    openNewsModal,
    resetNewsUpdateError,
    toggleIsBannerNews as toggleIsBannerNewsAction
} from '@/app/utils/redux/news/newsSlice';
import { getIndexedDBStoreForImages } from '@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages';
import { News } from '@/app/types/data/news.type';
import { parseDetailsResponseToOrderComponent } from '@/app/services/details.service';
import { RootState } from '@/app/utils/redux/store';
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
import { checkCreatePage } from '@/app/services/navigation.service';


const titles = ['Назва', 'Дата публікування ', 'Опції']
const storeName = 'news_images'
const updateStoreName = 'news_update_images'

export default function page({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const {
        news,
        newsIsModalOpen,
        error,
        status
    } = useAppSelector((state: RootState) => state.news)
    const { getParsedDateString } = useParsedDate()

    const dispatch = useAppDispatch()
    const router = useRouter()
    const pathname = usePathname()
    const isCreatePage = checkCreatePage(pathname)

    useEffect(() => {
        dispatch(fetchNews())
    }, [])

    const deleteService = async (id: number) => {
        dispatch(deleteNewsAction(id))
    }

    const openModalWindow = (i: number) => {
        dispatch(openNewsModal(i))
    }
    const closeModalWindow = (i: number) => {
        dispatch(closeNewsModal(i))
    }
    // LOAD DATA TO FORM AND ORDER SLICES AND LOAD IMAGES TO UPLOAD STORE
    const linkToUpdatePage = async (news: News) => {
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

    return (
        <>
            {pathname.includes('serviceType') || <>
                <p className={`title lg`}>
                    Послуги
                </p>

                <CommonTable titles={titles}>
                    {!news.length ? (
                        <CommonTable404
                            error={error}
                            status={status}
                            notFoundMessage='Немає послуг'
                        />
                    ) : (news.map((news, i) => <TableLine key={news.id}>
                        <span>{news.title}</span>
                        <span>{getParsedDateString(news.createdAt)}</span>

                        {newsIsModalOpen[i] && <DeleteModalWindow
                            title='Ви дійсно бажаєте видалити цю послугу?'
                            error={error}
                            index={i}
                            id={news.id}
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
                                onClick={() => linkToUpdatePage(news)}
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
