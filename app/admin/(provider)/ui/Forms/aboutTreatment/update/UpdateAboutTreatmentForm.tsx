'use client'

import { fullfilled } from '@/app/services/response.service'
import { AboutTreatmentEnum, AboutTreatmentFormData } from '@/app/types/data/about_treatment.type'
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks'
import { RootState } from '@/app/utils/redux/store'
import { useParams, useRouter } from 'next/navigation'
import React, { use, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form'
import styles from './UpdateAboutTreatmentForm.module.scss'
import { updateAboutTreatment as updateAboutTreatmentAction, updateAboutTreatmentInState } from '@/app/utils/redux/about_treatment/aboutTreatmentSlice'
import ModalWindow from '@/app/admin/(provider)/ui/Modals/ModalWindow/ModalWindow'
import { addTreatmentTypeModal, closeTreatmentTypeModal, deleteTreatmentTypeModal, openTreatmentTypeModal } from '@/app/utils/redux/about_treatment/aboutTreatmentsFormUISlice'
import { isEqual } from 'lodash'
import { setFormDefaultValues } from '@/app/utils/redux/navigation/navigationSlice'
import HookFormInputContainer from '@/app/common_ui/form_components/InputContainers/HookForm/children/InputContainer/InputContainerHookForm'
import SubmitButton from '@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton'

const formDefaultValues: AboutTreatmentFormData = {
    title: '',
    treatmentTypes: [{ value: '' }],
    image: null
}

export default function UpdateAboutTreatmentForm() {
    const [imageContainerHeight, setImageContainerHeight] = useState<number>(0)
    const [imageHeight, setImageHeight] = useState<number>(0)

    const { error } = useAppSelector((state: RootState) => state.aboutTreatment)
    const { treatmentTypesModalIsOpen } = useAppSelector((state: RootState) => state.aboutTreatmentsFormUI)

    const imageRef = useRef<HTMLImageElement | null>(null)
    const imageContainerRef = useRef<HTMLDivElement | null>(null)
    const formDefaultValuesRef = useRef(true)

    const router = useRouter()
    const dispatch = useAppDispatch()

    const { id } = useParams() // get id from url

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<AboutTreatmentFormData>({
        defaultValues: formDefaultValues
    })

    const formValues = useWatch({ control })
    const image = formValues.image?.[0] // Watch the image input

    const {
        fields: treatmentTypesFields,
        append: appendTreatmentTypes,
        remove: removeTreatmentTypes
    } = useFieldArray({
        control,
        name: "treatmentTypes", // Name of the array in the form state
    });

    // CHECK IF FORM DATA IS DEFAULT
    useEffect(() => {
        const equal = isEqual(formValues, formDefaultValues)
        formDefaultValuesRef.current = equal
        dispatch(setFormDefaultValues(equal))

        // after leaving page set formDefaultValues in redix to initial
        return () => {
            dispatch(setFormDefaultValues(true))
        }
    }, [formValues])

    // CREATE QUIT PAGE LISTENERS
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (!formDefaultValuesRef.current) {
                e.preventDefault()
                e.returnValue = ''
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [])

    // SET IMAGE HEIGHT
    useEffect(() => {
        if (imageContainerRef.current) {
            setImageContainerHeight(imageContainerRef.current.offsetHeight)
        }
    }, [imageContainerRef.current])
    useEffect(() => {
        if (imageRef.current && image) {
            const img = imageRef.current;
            img.onload = () => {
                setImageHeight(img.offsetHeight);
            };
        }
    }, [image, imageContainerRef.current]);

    const imageMarginTop = imageContainerRef.current && (imageHeight > imageContainerHeight)
        ? (imageHeight - imageContainerHeight + 'px')
        : '64px'

    // CREATE ABOUT TREATMENT FUNCTION
    const updateAboutTreatment: SubmitHandler<AboutTreatmentFormData> = async (data) => {
        if (id) {
            const aboutTreatmentId = id.toString()
            const response = await dispatch(updateAboutTreatmentAction({ data, aboutTreatmentId }))
            const isFulfilled = fullfilled(response.meta.requestStatus)

            if (isFulfilled) {
                data.image = null
                dispatch(updateAboutTreatmentInState({ data, aboutTreatmentId }))
                router.push('/admin/about_treatment')
            }
        }
    }

    // TREATMENT TYPES FUNCTIONS
    const addTreatmentType = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        appendTreatmentTypes({ value: '' }); // Append a new title object
        dispatch(addTreatmentTypeModal())
    }
    const deleteTreatmentType = (i: number) => {
        dispatch(deleteTreatmentTypeModal({ index: i }))
        removeTreatmentTypes(i)
    }
    const openTreatmentTypeModalWindow = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
        e.preventDefault()
        dispatch(openTreatmentTypeModal({ index: i }))
    }
    const closeTreatmentTypeModalWindow = (i: number) => {
        dispatch(closeTreatmentTypeModal({ index: i }))
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(updateAboutTreatment)}
        >
            <HookFormInputContainer<AboutTreatmentFormData>
                label='Повна назва послуги'
                name={AboutTreatmentEnum.TITLE}
                errors={errors}
                register={register}
                registerOptions={{
                    required: "Назва обов'язкова",
                }}
            />

            <div className={styles.treatmentTypes}>
                <p className={`title left sm ${styles.title}`}>Що включає послуга</p>

                {treatmentTypesFields.map((treatmentType, i) => {
                    return <div
                        className={styles.treatmentType}
                        key={treatmentType.id}
                    >
                        <div className={styles.top}>
                            <p className='inputLabel'>
                                Рядок {i + 1}
                            </p>

                            {!!i && <button
                                onClick={(e) => { openTreatmentTypeModalWindow(e, i) }}
                                className={`btn blue sm`}
                            >
                                Видалити
                            </button>}
                        </div>
                        <input
                            className={`input ${styles.treatmentTypeInput} ${errors[AboutTreatmentEnum.TREATMENTTYPES]?.[i] && 'wrong'}`}
                            {...register(`treatmentTypes.${i}.value`, {
                                required: "Рядок типу послуги не має бути пустим",
                            })}
                            placeholder="Введіть тип послуги"
                        />
                        {errors[AboutTreatmentEnum.TREATMENTTYPES]?.[i]?.value && (
                            <p className={`error`}>
                                {errors[AboutTreatmentEnum.TREATMENTTYPES][i]?.value?.message}
                            </p>
                        )}
                        {treatmentTypesModalIsOpen[i] && <ModalWindow
                            title="Ви дійсно бажаєте видалити цей рядок?"
                        >
                            <button
                                className={`btn cancel`}
                                onClick={() => { closeTreatmentTypeModalWindow(i) }}
                            >
                                Скасувати видалення
                            </button>
                            <button
                                onClick={() => { deleteTreatmentType(i) }}
                                className={`btn blue lg`}
                            >
                                Підтвердити
                            </button>
                        </ModalWindow>}
                    </div>
                })}

                <button
                    className={`btn blue xl ${styles.addType}`}
                    type='button'
                    onClick={addTreatmentType} // Append a new field with an empty string
                >
                    Додати рядок
                </button>
            </div>

            <div className={styles.addPhoto}>
                <p className='title left sm'>
                    Фото для детального варіанту
                </p>

                <div className={styles.imageInputZone}>
                    <p className='inputLabel'>
                        {'Завантажте фото (без фону, в форматі:  .png)'}
                    </p>

                    <input
                        id='upload_image'
                        type="file"
                        hidden
                        {...register(AboutTreatmentEnum.IMG, {
                            required: "Завантажте фото",
                        })}
                    />
                    <label
                        className='btn blue sm'
                        htmlFor="upload_image"
                    >
                        Завантажити
                    </label>

                    <div className={styles.imagePreview}>
                        {errors[AboutTreatmentEnum.IMG] && <p className={`error ${styles.errorMessage}`}>
                            {errors[AboutTreatmentEnum.IMG].message}
                        </p>}

                        <div
                            className={`${styles.imageContainer} ${errors[AboutTreatmentEnum.IMG] && styles.error}`}
                            ref={imageContainerRef}
                            style={{
                                marginTop: imageMarginTop
                            }}
                        >
                            {image && <img
                                className={styles.image}
                                src={URL.createObjectURL(image)}
                                ref={imageRef}
                                alt="Preview"
                            />}
                        </div>
                        <p className={styles.caption}>
                            Попередній перегляд
                        </p>
                    </div>
                </div>
            </div>

            <SubmitButton
                error={error.update}
                label='Підтвердити зміни'
            />
        </form>
    )
}
