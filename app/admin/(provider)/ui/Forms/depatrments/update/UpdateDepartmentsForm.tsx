'use client'

import styles from './UpdateDepartmentsForm.module.scss'
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation'; import { GOOGLE_MAPS_URL, PHONE_NUMBER } from '@/app/utils/regex';
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks';
import { RootState } from '@/app/utils/redux/store';
import { setUpdateError, updateDepartment as updateDepartmentAction, updateDepartmentInState } from "@/app/utils/redux/departments/departmentsSlice"
import { setFormDefaultValues as setFormDefaultValuesRedux } from '@/app/utils/redux/navigation/navigationSlice'
import { Department, DepartmentsDefaultFormData, DepartmentsFormData } from '@/app/types/departments';
import { isEqual } from 'lodash';

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
        window.addEventListener('popstate', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
            window.removeEventListener('popstate', handleBeforeUnload)
        }
    }, [])

    const updateDepartment: SubmitHandler<DepartmentsFormData> = async (data) => {
        // SET ID
        let departmentId: number = 0
        if (id) departmentId = +id

        // CHECK IF DATA UPDATED
        if (department) {
            //  IF NOT UPDATED NOT ALLOW REQUEST
            if (formDefaultValues) {
                dispatch(setUpdateError())
                return
            }

            dispatch(updateDepartmentAction({ data, departmentId }))
            dispatch(updateDepartmentInState({ data, departmentId }))
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
                <div className={styles.inputContainer}>
                    <label
                        className={`inputLabel ${styles.label}`}
                        htmlFor="city"
                    >
                        Місто
                    </label>
                    <input
                        className={`input ${errors.city && 'wrong'}`}
                        {...register('city', {
                            required: "Місто обов'язкове",
                        })}
                        type="text"
                        id='city'
                    />
                    {errors.city && <p className="error">{errors.city.message}</p>}
                </div>
                <div className={styles.inputContainer}>
                    <label
                        className={`inputLabel ${styles.label}`}
                        htmlFor="hotline"
                    >
                        Гаряча лінія
                    </label>
                    <input
                        className={`input ${errors.hotline && 'wrong'}`}
                        {...register('hotline', {
                            required: "Гаряча лінія обов'язкова",
                            pattern: {
                                value: PHONE_NUMBER,
                                message: 'Повинен бути номер телефону'
                            }
                        })}
                        type="text"
                        id='hotline'
                    />
                    {errors.hotline && <p className="error">{errors.hotline.message}</p>}
                </div>
            </div>
            <div className={styles.line}>
                <div className={styles.inputContainer}>
                    <label
                        className={`inputLabel ${styles.label}`}
                        htmlFor="address"
                    >
                        Адреса
                    </label>
                    <input
                        className={`input ${errors.address && 'wrong'}`}
                        {...register('address', {
                            required: "Адреса обов'язкова",
                        })}
                        type="text"
                        id='address'
                    />
                    {errors.address && <p className="error">{errors.address.message}</p>}
                </div>
                <div className={styles.inputContainer}>
                    <label
                        className={`inputLabel ${styles.label}`}
                        htmlFor="google-map-url"
                    >
                        Посилання на гугл карти
                    </label>
                    <input
                        className={`input ${errors.googleMapUrl && 'wrong'}`}
                        {...register('googleMapUrl', {
                            required: "Посилання на відділення в гугл картах обов'язкове",
                            pattern: {
                                value: GOOGLE_MAPS_URL,
                                message: 'Повинно бути посилання на відділення в гугл картах'
                            }
                        })}
                        type="text"
                        id='google-map-url'
                    />
                    {errors.googleMapUrl && <p className="error">{errors.googleMapUrl.message}</p>}
                </div>
            </div>
            <div className={styles.inputContainer}>
                <label
                    className={`inputLabel ${styles.label}`}
                    htmlFor="google-map-reviews-url"
                >
                    Посилання на відгуки гугл карт
                </label>
                <input
                    className={`input ${errors.googleMapReviewsUrl && 'wrong'}`}
                    {...register('googleMapReviewsUrl', {
                        required: "Посилання на відгуки відділення в обов'язкове",
                        pattern: {
                            value: GOOGLE_MAPS_URL,
                            message: 'Повинно бути посилання відгуки гугл карт'
                        }
                    })}
                    type="text"
                    id='google-map-reviews-url'
                />
                {errors.googleMapReviewsUrl && <p className="error">{errors.googleMapReviewsUrl.message}</p>}
            </div>
            
            <div className={styles.formErrorWrap}>
                {error.update && <p className={`error ${styles.formError}`}>{error.update.message}</p>}
                <button
                    className={`btn blue xl ${styles.submit}`}
                    type='submit'
                >
                    Підтвердити зміни
                </button>
            </div>
        </form>
    )
}