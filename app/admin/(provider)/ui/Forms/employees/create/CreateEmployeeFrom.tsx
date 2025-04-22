'use client'

import { useAppSelector } from '@/app/utils/redux/hooks'
import { RootState } from '@/app/utils/redux/store'
import React from 'react'
import styles from './CreateEmployeeForm.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { EmployeesFormData, EmployeesFormDataEnum } from '@/app/types/data/employees'
import InputContainer from '@/app/common_ui/form_components/BasicInputContainer/children/InputContainer/InputContainer'
import TextareaContainer from '@/app/common_ui/form_components/BasicInputContainer/children/TextareaContainer/TextareaContainer'
import SubmitButton from '@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton'

export default function CreateEmployeeFrom() {
    const { error } = useAppSelector((state: RootState) => state.employees)

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<EmployeesFormData>()

    // CREATE ABOUT TREATMENT FUNCTION
    const createAboutTreatment: SubmitHandler<EmployeesFormData> = async (data) => {
        console.log(data)
        // const response = await dispatch(createAboutTreatmentAction(data))
        // const isFulfilled = fullfilled(response.meta.requestStatus)
        // if (isFulfilled) router.push('/admin/about_treatment')
    }


    return (
        <form onSubmit={handleSubmit(createAboutTreatment)}>
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
                    value={watch(EmployeesFormDataEnum.DESCRIPTION)}
                    name={EmployeesFormDataEnum.DESCRIPTION}
                    register={register}
                    errors={errors}
                    registerOptions={{
                        required: "Короткий опис обов'язковий"
                    }}
                />
            </div>

            <div className={styles.socialMedia}>

            </div>
            <div className={styles.degree}>

            </div>
            <div className={styles.degree}>

            </div>
            <div className={styles.workSpecialities}>

            </div>
            <div className={styles.achivements}>

            </div>
            <div className={styles.image}>

            </div>

            <SubmitButton
                error={error.create}
            />
        </form>
    )
}
