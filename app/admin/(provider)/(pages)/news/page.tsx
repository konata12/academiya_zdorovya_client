'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.scss'
import SafeLink from '@/app/admin/(provider)/ui/Links/SafeLink/SafeLink';
import CommonTable from '@/app/admin/(provider)/ui/Tables/Common/CommonTable';
import CommonTable404 from '@/app/admin/(provider)/ui/Tables/Common/CommonTable404/CommonTable404';
import TableLine from '@/app/admin/(provider)/ui/Tables/ListOption/TableLine';
import ModalWindow from '@/app/admin/(provider)/ui/Forms/ModalWindow/ModalWindow';
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks';
import { usePathname } from 'next/navigation';
import { checkCreatePage, getUrlLastElement } from '@/app/services/navigation.service';
import { fullfilled } from '@/app/services/response.service';
import { RootState } from "@/app/utils/redux/store"
import { fetchNews } from '@/app/utils/redux/news/newsSlice';


const titles = ['Назва', 'Дата публікування ', 'Опції']

export default function page() {
    const [stringData, setStringData] = useState<string | null>(null)

    const {
        news,
        newsIsModalOpen,
        error,
        status
    } = useAppSelector((state: RootState) => state.news)

    const dispatch = useAppDispatch()
    const pathname = usePathname()
    const isCreatePage = checkCreatePage(pathname)

    useEffect(() => {
        // dispatch(fetchNews())

        

    }, [])

    const deleteNews = async (id: number, i: number) => {
        // const response = await dispatch(deleteNewsAction(id))
        // const isFulfilled = fullfilled(response.meta.requestStatus)

        // if (isFulfilled) {
        //     dispatch(deleteNewsFromState(id))
        //     closeModalWindow(i)
        // }
    }

    const openModalWindow = (i: number) => {
        // dispatch(openNewsModal({ i }))
    }
    const closeModalWindow = (i: number) => {
        // dispatch(closeNewsModal({ i }))
    }

    // const DBOpenRequest = indexedDB.open("news_description_images", 1);

    // console.log(DBOpenRequest)

    return (
        <div>
            <p className={`title lg`}>
                Новини
            </p>

            <div className={styles.mainNews}>

            </div>

            <div className={styles.allNews}>
                <p className={`title xs left ${styles.sectionTitle}`}>
                    Усі новини
                </p>

                <CommonTable titles={titles}>
                    {!news.length ? (
                        <CommonTable404
                            error={error}
                            status={status}
                            notFoundMessage='Немає новин'
                        />
                    ) : (news.map((news, i) => <TableLine key={news.id}>
                        <span>{news.title}</span>
                        <span>{news.createdAt.getTimezoneOffset()}</span>
                        {newsIsModalOpen[i] && <ModalWindow
                            title="Ви дійсно бажаєте видалити це відділеня?"
                        >
                            <button
                                className={`btn cancel`}
                            // onClick={() => { closeModalWindow(i) }}
                            >
                                Скасувати видалення
                            </button>
                            <button
                                // onClick={() => { deleteNew(new.id, i) }}
                                className={`btn blue lg`}
                            >
                                Підтвердити
                            </button>
                        </ModalWindow>}
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 14 14" fill="004BAE">
                                <path d="M12.8327 4.25606C13.3227 4.25606 13.7614 4.57587 13.9294 5.05498C14.0974 5.53409 13.9597 6.07279 13.5852 6.40111L10.8261 8.74438L11.9671 12.3681C12.1234 12.8582 11.9647 13.3981 11.5716 13.7142C11.1772 14.0292 10.6371 14.0511 10.2229 13.7702L7.01108 11.5899L3.85175 13.7945C3.65458 13.9319 3.42825 14 3.20191 14C2.95575 14 2.70841 13.9197 2.50191 13.758C2.10525 13.4491 1.93958 12.9117 2.08891 12.4204L3.18558 8.7541L0.412414 6.40233C0.039081 6.07279 -0.0974182 5.53531 0.0717485 5.0562C0.240915 4.5783 0.678414 4.25971 1.16725 4.25971H4.66608L5.90508 0.791627C6.07542 0.316164 6.51175 0 6.99825 0C7.48475 0 7.92108 0.314948 8.09142 0.791627L9.33041 4.25971H12.8304L12.8327 4.25606Z"
                                    fill="#none" />
                            </svg>

                            <button
                                // onClick={() => { openModalWindow(i) }}
                                className={`btn gray sm`}
                            >
                                Видалити
                            </button>
                            <SafeLink
                                className={`btn blue sm ${(getUrlLastElement(pathname) === `${news.id}`) ? 'disabled' : ''}`}
                                href={`/admin/news/update/${news.id}`}
                            >
                                Змінити
                            </SafeLink>
                        </span>
                    </TableLine>))}
                </CommonTable>

                <SafeLink
                    className={`btn blue xl ${styles.addButton} ${isCreatePage ? 'disabled' : ''}`}
                    href={'/admin/news/create'}
                >
                    Додати новину
                </SafeLink>
            </div>
        </div>
    )
}
