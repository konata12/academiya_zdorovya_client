"use client";

import { ContactUsSelect } from "@/app/(client)/ui/Forms/ContactsForm/ContactUsSelect/ContactUsSelect";
import SubmitButton from "@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton";
import BasicInputContainerHookForm from "@/app/common_ui/form_components/InputContainers/HookForm/children/BasicInputContainerHookForm/BasicInputContainerHookForm";
import { postBooking } from "@/app/services/server/fetchData.service";
import { BookingService } from "@/app/types/data/booking_services.type";
import { StatusType } from "@/app/types/data/response.type";
import { PHONE_NUMBER } from "@/app/utils/regex";
import Link from "next/link";
import { JSX, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./ContactsForm.module.scss";

interface ContactFormProps {
	bookingServices: BookingService[];
}
interface ContactsForm {
	name: string;
	surname: string;
	phoneNumber: string;
}
export interface ContactsFormRequest {
	name: string;
	surname: string;
	phoneNumber: string;
	bookingServiceId: number;
}

const formSubmitError = {
	message: "Помилка запису, спробуйте пізніше",
};

export function ContactsForm({ bookingServices }: ContactFormProps): JSX.Element {
	const [bookingServiceId, setBookingServiceId] = useState<number | null>(null);
	const [selectError, setSelectError] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<StatusType>(null);

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactsForm>();

	const handleListClick = (id: number, label: string) => {
		setBookingServiceId(id);
		setSelectError(false);
	};

	const book: SubmitHandler<ContactsForm> = async (data) => {
		if (bookingServiceId === 0) {
			setSubmitStatus("failed");
			return;
		}
		if (!bookingServiceId) {
			setSelectError(true);
			return;
		}

		setSubmitStatus("loading");

		const responseStatus = await postBooking({
			...data,
			bookingServiceId,
		});

		if (responseStatus) {
			setSubmitStatus("succeeded");
			setBookingServiceId(null);
			reset();
		} else {
			setSubmitStatus("failed");
		}
	};

	// todo add checkpoint for agreement for using personal data
	return (
		<form className={styles.form} onSubmit={handleSubmit(book)}>
			<BasicInputContainerHookForm<ContactsForm>
				name={"surname"}
				placeHolder={"Прізвище"}
				register={register}
				errors={errors}
				registerOptions={{
					required: "Прізвище обов'язкове",
				}}
			/>
			<BasicInputContainerHookForm<ContactsForm>
				name={"name"}
				placeHolder={"Ім’я"}
				register={register}
				errors={errors}
				registerOptions={{
					required: "Ім'я обов'язкове",
				}}
			/>
			<BasicInputContainerHookForm<ContactsForm>
				name={"phoneNumber"}
				placeHolder={"Номер телефону"}
				register={register}
				errors={errors}
				registerOptions={{
					required: "Номер телефону обов'язковий",
					pattern: {
						value: PHONE_NUMBER,
						message: "Повинен бути номер телефону",
					},
				}}
			/>

			<ContactUsSelect
				list={bookingServices}
				selectError={selectError}
				selected={bookingServiceId !== null}
				parentHandleListSelect={handleListClick}
			/>

			<Link href={"/prices"}>Подивитись ціни на послуги</Link>

			<div className={styles.submitContainer}>
				{submitStatus === "succeeded" && (
					<p className={styles.succeeded}>Запис успішно створено</p>
				)}
				<SubmitButton
					error={submitStatus === "failed" ? formSubmitError : null}
					label={"Записатись зараз"}
					className={{ button: styles.submit, error: styles.submitError }}
				/>
			</div>
		</form>
	);
}
