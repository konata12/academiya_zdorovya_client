import InputContainer from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainer/InputContainer';
import React from 'react';
import styles from './UpdateNewsForm.module.scss';
import { ImageInputContainer } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputContainer';
import { ImageInputPreviewFromIndexedDB } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputPreviewFromIndexedDB/ImageInputPreviewFromIndexedDB';
import { CreateNewsFormData, NewsFormDataEnum, NewsFormDataEnumType } from '@/app/types/data/news.type';
import { RootState } from '@/app/utils/redux/store';
import { TextareaContainer } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/TextareaContainer/TextareaContainer';
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks';
import { useNewsFormHandleChange } from '@/app/utils/hooks/admin/newsForm/useNewsFormHandleChange';

import CommonTable from '@/app/admin/(provider)/ui/Tables/Common/CommonTable'
import TableLine from '@/app/admin/(provider)/ui/Tables/ListOption/TableLine'
import SafeLink from '@/app/admin/(provider)/ui/Links/SafeLink/SafeLink'
import SubmitButton from '@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton'
import { ErrorWrapper } from '@/app/common_ui/error_components/ErrorWrapper/ErrorWrapper';
import { FormInputError } from '@/app/types/data/form.type';
import { setNewsUpdateError, updateNews } from '@/app/utils/redux/news/newsSlice';
import { fullfilled } from '@/app/services/response.service';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useDetailsFormSlice } from '@/app/utils/hooks/admin/detailsForm/useDetailsFormSlice';
import _ from 'lodash';
import { getIndexedDBStoreForImages } from '@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages';
import { clear } from 'idb-keyval';


const titles = ['Стан вмісту', 'Опції']
const indexedDBStoreName = 'news_update_images'
const detailsOrderSliceName = 'newsUpdateDetailsOrder'

export default function UpdateNewsForm() {
    const {
        title,
        description,
        backgroundImg,
        details,
        errors,
    } = useAppSelector((state: RootState) => state.newsUpdateForm)
    const {
        news,
        error
    } = useAppSelector((state: RootState) => state.news)

    const router = useRouter()
    const pathname = usePathname()
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const handleChange = useNewsFormHandleChange(indexedDBStoreName, detailsOrderSliceName)
    const {
        setFormError,
        resetDetailsComponentsOrder,
        resetFromData,
    } = useDetailsFormSlice(detailsOrderSliceName)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const errorsData: {
            error: FormInputError,
            id: NewsFormDataEnumType
        }[] = []

        // FORM VALIDATION
        if (!title.length) {
            dispatch(setFormError({
                field: NewsFormDataEnum.TITLE,
                message: 'Введіть повну назву'
            }));

            errorsData.push({
                id: NewsFormDataEnum.TITLE,
                error: { message: 'Введіть повну назву' }
            });
        }
        if (!description.length) {
            dispatch(setFormError({
                field: NewsFormDataEnum.DESCRIPTION,
                message: 'Введіть опис'
            }));

            errorsData.push({
                id: NewsFormDataEnum.DESCRIPTION,
                error: { message: 'Введіть опис' }
            });
        }
        if (!backgroundImg) {
            dispatch(setFormError({
                field: NewsFormDataEnum.BACKGROUNDIMG,
                message: 'Добавте зображення'
            }));

            // SCROLL TO INPUT
            errorsData.push({
                id: NewsFormDataEnum.BACKGROUNDIMG,
                error: { message: 'Добавте зображення' }
            });
        }
        if (!details) {
            dispatch(setFormError({
                field: NewsFormDataEnum.DETAILS,
                message: 'Створіть вміст новини'
            }));

            errorsData.push({
                id: NewsFormDataEnum.DETAILS,
                error: { message: 'Створіть вміст новини' }
            });
        }

        // FORM VALIDATION
        if (errorsData.length) {
            console.log(errorsData)
            // SCROLL TO INPUT
            if (errorsData[0].id === NewsFormDataEnum.BACKGROUNDIMG) {
                (document.querySelector(`#${errorsData[0].id}`) as HTMLInputElement).labels?.[0].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })
            } else {
                (document.querySelector(`#${errorsData[0].id}`) as HTMLInputElement).scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })
            }
            return
        }
        if (!details || !backgroundImg) return

        const data: CreateNewsFormData = {
            title,
            description,
            backgroundImg,
            details,
        }

        // CHECK IF DATA CHANGED
        const oldNews = news.find(news => `${news.id}` === id)
        let oldData: CreateNewsFormData | undefined = undefined
        if (oldNews) {
            const { id, createdAt, ...oldNewsData } = oldNews
            oldData = oldNewsData
        }

        const dataIsEuqal = _.isEqual(data, oldData)

        // IF DATA HASN'T CHANGED SET ERROR AND RETURN
        if (dataIsEuqal) {
            dispatch(setNewsUpdateError())
            return
        }

        const response = await dispatch(updateNews({
            data,
            id
        }))
        const isFulfilled = fullfilled(response.meta.requestStatus)
        if (isFulfilled) {
            // CLEAR DATA
            clear(getIndexedDBStoreForImages('news_update_images'))
            dispatch(resetDetailsComponentsOrder())
            dispatch(resetFromData())
            router.push('../')
        }
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
                    Обгортка новини
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

                <ErrorWrapper
                    error={errors.details.message.length ? errors.details.message : undefined}
                    className={{
                        errorWrapper: styles.detailsErrorWrap
                    }}
                >
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
                                href={`${pathname}/details`}
                            >
                                Створити вміст
                            </SafeLink>
                        </TableLine>
                    </CommonTable>
                </ErrorWrapper>
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
                error={error.update}
                label='Оновити дані'
            />
        </form >
    )
}