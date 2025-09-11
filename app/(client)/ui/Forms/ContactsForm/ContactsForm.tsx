"use client";

import { ContactUsSelect } from "@/app/(client)/ui/Forms/ContactsForm/ContactUsSelect/ContactUsSelect";
import SubmitButton from "@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton";
import BasicInputContainerHookForm from "@/app/common_ui/form_components/InputContainers/HookForm/children/BasicInputContainerHookForm/BasicInputContainerHookForm";
import { postBooking } from "@/app/services/server/fetchData.service";
import { BookingService } from "@/app/types/data/booking_services.type";
import { ErrorBase } from "@/app/types/data/response.type";
import { PHONE_NUMBER } from "@/app/utils/regex";
import Link from "next/link";
import { JSX, use, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./ContactsForm.module.scss";

interface ContactFormProps {
	bookingServicesPromise: Promise<BookingService[]>;
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

export function ContactsForm({ bookingServicesPromise }: ContactFormProps): JSX.Element {
	const bookingServices = use(bookingServicesPromise);

	const [bookingServiceId, setBookingServiceId] = useState<number | null>(null);
	const [selectError, setSelectError] = useState(false);
	const [submitError, setSubmitError] = useState<ErrorBase | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactsForm>();

	const handleListClick = (id: number, label: string) => {
		setBookingServiceId(id);
		setSelectError(false);
	};

	const book: SubmitHandler<ContactsForm> = async (data) => {
		console.log("form data:", { ...data, bookingServiceId });
		console.log(bookingServiceId);
		if (!bookingServiceId) {
			setSelectError(true);
			return;
		}

		const response = await postBooking({
			...data,
			bookingServiceId,
		});

		if (response) {
			setSubmitError(response);
		} else {
			setSubmitError(null);
		}
	};

	console.log("selectError", selectError);

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
				parentHandleListSelect={handleListClick}
			/>

			<Link href={"/prices"}>Подивитись ціни на послуги</Link>

			<SubmitButton
				error={submitError}
				label={"Записатись зараз"}
				className={{ button: styles.submit, error: styles.submitError }}
			/>
		</form>
	);
}
