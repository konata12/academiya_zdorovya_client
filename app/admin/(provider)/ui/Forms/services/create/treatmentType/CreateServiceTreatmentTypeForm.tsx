import { FormInputError } from '@/app/types/data/form.type'
import { CreateServiceTreatmentTypesFormData, ServiceTreatmentTypesEnum, ServiceTreatmentTypesEnumType, ServiceTreatmentTypeServiceFormData } from '@/app/types/data/services.type'
import { useDetailsFormSlice } from '@/app/utils/hooks/admin/detailsForm/useDetailsFormSlice'
import { useServiceTreatmentTypeFormHandleChange } from '@/app/utils/hooks/admin/serviceForm/useServiceTreatmentTypeFormHandleChange'
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks'
import { RootState } from '@/app/utils/redux/store'
import React, { useEffect } from 'react'
import InputContainer from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainer/InputContainer';
import { TextareaContainer } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/TextareaContainer/TextareaContainer'
import { ImageInputContainer } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputContainer'
import { ImageInputPreviewFromIndexedDB } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputPreviewFromIndexedDB/ImageInputPreviewFromIndexedDB'
import { ErrorWrapper } from '@/app/common_ui/error_components/ErrorWrapper/ErrorWrapper'
import CommonTable from '@/app/admin/(provider)/ui/Tables/Common/CommonTable'
import TableLine from '@/app/admin/(provider)/ui/Tables/ListOption/TableLine'
import SafeLink from '@/app/admin/(provider)/ui/Links/SafeLink/SafeLink'
import SubmitButton from '@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton'
import styles from './CreateServiceTreatmentTypeForm.module.scss'
import { useParams, useRouter } from 'next/navigation'
import { setServiceCreateTreatmentTypesValue } from '@/app/utils/redux/services/serviceCreateFormSlice'
import { parseDetailsResponseToOrderComponent } from '@/app/services/details.service'
import { setServiceTreatmentTypeCreateDetailsInitialDataOnLink } from '@/app/utils/redux/details/services/serviceTreatmentTypeCreateDetailsOrderSlice'


const titles = ['Стан вмісту', 'Опції']
const indexedDBStoreName = 'service_create_images'
const detailsOrderSliceName = 'serviceTreatmentTypeCreateDetailsOrder'

export default function CreateServiceTreatmentTypeForm() {
    const {
        orderId,
        title,
        description,
        backgroundImg,
        details,
        errors,
    } = useAppSelector((state: RootState) => state.serviceTreatmentTypeCreateForm)

    const router = useRouter()
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const handleChange = useServiceTreatmentTypeFormHandleChange(indexedDBStoreName, detailsOrderSliceName)
    const {
        setFormError,
    } = useDetailsFormSlice(detailsOrderSliceName)

    // WHEN OPENING PAGE SET DETAILS SLICE DATA
    useEffect(() => {
        const parsedDetails = details 
            ? parseDetailsResponseToOrderComponent(details)
            : []
        dispatch(setServiceTreatmentTypeCreateDetailsInitialDataOnLink(parsedDetails))
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
            id: ServiceTreatmentTypesEnumType
        }[] = []

        // FORM VALIDATION
        if (!title.length) {
            dispatch(setFormError({
                field: ServiceTreatmentTypesEnum.TITLE,
                message: 'Введіть повну назву'
            }));

            errorsData.push({
                id: ServiceTreatmentTypesEnum.TITLE,
                error: { message: 'Введіть повну назву' }
            });
        }
        if (!description.length) {
            dispatch(setFormError({
                field: ServiceTreatmentTypesEnum.DESCRIPTION,
                message: 'Введіть опис'
            }));

            errorsData.push({
                id: ServiceTreatmentTypesEnum.DESCRIPTION,
                error: { message: 'Введіть опис' }
            });
        }
        if (!backgroundImg) {
            dispatch(setFormError({
                field: ServiceTreatmentTypesEnum.BACKGROUNDIMG,
                message: 'Добавте зображення'
            }));

            // SCROLL TO INPUT
            errorsData.push({
                id: ServiceTreatmentTypesEnum.BACKGROUNDIMG,
                error: { message: 'Добавте зображення' }
            });
        }
        if (!details) {
            dispatch(setFormError({
                field: ServiceTreatmentTypesEnum.DETAILS,
                message: 'Створіть вміст послуги'
            }));

            errorsData.push({
                id: ServiceTreatmentTypesEnum.DETAILS,
                error: { message: 'Створіть вміст послуги' }
            });
        }

        // SCROLL TO ERROR INPUT
        if (errorsData.length) {
            console.log(errorsData)
            // SCROLL TO INPUT
            if (errorsData[0].id === ServiceTreatmentTypesEnum.BACKGROUNDIMG) {
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

        const data: ServiceTreatmentTypeServiceFormData = {
            orderId,
            title,
            description,
            backgroundImg,
            details,
        }

        dispatch(setServiceCreateTreatmentTypesValue({
            index: Number(id),
            value: data
        }))
        router.push('../')
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputContainer
                label="Повна назва послуги"
                inputId={ServiceTreatmentTypesEnum.TITLE}
                value={title}
                error={errors[ServiceTreatmentTypesEnum.TITLE]}
                className={{
                    inputContainer: styles.titleInputContainer
                }}
                changeEvent={(e) => handleChange({
                    e,
                    elementType: ServiceTreatmentTypesEnum.TITLE,
                })}
            />
            <TextareaContainer
                label="Короткий опис послуги"
                inputId={ServiceTreatmentTypesEnum.DESCRIPTION}
                value={description}
                error={errors[ServiceTreatmentTypesEnum.DESCRIPTION]}
                className={{
                    inputContainer: styles.descriptionInputContainer
                }}
                minRows={4}
                changeEvent={(e) => handleChange({
                    e,
                    elementType: ServiceTreatmentTypesEnum.DESCRIPTION,
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
                    inputId={ServiceTreatmentTypesEnum.BACKGROUNDIMG}
                    changeEvent={(e) => handleChange({
                        e,
                        elementType: ServiceTreatmentTypesEnum.BACKGROUNDIMG,
                        oldValue: backgroundImg
                    })}
                >
                    <ImageInputPreviewFromIndexedDB
                        imageName={backgroundImg}
                        indexedDBStoreName={indexedDBStoreName}
                        error={errors[ServiceTreatmentTypesEnum.BACKGROUNDIMG]}
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
                        tableId={ServiceTreatmentTypesEnum.DETAILS}
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
                    href={`/admin/news/create/preview`}
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
