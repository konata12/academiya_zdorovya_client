import { HookFormInputContainerProps } from "@/app/types/ui/form_components/inputContainers.type";
import React from "react";
import styles from "./BasicInputContainerHookForm.module.scss";

export default function BasicInputContainerHookForm<T extends Record<string, any>>({
	register,
	registerOptions,
	className,
	name,
	placeHolder,
	type = "text",
	errors,
}: HookFormInputContainerProps<T>) {
	const error = errors[name];

	return (
		<div className={`${styles.inputContainer} ${className?.inputContainer || ""}`}>
			<input
				className={`button ${(error && "wrong") || ""} ${className?.input || ""}`}
				{...register(name, registerOptions)}
				placeholder={placeHolder}
				type={type}
				id={name}
			/>
			{error && (
				<p className={`${styles.error} ${className?.error || ""}`}>
					{error.message as string}
				</p>
			)}
		</div>
	);
}
