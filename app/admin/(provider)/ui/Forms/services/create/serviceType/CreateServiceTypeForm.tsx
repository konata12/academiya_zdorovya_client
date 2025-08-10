import InputContainer from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainer/InputContainer';
import React, { useEffect } from 'react';
import styles from './CreateServiceTypeForm.module.scss';
import {
    ServiceTypesEnum,
    ServiceTypesEnumType,
    ServiceTypeServiceFormData
    } from '@/app/types/data/services.type';
import { ErrorWrapper } from '@/app/common_ui/error_components/ErrorWrapper/ErrorWrapper';
import { FormInputError } from '@/app/types/data/form.type';
import { ImageInputContainer } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputContainer';
import { ImageInputPreviewFromIndexedDB } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputPreviewFromIndexedDB/ImageInputPreviewFromIndexedDB';
import { parseDetailsResponseToOrderComponent } from '@/app/services/details.service';
import { RootState } from '@/app/utils/redux/store';
import { setServiceCreateTypesValue } from '@/app/utils/redux/services/serviceCreateFormSlice';
import { setServiceTypeCreateDetailsInitialDataOnLink } from '@/app/utils/redux/details/services/serviceTypeCreateDetailsOrderSlice';
import { TextareaContainer } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/TextareaContainer/TextareaContainer';
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks';
import { useDetailsFormSlice } from '@/app/utils/hooks/admin/detailsForm/useDetailsFormSlice';
import { useParams, useRouter } from 'next/navigation';
import { useServiceTypeFormHandleChange } from '@/app/utils/hooks/admin/serviceForm/useServiceTreatmentTypeFormHandleChange';
import CommonTable from '@/app/admin/(provider)/ui/Tables/Common/CommonTable'
import TableLine from '@/app/admin/(provider)/ui/Tables/ListOption/TableLine'
import SafeLink from '@/app/admin/(provider)/ui/Links/SafeLink/SafeLink'
import SubmitButton from '@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton'


const titles = ['Стан вмісту', 'Опції']
const indexedDBStoreName = 'service_create_images'
const detailsOrderSliceName = 'serviceTypeCreateDetailsOrder'

export default function CreateServiceTypeForm() {
    const {
        orderId,
        title,
        description,
        backgroundImg,
        details,
        errors,
    } = useAppSelector((state: RootState) => state.serviceTypeCreateForm)

    const router = useRouter()
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const handleChange = useServiceTypeFormHandleChange(indexedDBStoreName, detailsOrderSliceName)
    const {
        setFormError,
    } = useDetailsFormSlice(detailsOrderSliceName)

    // WHEN OPENING PAGE SET DETAILS SLICE DATA
    useEffect(() => {
        const parsedDetails = details 
            ? parseDetailsResponseToOrderComponent(details)
            : []
        dispatch(setServiceTypeCreateDetailsInitialDataOnLink(parsedDetails))
    }, [])

    console.log({
        title,
        description,
        backgroundImg,
        details,
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const errorsData: {
            error: FormInputError,
            id: ServiceTypesEnumType
        }[] = []

        // FORM VALIDATION
        if (!title.length) {
            dispatch(setFormError({
                field: ServiceTypesEnum.TITLE,
                message: 'Введіть повну назву'
            }));

            errorsData.push({
                id: ServiceTypesEnum.TITLE,
                error: { message: 'Введіть повну назву' }
            });
        }
        if (!description.length) {
            dispatch(setFormError({
                field: ServiceTypesEnum.DESCRIPTION,
                message: 'Введіть опис'
            }));

            errorsData.push({
                id: ServiceTypesEnum.DESCRIPTION,
                error: { message: 'Введіть опис' }
            });
        }
        if (!backgroundImg) {
            dispatch(setFormError({
                field: ServiceTypesEnum.BACKGROUNDIMG,
                message: 'Добавте зображення'
            }));

            // SCROLL TO INPUT
            errorsData.push({
                id: ServiceTypesEnum.BACKGROUNDIMG,
                error: { message: 'Добавте зображення' }
            });
        }
        if (!details) {
            dispatch(setFormError({
                field: ServiceTypesEnum.DETAILS,
                message: 'Створіть вміст послуги'
            }));

            errorsData.push({
                id: ServiceTypesEnum.DETAILS,
                error: { message: 'Створіть вміст послуги' }
            });
        }

        // SCROLL TO ERROR INPUT
        if (errorsData.length) {
            console.log(errorsData)
            // SCROLL TO INPUT
            if (errorsData[0].id === ServiceTypesEnum.BACKGROUNDIMG) {
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

        const data: ServiceTypeServiceFormData = {
            orderId,
            title,
            description,
            backgroundImg,
            details,
        }

        dispatch(setServiceCreateTypesValue({
            index: Number(id),
            value: data
        }))
        router.push('../')
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputContainer
                label="Повна назва послуги"
                inputId={ServiceTypesEnum.TITLE}
                value={title}
                error={errors[ServiceTypesEnum.TITLE]}
                className={{
                    inputContainer: styles.titleInputContainer
                }}
                changeEvent={(e) => handleChange({
                    e,
                    elementType: ServiceTypesEnum.TITLE,
                })}
            />
            <TextareaContainer
                label="Короткий опис послуги"
                inputId={ServiceTypesEnum.DESCRIPTION}
                value={description}
                error={errors[ServiceTypesEnum.DESCRIPTION]}
                className={{
                    inputContainer: styles.descriptionInputContainer
                }}
                minRows={4}
                changeEvent={(e) => handleChange({
                    e,
                    elementType: ServiceTypesEnum.DESCRIPTION,
                })}
            />

            <div className={styles.imageSection}>
                <p className={`title sm left`}>
                    Обгортка послуги
                </p>
                <p className={`inputLabel ${styles.paragraph}`}>
                    Завантажте фото
                </p>

                <ImageInputContainer
                    inputId={ServiceTypesEnum.BACKGROUNDIMG}
                    changeEvent={(e) => handleChange({
                        e,
                        elementType: ServiceTypesEnum.BACKGROUNDIMG,
                        oldValue: backgroundImg
                    })}
                >
                    <ImageInputPreviewFromIndexedDB
                        imageName={backgroundImg}
                        indexedDBStoreName={indexedDBStoreName}
                        error={errors[ServiceTypesEnum.BACKGROUNDIMG]}
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
                        tableId={ServiceTypesEnum.DETAILS}
                    >
                        <TableLine>
                            <span>
                                Не створений
                            </span>

                            <SafeLink
                                className={`btn blue sm`}
                                href={`${id}/details`}
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
                    href={`/admin/services/create/preview`}
                >
                    Дивитись сторінку новини
                </SafeLink>
            </div>

            <SubmitButton
                error={null}
            />
        </form >
    )
}
