'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import styles from './CreateDepartmentFrom.module.scss'
import { GOOGLE_MAPS_URL, PHONE_NUMBER } from "@/app/utils/regex";
import { useRouter } from "next/navigation";
import { DepartmentsFormData, DepartmentsFormDataEnum } from "@/app/types/data/departments.type";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { createDepartment as createDepartmentAction } from "@/app/utils/redux/departments/departmentsSlice"
import { fullfilled } from "@/app/services/response";
import InputContainer from "@/app/common_ui/form_components/BasicInputContainer/children/InputContainer/InputContainer";
import SubmitButton from "@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton";


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
                    button: styles.submitBtn,
                    error: styles.submitError
                }}
            />
        </form>
    )
}