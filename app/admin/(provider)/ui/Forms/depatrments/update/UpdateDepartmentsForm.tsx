'use client'

import styles from './UpdateDepartmentsForm.module.scss'
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation'; import { GOOGLE_MAPS_URL, PHONE_NUMBER } from '@/app/utils/regex';
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks';
import { RootState } from '@/app/utils/redux/store';
import { setUpdateError, updateDepartment as updateDepartmentAction, updateDepartmentInState } from "@/app/utils/redux/departments/departmentsSlice"
import { setFormDefaultValuesNavigation } from '@/app/utils/redux/navigation/navigationSlice'
import { Department, DepartmentsDefaultFormData, DepartmentsFormData, DepartmentsFormDataEnum } from '@/app/types/data/departments.type';
import { isEqual } from 'lodash';
import HookFormInputContainer from '@/app/common_ui/form_components/InputContainers/HookForm/children/InputContainer/InputContainerHookForm';
import SubmitButton from '@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton';
import { fullfilled } from '@/app/services/response.service';
import { useFormChangeCheck } from '@/app/utils/hooks/common/useFormChangeCheck';

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
    useFormChangeCheck(department, formValues)

    const updateDepartment: SubmitHandler<DepartmentsFormData> = async (data) => {
        const id = `${department?.id}`
        // CHECK IF DATA UPDATED
        if (department) {
            //  IF NOT UPDATED NOT ALLOW REQUEST
            if (formDefaultValues) {
                dispatch(setUpdateError())
                return
            }

            const response = await dispatch(updateDepartmentAction({ data, id }))
            const isFulfilled = fullfilled(response.meta.requestStatus)
            if (isFulfilled) {
                dispatch(updateDepartmentInState({ data, id }))
                router.push('/admin/departments')
            }
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
                <HookFormInputContainer<DepartmentsFormData>
                    label="Місто"
                    name={DepartmentsFormDataEnum.CITY}
                    register={register}
                    errors={errors}
                    registerOptions={{
                        required: "Місто обов'язкове"
                    }}
                />
                <HookFormInputContainer<DepartmentsFormData>
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
                <HookFormInputContainer<DepartmentsFormData>
                    label="Адреса"
                    name={DepartmentsFormDataEnum.ADDRESS}
                    register={register}
                    errors={errors}
                    registerOptions={{
                        required: "Адреса обов'язкова",
                    }}
                />
                <HookFormInputContainer<DepartmentsFormData>
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
            <HookFormInputContainer<DepartmentsFormData>
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
                error={error.update}
                label='Підтвердити зміни'
                className={{
                    button: styles.submitBtn,
                    error: styles.submitError
                }}
            />
        </form>
    )
}