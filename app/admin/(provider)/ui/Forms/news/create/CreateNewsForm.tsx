'use client'

import InputContainer from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainer/InputContainer';
import React from 'react';
import styles from './CreateNewsForm.module.scss';
import { ImageInputContainer } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputContainer';
import { ImageInputPreviewFromIndexedDB } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputPreviewFromIndexedDB/ImageInputPreviewFromIndexedDB';
import { NewsFormDataEnum } from '@/app/types/data/news.type';
import { RootState } from '@/app/utils/redux/store';
import { setNewsFormError } from '@/app/utils/redux/news/newsFormSlice';
import { TextareaContainer } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/TextareaContainer/TextareaContainer';
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks';
import { useNewsFormHandleChange } from '@/app/utils/hooks/admin/newsForm/useNewsFormHandleChange';


import CommonTable from '@/app/admin/(provider)/ui/Tables/Common/CommonTable'
import TableLine from '@/app/admin/(provider)/ui/Tables/ListOption/TableLine'
import SafeLink from '@/app/admin/(provider)/ui/Links/SafeLink/SafeLink'
import SubmitButton from '@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton'


const titles = ['Стан вмісту', 'Опції']
const indexedDBStoreName = 'news_images'

export default function CreateNewsForm() {
    const {
        title,
        description,
        backgroundImg,
        details,
        errors,
    } = useAppSelector((state: RootState) => state.newsForm)
    const { error } = useAppSelector((state: RootState) => state.news)
    const handleChange = useNewsFormHandleChange(indexedDBStoreName)

    console.log(useAppSelector((state: RootState) => state.newsForm))

    const dispatch = useAppDispatch()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // FORM VALIDATION
        if (!title.length) {
            dispatch(setNewsFormError({
                field: NewsFormDataEnum.TITLE,
                message: 'Введіть повну назву'
            }));

            // SCROLL TO INPUT
            (document.querySelector(`#${NewsFormDataEnum.TITLE}`) as HTMLInputElement).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
            return
        }
        if (!description.length) {
            dispatch(setNewsFormError({
                field: NewsFormDataEnum.DESCRIPTION,
                message: 'Введіть опис'
            }));

            // SCROLL TO INPUT
            (document.querySelector(`#${NewsFormDataEnum.DESCRIPTION}`) as HTMLInputElement).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
            return
        }
        if (!backgroundImg) {
            dispatch(setNewsFormError({
                field: NewsFormDataEnum.BACKGROUNDIMG,
                message: 'Добавте зображення'
            }));

            // SCROLL TO INPUT
            (document.querySelector(`#${NewsFormDataEnum.BACKGROUNDIMG}`) as HTMLInputElement).labels?.[0].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
            return
        }
        if (!details) {
            dispatch(setNewsFormError({
                field: NewsFormDataEnum.DETAILS,
                message: 'Створіть вміст новини'
            }));

            // SCROLL TO INPUT
            (document.querySelector(`#${NewsFormDataEnum.DETAILS}`) as HTMLInputElement).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
            return
        }


        console.log('kurwa')
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputContainer
                label="Повна назва новини"
                inputId={NewsFormDataEnum.TITLE}
                value={title}
                error={errors[NewsFormDataEnum.TITLE]}
                className={{
                    inputContainer: styles.titleInputContainer
                }}
                changeEvent={(e) => handleChange({
                    e,
                    elementType: NewsFormDataEnum.TITLE,
                })}
            />
            <TextareaContainer
                label="Короткий опис новини"
                inputId={NewsFormDataEnum.DESCRIPTION}
                value={description}
                error={errors[NewsFormDataEnum.DESCRIPTION]}
                className={{
                    inputContainer: styles.descriptionInputContainer
                }}
                minRows={4}
                changeEvent={(e) => handleChange({
                    e,
                    elementType: NewsFormDataEnum.DESCRIPTION,
                })}
            />

            <div className={styles.imageSection}>
                <p className={`title sm left`}>
                    Обготка новини
                </p>
                <p className={`inputLabel ${styles.paragraph}`}>
                    Завантажте фото
                </p>

                <ImageInputContainer
                    inputId={NewsFormDataEnum.BACKGROUNDIMG}
                    changeEvent={(e) => handleChange({
                        e,
                        elementType: NewsFormDataEnum.BACKGROUNDIMG,
                        oldValue: backgroundImg
                    })}
                >
                    <ImageInputPreviewFromIndexedDB
                        imageName={backgroundImg}
                        indexedDBStoreName={indexedDBStoreName}
                        error={errors[NewsFormDataEnum.BACKGROUNDIMG]}
                        className={{}}
                    />
                </ImageInputContainer>
            </div>

            <div className={styles.detailsSection}>
                <p className={`title sm left ${styles.title}`}>
                    Вміст новини
                </p>

                <CommonTable
                    titles={titles}
                    tableId={NewsFormDataEnum.DETAILS}
                >
                    <TableLine>
                        <span>
                            Не створений
                        </span>

                        <SafeLink
                            className={`btn blue sm`}
                            href={`/admin/news/create/details`}
                        >
                            Створити вміст
                        </SafeLink>
                    </TableLine>
                </CommonTable>
            </div>

            <div className={styles.preview}>
                <p className={`title sm left ${styles.title}`}>
                    Попередній перегляд
                </p>

                <SafeLink
                    className={`btn blue sm`}
                    href={`/admin/news/create/preview`}
                >
                    Дивитись сторінку новини
                </SafeLink>
            </div>

            <SubmitButton
                error={error.create}
            />
        </form >
    )
}