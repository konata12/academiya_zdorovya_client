'use client'

import { NewsFormDataEnum } from '@/app/types/data/news.type'
import React, { useEffect, useState } from 'react'

import styles from './CreateNewsForm.module.scss'
import CommonTable from '@/app/admin/(provider)/ui/Tables/Common/CommonTable'
import TableLine from '@/app/admin/(provider)/ui/Tables/ListOption/TableLine'
import SafeLink from '@/app/admin/(provider)/ui/Links/SafeLink/SafeLink'
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks'
import { RootState } from '@/app/utils/redux/store'
import InputContainer from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainer/InputContainer'
import { setNewsFormError } from '@/app/utils/redux/news/newsFormSlice'
import { TextareaContainer } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/TextareaContainer/TextareaContainer'
import { ImageInputContainer } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputContainer'
import { ImageInputPreviewFromIndexedDB } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputPreviewFromIndexedDB/ImageInputPreviewFromIndexedDB'
import SubmitButton from '@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton'
import { useNewsFormHandleChange } from '@/app/utils/hooks/admin/newsForm/useNewsFormHandleChange';


const titles = ['Стан вмісту', 'Опції']
const indexedDBStoreName = 'news_images'

export default function CreateNewsForm() {
    const [triggerUseEffect, setTriggerUseEffect] = useState(false)
    const {
        title,
        description,
        backgroundImg,
        details,
        errors,
    } = useAppSelector((state: RootState) => state.newsForm)
    const { error } = useAppSelector((state: RootState) => state.news)
    const handleChange = useNewsFormHandleChange(indexedDBStoreName)

    const dispatch = useAppDispatch()

    useEffect(() => {
        const invalidInputId = Object.entries(errors).find((error) => {
            return !!error[1].message.length
        })

        if (!invalidInputId) return
        const invalidInput = invalidInputId[0] === NewsFormDataEnum.BACKGROUNDIMG
            ? (document.querySelector(`#${invalidInputId[0]}`) as HTMLInputElement)?.labels?.[0]
            : document.querySelector(`#${invalidInputId[0]}`) as HTMLInputElement

        invalidInput?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })
    }, [triggerUseEffect])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setTriggerUseEffect(!triggerUseEffect)

        // FORM VALIDATION
        if (title.length === 0) {
            dispatch(setNewsFormError({
                field: NewsFormDataEnum.TITLE,
                message: 'Введіть повну назву'
            }))
            return
        }
        if (description.length === 0) {
            dispatch(setNewsFormError({
                field: NewsFormDataEnum.DESCRIPTION,
                message: 'Введіть опис'
            }))
            return
        }
        if (!backgroundImg) {
            dispatch(setNewsFormError({
                field: NewsFormDataEnum.BACKGROUNDIMG,
                message: 'Добавте зображення'
            }))
            return
        }
        if (details.length === 0) {
            dispatch(setNewsFormError({
                field: NewsFormDataEnum.DETAILS,
                message: 'Створіть вміст новини'
            }))
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
