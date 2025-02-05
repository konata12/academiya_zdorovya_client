import { useAuth } from '@/app/utils/context/authContext';
import styles from './UpdateDepartmentsForm.module.scss'
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DepartmentsFormData } from '@/app/admin/types';
import { useDepartmentsFunc } from '@/app/utils/context/departmentsFuncContext';
import { useRouter } from 'next/router';
import axiosInstance from '@/app/utils/axios';
import { AxiosError } from 'axios';
import { GOOGLE_MAPS_URL, PHONE_NUMBER } from '@/app/utils/regex';

export default function UpdateDepartmentForm({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { accessToken, setAccessToken } = useAuth()
    const [error, setError] = useState<string | null>(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DepartmentsFormData>()
    const { getDepartments } = useDepartmentsFunc()
    const router = useRouter()

    const createDepartment: SubmitHandler<DepartmentsFormData> = async (data) => {
        const { city, address, hotline } = data
        try {
            await axiosInstance.post('departments/admin/create', {
                city,
                address,
                hotline,
                mapLink: `https://www.google.com/maps/place/Akademiya+Zdorov'ya`
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            await getDepartments()
            router.push('/admin/departments')
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error)
                setError(error.response?.data.error)
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
                        className={`input`}
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
                        className={`input`}
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
                        className={`input`}
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
                        className={`input`}
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
                    className={`input`}
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
