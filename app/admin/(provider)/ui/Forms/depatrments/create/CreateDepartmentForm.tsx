'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import styles from './CreateDepartmentFrom.module.scss'
import { GOOGLE_MAPS_URL, PHONE_NUMBER } from "@/app/utils/regex";
import { useRouter } from "next/navigation";
import { DepartmentsFormData, DepartmentsFormDataEnum } from "@/app/types/departments";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { createDepartment as createDepartmentAction } from "@/app/utils/redux/departments/departmentsSlice"
import { fullfilled } from "@/app/services/response";


export default function CreateDepartmentForm() {
    const { error } = useAppSelector((state: RootState) => state.departments)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DepartmentsFormData>()
    const router = useRouter()
    const dispatch = useAppDispatch()

    const createDepartment: SubmitHandler<DepartmentsFormData> = async (data) => {
        const response = await dispatch(createDepartmentAction(data))
        const isFulfilled = fullfilled(response.meta.requestStatus)
        if (isFulfilled) router.push('/admin/departments')
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(createDepartment)}
        >
            <div className={styles.line}>
                <div className={styles.inputContainer}>
                    <label
                        className={`inputLabel`}
                        htmlFor="city"
                    >
                        Місто
                    </label>
                    <input
                        className={`input ${errors.city && 'wrong'}`}
                        {...register(DepartmentsFormDataEnum.CITY, {
                            required: "Місто обов'язкове",
                        })}
                        type="text"
                        id='city'
                    />
                    {errors.city && <p className="error">{errors.city.message}</p>}
                </div>
                <div className={styles.inputContainer}>
                    <label
                        className={`inputLabel`}
                        htmlFor="hotline"
                    >
                        Гаряча лінія
                    </label>
                    <input
                        className={`input ${errors.hotline && 'wrong'}`}
                        {...register(DepartmentsFormDataEnum.HOTLINE, {
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
                        className={`inputLabel`}
                        htmlFor="address"
                    >
                        Адреса
                    </label>
                    <input
                        className={`input ${errors.address && 'wrong'}`}
                        {...register(DepartmentsFormDataEnum.ADDRESS, {
                            required: "Адреса обов'язкова",
                        })}
                        type="text"
                        id='address'
                    />
                    {errors.address && <p className="error">{errors.address.message}</p>}
                </div>
                <div className={styles.inputContainer}>
                    <label
                        className={`inputLabel`}
                        htmlFor="google-map-url"
                    >
                        Посилання на гугл карти
                    </label>
                    <input
                        className={`input ${errors.googleMapUrl && 'wrong'}`}
                        {...register(DepartmentsFormDataEnum.GOOGLEMAPURSL, {
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
                    className={`inputLabel`}
                    htmlFor="google-map-reviews-url"
                >
                    Посилання на відгуки гугл карт
                </label>
                <input
                    className={`input ${errors.googleMapReviewsUrl && 'wrong'}`}
                    {...register(DepartmentsFormDataEnum.GOOGLEMAPREVIEWSURL, {
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
                {error.create && <p className={`error ${styles.formError}`}>{error.create.message}</p>}
                <button
                    className={`btn blue xl ${styles.submit}`}
                    type='submit'
                >
                    Створити
                </button>
            </div>
        </form>
    )
}