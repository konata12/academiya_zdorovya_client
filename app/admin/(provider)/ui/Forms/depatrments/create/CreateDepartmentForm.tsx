"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./CreateDepartmentFrom.module.scss";
import { GOOGLE_MAPS_URL, PHONE_NUMBER } from "@/app/utils/regex";
import { useRouter } from "next/navigation";
import {
	DepartmentsFormData,
	DepartmentsFormDataEnum,
} from "@/app/types/data/departments.type";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { createDepartment as createDepartmentAction } from "@/app/utils/redux/departments/departmentsSlice";
import { fulfilled } from "@/app/services/response.service";
import HookFormInputContainer from "@/app/common_ui/form_components/InputContainers/HookForm/children/InputContainer/InputContainerHookForm";
import SubmitButton from "@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton";

export default function CreateDepartmentForm() {
	const { error } = useAppSelector((state: RootState) => state.departments);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<DepartmentsFormData>();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const createDepartment: SubmitHandler<DepartmentsFormData> = async (data) => {
		const response = await dispatch(createDepartmentAction(data));
		const isFulfilled = fulfilled(response.meta.requestStatus);
		if (isFulfilled) router.push("/admin/departments");
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(createDepartment)}>
			<div className={styles.line}>
				<HookFormInputContainer<DepartmentsFormData>
					label="Місто"
					name={DepartmentsFormDataEnum.CITY}
					register={register}
					errors={errors}
					registerOptions={{
						required: "Місто обов'язкове",
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
							message: "Повинен бути номер телефону",
						},
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
							message: "Повинно бути посилання на відділення в гугл картах",
						},
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
						message: "Повинно бути посилання відгуки гугл карт",
					},
				}}
			/>

			<SubmitButton
				error={error.create}
				className={{
					button: styles.submitBtn,
					error: styles.submitError,
				}}
			/>
		</form>
	);
}
