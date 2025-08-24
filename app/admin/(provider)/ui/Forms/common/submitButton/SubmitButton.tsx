import React from "react";
import styles from "./SubmitButton.module.scss";
import { ErrorResponse } from "@/app/types/data/response.type";
import { FormInputError } from "@/app/types/data/form.type";

interface Styles {
	container?: string;
	button?: string;
	error?: string;
}

interface SubmitButtonProps {
	error: ErrorResponse | FormInputError | null;
	className?: Styles;
	label?: string;
	type?: "button" | "reset" | "submit";
	onClick?: () => void;
}

export default function SubmitButton({
	error,
	className,
	label = "Створити",
	type = "submit",
	onClick,
}: SubmitButtonProps) {
	return (
		<div className={`${styles.formErrorWrap} ${className?.container}`}>
			{error && (
				<p className={`error ${styles.formError} ${className?.error}`}>
					{error.message}
				</p>
			)}
			<button
				className={`btn blue xl ${styles.submit} ${className?.button}`}
				type={type}
				onClick={onClick}
			>
				{label}
			</button>
		</div>
	);
}
