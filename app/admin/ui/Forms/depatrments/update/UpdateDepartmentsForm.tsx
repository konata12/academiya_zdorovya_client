'use client'

import { useAuth } from '@/app/utils/context/authContext';
import styles from './UpdateDepartmentsForm.module.scss'
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DepartmentsFormData } from '@/app/admin/types';
import { useDepartmentsFunc } from '@/app/utils/context/departmentsFuncContext';
import { useParams, useRouter } from 'next/navigation';
import axiosInstance from '@/app/utils/axios';
import { AxiosError } from 'axios';
import { GOOGLE_MAPS_URL, PHONE_NUMBER } from '@/app/utils/regex';

export default function UpdateDepartmentForm({
    children,
    onErrors,
    handleModal
}: Readonly<{
    children: React.ReactNode
    onErrors: Function
    handleModal: Function
}>) {
    const [responseError, setResponseError] = useState<string | null>(null)
    const { accessToken, setAccessToken } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DepartmentsFormData>()
    const router = useRouter()

    useEffect(() => {
        if (onErrors) {
            onErrors(errors, responseError);
        }
    }, [errors, onErrors]);

    const { getDepartments, departments } = useDepartmentsFunc()
    const { id } = useParams() // get departments id from url
    const department = departments.find((department) => {
        return department.id === Number(id)
    })
    console.log(department)

    const updateDepartment: SubmitHandler<DepartmentsFormData> = async (data) => {
        try {
            await axiosInstance.put(`departments/admin/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            await getDepartments()
            router.push('/admin/departments')
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error)
                setResponseError(error.response?.data.error)
                handleModal()
            }
        }
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
            {responseError && <p className="error">{responseError}</p>}
            {children}
        </form>
    )
}
