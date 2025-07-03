'use client'

import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks'
import { RootState } from '@/app/utils/redux/store'
import React, { useCallback, useEffect } from 'react'
import styles from './CreateEmployeeForm.module.scss'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { AhivementsFormDataEnum, EmployeesBackgroundImgColorEnum, EmployeesCheckboxesType, EmployeesFormData, EmployeesFormDataEnum, EmployeesFormDataUICheckboxesEnum, EmployeesFormDataUIModalsStatesEnum, EmployeesModalsStatesType, WorkSpecialitysFormDataEnum } from '@/app/types/data/employees.type'
import InputContainer from '@/app/common_ui/form_components/BasicInputContainer/children/InputContainer/InputContainer'
import TextareaContainer from '@/app/common_ui/form_components/BasicInputContainer/children/TextareaContainer/TextareaContainer'
import SubmitButton from '@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton'
import { addModalState, deleteModalState, setEmployeeBackgroundImgColorCheckbox, setEmployeeUIInitialState, setModalState, setModalStateInitValue, triggerEmployeeUICheckbox } from '@/app/utils/redux/employees/employeesFormUISlice'
import InputContainerWithCheckbox from '@/app/common_ui/form_components/BasicInputContainer/children/InputContainerWithCheckbox/InputContainerWithCheckbox'
import InputContainerWithDeleteBtn from '@/app/common_ui/form_components/BasicInputContainer/children/InputContainerWithDeleteBtn/InputContainerWithDeleteBtn'
import FormElementContainerWithCheckbox from '@/app/common_ui/form_components/BasicInputContainer/children/FormElementContainerWithCheckbox/FormElementContainerWithCheckbox'
import ModalWindow from '@/app/admin/(provider)/ui/Forms/ModalWindow/ModalWindow'
import { fullfilled } from '@/app/services/response'
import { useRouter } from 'next/navigation'
import { createEmployee as createEmployeeAction } from '@/app/utils/redux/employees/employeesSlice'
import Checkbox from '@/app/admin/(provider)/ui/Checkbox/Checkbox'

