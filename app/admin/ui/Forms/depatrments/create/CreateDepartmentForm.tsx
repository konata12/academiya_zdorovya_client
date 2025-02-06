'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import styles from './CreateDepartmentFrom.module.scss'
import { DepartmentsFormData } from '@/app/admin/types'
import { GOOGLE_MAPS_URL, PHONE_NUMBER } from "@/app/utils/regex";
import axiosInstance from "@/app/utils/axios";
import { useAuth } from "@/app/utils/context/authContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AxiosError } from "axios";
import { useDepartmentsFunc } from "@/app/utils/context/departmentsFuncContext";

export default function CreateDepartmentForm({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { accessToken, refreshToken } = useAuth()
    const [error, setError] = useState<string | null>(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DepartmentsFormData>()
    const { getDepartments, setGetDepartmentsError } = useDepartmentsFunc()
    const router = useRouter()

    const createDepartment: SubmitHandler<DepartmentsFormData> = async (data) => {
        try {
            await axiosInstance.post('departments/admin/create', data)

            await getDepartments()
            setGetDepartmentsError(null)
            router.push('/admin/departments')
        } catch (error) {
            console.log(error)

            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    try {
                        await refreshToken() // Refresh token and update context
                        // Retry the original request with the new token
                        await axiosInstance.post('departments/admin/create', data)
    
                        await getDepartments()
                        setGetDepartmentsError(null)
                        router.push('/admin/departments')
                    } catch (refreshError) {
                        console.log("Failed to refresh token:", refreshError)
                        router.push('/admin/login') // Redirect to login if refresh fails
                    }
                } else {
                    setError(error.response?.data.error);
                }
            }
        }
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(createDepartment)}
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
            {error && <p className="error">{error}</p>}
            {children}
        </form>
    )
}
