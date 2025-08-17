import React from "react";
import styles from "./BasicInputContainerHookForm.module.scss";
import { HookFormInputContainerBasicProps } from "@/app/types/ui/form_components/inputContainers.type";

export default function BasicInputContainerHookForm<T extends Record<string, any>>({
	label,
	className,
	name,
	errors,
	children,
}: HookFormInputContainerBasicProps<T>) {
	const error = errors[name];

	return (
		<div
			className={`${styles.inputContainer} ${className?.inputContainer || ""}`}
		>
			<label
				className={`inputLabel ${className?.inputLabel || ""}`}
				htmlFor={name}
			>
				{label}
			</label>
			{children}
			{error && (
				<p className={`${styles.error} ${className?.error || ""}`}>
					{error.message as string}
				</p>
			)}
		</div>
	);
}
