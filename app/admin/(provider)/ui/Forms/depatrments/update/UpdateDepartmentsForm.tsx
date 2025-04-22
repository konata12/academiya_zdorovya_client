'use client'

import styles from './UpdateDepartmentsForm.module.scss'
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation'; import { GOOGLE_MAPS_URL, PHONE_NUMBER } from '@/app/utils/regex';
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks';
import { RootState } from '@/app/utils/redux/store';
import { setUpdateError, updateDepartment as updateDepartmentAction, updateDepartmentInState } from "@/app/utils/redux/departments/departmentsSlice"
import { setFormDefaultValues as setFormDefaultValuesRedux } from '@/app/utils/redux/navigation/navigationSlice'
import { Department, DepartmentsDefaultFormData, DepartmentsFormData, DepartmentsFormDataEnum } from '@/app/types/data/departments';
import { isEqual } from 'lodash';
import InputContainer from '@/app/common_ui/form_components/BasicInputContainer/children/InputContainer/InputContainer';
import SubmitButton from '@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton';

export default function UpdateDepartmentForm() {
    const [formDefaultValues, setFormDefaultValues] = useState(true)
    const formDefaultValuesRef = useRef(formDefaultValues)

    const { departments, error } = useAppSelector((state: RootState) => state.departments)

    const dispatch = useAppDispatch()
    const router = useRouter()

    const { id } = useParams() // get departments id from url
    const department = departments.find(department => {
        if (id) return department.id === +id
    })

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<DepartmentsFormData>()

    // Watch form values to detect changes
    const formValues = useWatch({ control })

    // Reset form values when `department` is available | just creates default values
    useEffect(() => {
        if (department) {
            reset({
                city: department.city,
                hotline: department.hotline,
                address: department.address,
                googleMapUrl: department.googleMapUrl,
                googleMapReviewsUrl: department.googleMapReviewsUrl,
            });
        }
    }, [department, reset])

    // CHECK IF FORM DATA IS DEFAULT
    useEffect(() => {
        if (department) {
            const equal = checkIsEqual(formValues, department)
            setFormDefaultValues(equal)
        }
    }, [formValues, department])

    // Update the ref whenever formDefaultValues changes
    useEffect(() => {
        formDefaultValuesRef.current = formDefaultValues
        // update defultVelues state in redux
        dispatch(setFormDefaultValuesRedux(formDefaultValuesRef.current))

        // after leaving page set formDefaultValues in redix to initial
        return () => {
            dispatch(setFormDefaultValuesRedux(true))
        }
    }, [formDefaultValues])

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

    const updateDepartment: SubmitHandler<DepartmentsFormData> = async (data) => {
        const id = `${department?.id}`
        // CHECK IF DATA UPDATED
        if (department) {
            //  IF NOT UPDATED NOT ALLOW REQUEST
            if (formDefaultValues) {
                dispatch(setUpdateError())
                return
            }

            dispatch(updateDepartmentAction({ data, id }))
            dispatch(updateDepartmentInState({ data, id }))
            router.push('/admin/departments')
        }
    }

    const checkIsEqual = (
        formData: DepartmentsDefaultFormData,
        department: Department
    ) => {
        const { id, ...departmentWithoutId } = department
        return isEqual(formData, departmentWithoutId);
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(updateDepartment)}
        >
            <div className={styles.line}>
                <InputContainer<DepartmentsFormData>
                    label="Місто"
                    name={DepartmentsFormDataEnum.CITY}
                    register={register}
                    errors={errors}
                    registerOptions={{
                        required: "Місто обов'язкове"
                    }}
                />
                <InputContainer<DepartmentsFormData>
                    label="Гаряча лінія"
                    name={DepartmentsFormDataEnum.HOTLINE}
                    register={register}
                    errors={errors}
                    registerOptions={{
                        required: "Гаряча лінія обов'язкова",
                        pattern: {
                            value: PHONE_NUMBER,
                            message: 'Повинен бути номер телефону'
                        }
                    }}
                />
            </div>
            <div className={styles.line}>
                <InputContainer<DepartmentsFormData>
                    label="Адреса"
                    name={DepartmentsFormDataEnum.ADDRESS}
                    register={register}
                    errors={errors}
                    registerOptions={{
                        required: "Адреса обов'язкова",
                    }}
                />
                <InputContainer<DepartmentsFormData>
                    label="Посилання на гугл карти"
                    name={DepartmentsFormDataEnum.GOOGLEMAPURSL}
                    register={register}
                    errors={errors}
                    registerOptions={{
                        required: "Посилання на відділення в гугл картах обов'язкове",
                        pattern: {
                            value: GOOGLE_MAPS_URL,
                            message: 'Повинно бути посилання на відділення в гугл картах'
                        }
                    }}
                />
            </div>
            <InputContainer<DepartmentsFormData>
                label="Посилання на відгуки гугл карт"
                name={DepartmentsFormDataEnum.GOOGLEMAPREVIEWSURL}
                register={register}
                errors={errors}
                registerOptions={{
                    required: "Посилання на відгуки відділення в обов'язкове",
                    pattern: {
                        value: GOOGLE_MAPS_URL,
                        message: 'Повинно бути посилання відгуки гугл карт'
                    }
                }}
            />
            
            <SubmitButton
                error={error.create}
                className={{
                    button: styles.submitBtn
                }}
            />
        </form>
    )
}