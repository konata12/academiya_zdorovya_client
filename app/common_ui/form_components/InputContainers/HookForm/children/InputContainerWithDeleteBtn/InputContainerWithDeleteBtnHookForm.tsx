import React from "react";
import styles from "./InputContainerWithDeleteBtnHookForm.module.scss";
import { HookFormInputContainerWithDeleteBtnProps } from "@/app/types/ui/form_components/inputContainers.type";
import { FieldError, FieldErrors, Path } from "react-hook-form";

export default function HookFormInputContainerWithDeleteBtn<T extends Record<string, any>>({
	label,
	className = {},
	name,
	register,
	errors,
	registerOptions,
	type = "text",

	fieldKey = "value",
	index,
	handleFunction,
}: HookFormInputContainerWithDeleteBtnProps<T>) {
	const inputId = index !== undefined ? `${name}_${index}` : name;

	const error = errors[name] as FieldError | undefined;
	const arrayError = errors[name] as FieldErrors<T> | undefined;
	const errorMessage =
		index !== undefined
			? ((arrayError as any)?.[index]?.[fieldKey].message as string)
			: error?.message;

	const registerName = index !== undefined ? (`${name}.${index}.value` as Path<T>) : name;

	return (
		<div className={`${styles.inputContainer} ${className?.inputContainer || ""}`}>
			<div className={`${styles.buttonContainer} ${className?.buttonContainer || ""}`}>
				<label
					className={`inputLabel ${className?.inputLabel || ""}`}
					htmlFor={inputId}
				>
					{label}
				</label>
				{index !== undefined && index > 0 && (
					<button onClick={handleFunction} className={`btn blue sm`} type="button">
						Видалити
					</button>
				)}
			</div>

			<input
				className={`button
                    ${styles.input}
                    ${className?.input || ""}
                    ${(errorMessage && "wrong") || ""}`}
				id={inputId}
				type={type}
				{...register(registerName, registerOptions)}
			/>
			{errorMessage && (
				<p className={`${styles.error} ${className?.error || ""}`}>{errorMessage}</p>
			)}
		</div>
	);
}