export default function CreateEmployeeFrom() {
    const { error } = useAppSelector((state: RootState) => state.employees)
    const {
        instagramCheckbox,
        facebookCheckbox,
        XCheckbox,
        youtubeCheckbox,
        achivementsCheckbox,
        backgroundImgColor,

        workSpecialitysModalIsOpen,
        achivementsModalIsOpen,
    } = useAppSelector((state: RootState) => state.employeesFormUI)

    const router = useRouter()
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<EmployeesFormData>({
        defaultValues: {
            [EmployeesFormDataEnum.WORKSPECIALITIES]: [{
                value: ''
            }],
            [EmployeesFormDataEnum.ACHIVEMENTS]: [{
                value: ''
            }],
        }
    })
    const image = watch(EmployeesFormDataEnum.IMAGE)?.[0] // Watch the image input

    const {
        fields: workSpecialityFields,
        append: appendWorkSpeciality,
        remove: removeWorkSpeciality
    } = useFieldArray({ // needs array of objects to work properly
        control,
        name: EmployeesFormDataEnum.WORKSPECIALITIES,
    });
    const {
        fields: achivementFields,
        append: appendAchivement,
        remove: removeAchivement
    } = useFieldArray({ // needs array of objects to work properly
        control,
        name: EmployeesFormDataEnum.ACHIVEMENTS,
    });

    // UI Slice state reset 
    useEffect(() => {
        dispatch(setModalStateInitValue({
            length: workSpecialityFields.length,
            modalName: EmployeesFormDataUIModalsStatesEnum.WORKSPECIALITYSMODALISOPEN
        }))
        dispatch(setModalStateInitValue({
            length: achivementFields.length,
            modalName: EmployeesFormDataUIModalsStatesEnum.ACHIVEMENTSISMODALOPEN
        }))

        return () => {
            dispatch(setEmployeeUIInitialState())
        }
    }, [])

    // CREATE ABOUT TREATMENT FUNCTION
    const createEmployee: SubmitHandler<EmployeesFormData> = async (data) => {
        console.log(data)
        const achivements = data.achivements
        if (achivements?.length === 1 && achivements[0].value === '') data.achivements = undefined

        data.backgroundImgColor = backgroundImgColor

        const response = await dispatch(createEmployeeAction(data))
        const isFulfilled = fullfilled(response.meta.requestStatus)
        if (isFulfilled) router.push('/admin/employees')
    }

    const conditionalRequired = useCallback((checkbox: boolean, requiredMessage: string) => {
        return checkbox ? { required: requiredMessage } : {}
    }, [])

    const handleSocialMediaCheckbox = (
        e: React.ChangeEvent<HTMLInputElement>,
        checkboxName: EmployeesCheckboxesType
    ) => {
        const state = e.target.checked
        dispatch(triggerEmployeeUICheckbox({ checkboxName, state }))
    }
    // HANDLE ARRAY FIELDS
    const deleteWorkSpeciality = (index: number) => {
        if (workSpecialityFields.length > 1) {
            removeWorkSpeciality(index)
            dispatch(deleteModalState({
                index,
                modalName: EmployeesFormDataUIModalsStatesEnum.WORKSPECIALITYSMODALISOPEN
            }))
        }
    }
    const addWorkSpeciality = () => {
        appendWorkSpeciality({ value: '' })
        dispatch(addModalState({ modalName: EmployeesFormDataUIModalsStatesEnum.WORKSPECIALITYSMODALISOPEN }))
    }
    const deleteAchivement = (index: number) => {
        if (achivementFields.length > 1) {
            removeAchivement(index)
            dispatch(deleteModalState({
                index,
                modalName: EmployeesFormDataUIModalsStatesEnum.ACHIVEMENTSISMODALOPEN
            }))
        }
    }
    const addAchivement = () => {
        appendAchivement({ value: '' })
        dispatch(addModalState({ modalName: EmployeesFormDataUIModalsStatesEnum.ACHIVEMENTSISMODALOPEN }))
    }
    // HANDLE MODAL STATES
    const setModalWindowState = (
        index: number,
        state: boolean,
        modalName: EmployeesModalsStatesType
    ) => {
        dispatch(setModalState({ index, state, modalName }))
    }

    return (
        <form
            onSubmit={handleSubmit(createEmployee)}
            className={styles.createEmployeeForm}
        >
            <div className={styles.inputs}>
                <div className={styles.mainInfo}>
                    <div className={styles.fullName}>
                        <InputContainer<EmployeesFormData>
                            label="Ім'я"
                            className={{
                                inputContainer: styles.nameInputContainer
                            }}
                            name={EmployeesFormDataEnum.NAME}
                            register={register}
                            errors={errors}
                            registerOptions={{
                                required: "Ім'я обов'язкове"
                            }}
                        />

                        <InputContainer<EmployeesFormData>
                            label="Прізвище"
                            className={{
                                inputContainer: styles.surnameInputContainer
                            }}
                            name={EmployeesFormDataEnum.SURNAME}
                            register={register}
                            errors={errors}
                            registerOptions={{
                                required: "Прізвище обов'язкове"
                            }}
                        />
                    </div>

                    <InputContainer<EmployeesFormData>
                        label="Посада"
                        className={{
                            inputContainer: styles.surnameInputContainer
                        }}
                        name={EmployeesFormDataEnum.POSITION}
                        register={register}
                        errors={errors}
                        registerOptions={{
                            required: "Посада обов'язкова"
                        }}
                    />
                    <TextareaContainer<EmployeesFormData>
                        label="Коротко про лікаря"
                        className={{
                            inputContainer: styles.surnameInputContainer
                        }}
                        name={EmployeesFormDataEnum.DESCRIPTION}
                        register={register}
                        errors={errors}
                        registerOptions={{
                            required: "Короткий опис обов'язковий"
                        }}
                    />
                </div>

                <div className={styles.socialMedia}>
                    <p className='title sm left'>
                        Посилання на соц. мережі
                    </p>

                    <div className={styles.socialMediaCheckboxes}>
                        <InputContainerWithCheckbox<EmployeesFormData>
                            label="Instagram"
                            name={EmployeesFormDataEnum.INSTAGRAM}
                            register={register}
                            errors={errors}
                            registerOptions={{
                                ...conditionalRequired(instagramCheckbox, "Якщо повинен бути Instagram, то надайте посилання")
                            }}

                            isChecked={instagramCheckbox}
                            handleFunction={(e) => handleSocialMediaCheckbox(
                                e,
                                EmployeesFormDataUICheckboxesEnum.INSTAGRAMCHECKBOX
                            )}
                        />
                        <InputContainerWithCheckbox<EmployeesFormData>
                            label="Facebook"
                            name={EmployeesFormDataEnum.FACEBOOK}
                            register={register}
                            errors={errors}
                            registerOptions={{
                                ...conditionalRequired(facebookCheckbox, "Якщо повинен бути Facebook, то надайте посилання")
                            }}

                            isChecked={facebookCheckbox}
                            handleFunction={(e) => handleSocialMediaCheckbox(
                                e,
                                EmployeesFormDataUICheckboxesEnum.FACEBOOKCHECKBOX
                            )}
                        />
                        <InputContainerWithCheckbox<EmployeesFormData>
                            label="X / Twitter"
                            name={EmployeesFormDataEnum.X}
                            register={register}
                            errors={errors}
                            registerOptions={{
                                ...conditionalRequired(XCheckbox, "Якщо повинен бути X / Twitter, то надайте посилання")
                            }}

                            isChecked={XCheckbox}
                            handleFunction={(e) => handleSocialMediaCheckbox(
                                e,
                                EmployeesFormDataUICheckboxesEnum.XCHECKBOX
                            )}
                        />
                        <InputContainerWithCheckbox<EmployeesFormData>
                            label="Youtube"
                            name={EmployeesFormDataEnum.YOUTUBE}
                            register={register}
                            errors={errors}
                            registerOptions={{
                                ...conditionalRequired(youtubeCheckbox, "Якщо повинен бути Youtube, то надайте посилання")
                            }}

                            isChecked={youtubeCheckbox}
                            handleFunction={(e) => handleSocialMediaCheckbox(
                                e,
                                EmployeesFormDataUICheckboxesEnum.YOUTUBECHECKBOX
                            )}
                        />
                    </div>
                </div>

                <div className={styles.degree}>
                    <p className='title sm left'>
                        Освіта та практика
                    </p>

                    <TextareaContainer<EmployeesFormData>
                        label="Освіта та практика"
                        className={{
                            inputLabel: styles.label,
                            textarea: styles.textarea
                        }}
                        name={EmployeesFormDataEnum.DEGREE}
                        register={register}
                        errors={errors}
                        minRows={3}
                        registerOptions={{
                            required: "Інформація про освіту та практику обов'язкова"
                        }}
                    />
                </div>

                <div className={styles.workSpecialities}>
                    <p className={`title sm left ${styles.label}`}>
                        Основні напрямки діяльності
                    </p>

                    <div className={styles.workSpecialitiesContainer}>
                        {workSpecialityFields.map((field, index) => {
                            return (
                                <div key={field.id}>
                                    <InputContainerWithDeleteBtn<EmployeesFormData>
                                        label={`Напрямок ${index + 1}`}
                                        name={EmployeesFormDataEnum.WORKSPECIALITIES}
                                        register={register}
                                        errors={errors}
                                        registerOptions={{
                                            required: "Введіть напрямок діяльності"
                                        }}
                                        fieldKey={WorkSpecialitysFormDataEnum.VALUE}
                                        index={index}
                                        handleFunction={() => {
                                            setModalWindowState(
                                                index,
                                                true,
                                                EmployeesFormDataUIModalsStatesEnum.WORKSPECIALITYSMODALISOPEN
                                            )
                                        }}
                                    />

                                    {workSpecialitysModalIsOpen[index] && <ModalWindow
                                        title="Ви дійсно бажаєте видалити це відділеня?"
                                    >
                                        <button
                                            className={`btn cancel`}
                                            onClick={() => {
                                                setModalWindowState(
                                                    index,
                                                    false,
                                                    EmployeesFormDataUIModalsStatesEnum.WORKSPECIALITYSMODALISOPEN
                                                )
                                            }}
                                        >
                                            Скасувати видалення
                                        </button>
                                        <button
                                            onClick={() => { deleteWorkSpeciality(index) }}
                                            className={`btn blue lg`}
                                        >
                                            Підтвердити
                                        </button>
                                    </ModalWindow>}
                                </div>
                            )
                        })}
                    </div>

                    <button
                        onClick={addWorkSpeciality}
                        className={`btn blue xl ${styles.btn}`}
                        type='button'
                    >
                        Додати напрям
                    </button>
                </div>

                <div className={styles.achivements}>
                    <FormElementContainerWithCheckbox<EmployeesFormData>
                        label='Досягнення за час роботи (опціонально*)'
                        name={EmployeesFormDataEnum.ACHIVEMENTS}
                        isChecked={achivementsCheckbox}
                        handleFunction={(e) => handleSocialMediaCheckbox(
                            e,
                            EmployeesFormDataUICheckboxesEnum.ACHIVEMENTSCHECKBOX
                        )}
                        className={{
                            inputLabel: `title sm left ${styles.label}`
                        }}
                    >
                        <div className={styles.workSpecialitiesContainer}>
                            {achivementFields.map((field, index) => {
                                return (
                                    <div key={field.id}>
                                        <InputContainerWithDeleteBtn<EmployeesFormData>
                                            label={`Досягнення ${index + 1}`}
                                            name={EmployeesFormDataEnum.ACHIVEMENTS}
                                            register={register}
                                            errors={errors}
                                            registerOptions={{
                                                ...conditionalRequired(achivementsCheckbox, "Якщо повинні бути досягнення, то введіть їх")
                                            }}
                                            fieldKey={AhivementsFormDataEnum.VALUE}
                                            index={index}
                                            handleFunction={() => {
                                                setModalWindowState(
                                                    index,
                                                    true,
                                                    EmployeesFormDataUIModalsStatesEnum.ACHIVEMENTSISMODALOPEN
                                                )
                                            }}
                                        />

                                        {achivementsModalIsOpen[index] && <ModalWindow
                                            title="Ви дійсно бажаєте видалити це відділеня?"
                                        >
                                            <button
                                                className={`btn cancel`}
                                                onClick={() => {
                                                    setModalWindowState(
                                                        index,
                                                        false,
                                                        EmployeesFormDataUIModalsStatesEnum.ACHIVEMENTSISMODALOPEN
                                                    )
                                                }}
                                            >
                                                Скасувати видалення
                                            </button>
                                            <button
                                                onClick={() => { deleteAchivement(index) }}
                                                className={`btn blue lg`}
                                            >
                                                Підтвердити
                                            </button>
                                        </ModalWindow>}
                                    </div>
                                )
                            })}
                        </div>

                        <button
                            onClick={addAchivement}
                            className={`btn blue xl ${styles.btn}`}
                            type='button'
                        >
                            Додати досягнення
                        </button>
                    </FormElementContainerWithCheckbox>
                </div>

                <div className={styles.image}>
                    <p className={`title sm left ${styles.sectionLabel}`}>
                        Фото
                    </p>

                    <div className={styles.checkboxContainer}>
                        <p className='inputLabel'>
                            Колір фону
                        </p>
                        <div className={styles.fullCheckbox}>
                            <Checkbox
                                isChecked={backgroundImgColor === EmployeesBackgroundImgColorEnum.BLUE}
                                handleFunction={() => {
                                    const newColor = backgroundImgColor === EmployeesBackgroundImgColorEnum.BLUE
                                        ? EmployeesBackgroundImgColorEnum.GREY
                                        : EmployeesBackgroundImgColorEnum.BLUE
                                    dispatch(setEmployeeBackgroundImgColorCheckbox(newColor))
                                }}
                                className={{
                                    label: styles.checkbox
                                }}
                            />

                            <div className={styles.checkboxLabels}>
                                <span>
                                    Сірий
                                </span>
                                <span>
                                    Синій
                                </span>
                            </div>
                        </div>
                    </div>

                    <p className={`inputLabel ${styles.inputLabel}`}>
                        {'Завантажте фото (без фону, в форматі:  .png)'}
                    </p>

                    <input
                        id='upload_image'
                        type="file"
                        hidden
                        {...register(EmployeesFormDataEnum.IMAGE, {
                            required: "Завантажте фото",
                        })}
                    />
                    <label
                        className={`btn blue sm`}
                        htmlFor="upload_image"
                    >
                        Завантажити
                    </label>

                    <div className={styles.imagePreview}>
                        {errors[EmployeesFormDataEnum.IMAGE] && <p className={`error ${styles.errorMessage}`}>
                            {errors[EmployeesFormDataEnum.IMAGE].message}
                        </p>}

                        <div className={styles.images}>
                            <div
                                className={`
                                    ${styles.imageContainer} 
                                    ${styles.small} 
                                    ${errors[EmployeesFormDataEnum.IMAGE] ? styles.error : ''} 
                                    ${styles[backgroundImgColor]}
                                `}
                            >
                                {image && <img
                                    className={styles.image}
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                />}
                            </div>

                            <div
                                className={`
                                    ${styles.imageContainer} 
                                    ${styles.big} 
                                    ${errors[EmployeesFormDataEnum.IMAGE] ? styles.error : ''} 
                                    ${styles[backgroundImgColor]}
                                `}
                            >
                                {image && <img
                                    className={styles.image}
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                />}
                            </div>
                        </div>
                        <p className={styles.caption}>
                            Попередній перегляд
                        </p>
                    </div>
                </div>
            </div>

            <SubmitButton
                error={error.create}
            />
        </form>
    )
}
