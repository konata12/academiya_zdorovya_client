import BasicInputContainerWithLabelHookForm from "@/app/common_ui/form_components/InputContainers/HookForm/BasicInputContainerWithLabelHookForm";
import { HookFormInputContainerWithLabelProps } from "@/app/types/ui/form_components/inputContainers.type";
import styles from "./InputContainerHookForm.module.scss";
import React from "react";

export default function HookFormInputContainer<T extends Record<string, any>>({
	label,
	className = {},
	name,
	register,
	errors,
	registerOptions,
	type = "text",
}: HookFormInputContainerWithLabelProps<T>) {
	const error = errors[name];
	const { input = "", ...childrenClassName } = className;

	return (
		<>
			<BasicInputContainerWithLabelHookForm<T>
				label={label}
				className={childrenClassName}
				name={name}
				errors={errors}
			>
				<input
					className={`button ${(error && "wrong") || ""} ${styles.input} ${className?.input || ""}`}
					{...register(name, registerOptions)}
					type={type}
					id={name}
				/>
			</BasicInputContainerWithLabelHookForm>
		</>
	);
}
