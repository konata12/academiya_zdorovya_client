'use client'

import styles from './UpdateDepartmentsForm.module.scss'
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';import { GOOGLE_MAPS_URL, PHONE_NUMBER } from '@/app/utils/regex';
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks';
import { RootState } from '@/app/utils/redux/store';
import { setUpdateError, updateDepartment as updateDepartmentAction } from "@/app/utils/redux/departments/departmentsSlice"
import { Department, DepartmentsDefaultFormData, DepartmentsFormData } from '@/app/types/departments';
import { isEqual } from 'lodash';
import ModalWindow from '@/app/admin/(provider)/ui/Forms/ModalWindow/ModalWindow';

export default function UpdateDepartmentForm({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const { departments, error } = useAppSelector((state: RootState) => state.departments)
    const dispatch = useAppDispatch()
    const routerNav = useRouter()

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

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (department) {
                const equal = checkIsEqual(formValues, department)
                if (equal) e.preventDefault()
            }
            e.returnValue = ''
        }
    
        window.addEventListener('beforeunload', handleBeforeUnload)
        window.addEventListener('hashchange', handleBeforeUnload)
    
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
            window.removeEventListener('hashchange', handleBeforeUnload)
        }
    }, [])

    const updateDepartment: SubmitHandler<DepartmentsFormData> = async (data) => {
        // SET ID
        let departmentId: number = 0
        if (id) departmentId = +id

        // CHECK IF DATA UPDATED
        if (department) {
            const equal = checkIsEqual(data, department)
            //  IF NOT UPDATED NOT ALLOW REQUEST
            if (equal) {
                closeModal()
                dispatch(setUpdateError())
                return
            }
        }
        dispatch(updateDepartmentAction({ data, departmentId }))
        routerNav.push('/admin/departments')
    }

    const checkIsEqual = (
        formData: DepartmentsDefaultFormData,
        department: Department
    ) => {
        const { id, ...departmentWithoutId } = department
        // console.log(formData, departmentWithoutId)
        return isEqual(formData, departmentWithoutId);
    }

    const closeModal = () => {
        setModalIsOpen(false)
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
            {error.update && <p className="error">{error.update.message}</p>}

            {children}

            {modalIsOpen && <ModalWindow
                title='Ви дійсно бажаєте покинути сторінку?'
            >
                <p className={styles.text}>
                    Зміни не буде збережено
                </p>
                <button
                    onClick={() => { setModalIsOpen(false) }}
                    type='button'
                    className='btn cancel'
                >
                    Скасувати
                </button>
                <button
                    onClick={() => { }}
                    type='button'
                    className='btn blue xl'
                >
                    Підтвердити
                </button>
            </ModalWindow>}
        </form>
    )
}