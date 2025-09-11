import { HookFormInputContainerWithLabelBasicProps } from "@/app/types/ui/form_components/inputContainers.type";
import React from "react";
import styles from "./BasicInputContainerWithLabelHookForm.module.scss";

export default function BasicInputContainerWithLabelHookForm<T extends Record<string, any>>({
	label,
	className,
	name,
	errors,
	children,
}: HookFormInputContainerWithLabelBasicProps<T>) {
	const error = errors[name];

	return (
		<div className={`${styles.inputContainer} ${className?.inputContainer || ""}`}>
			<label className={`inputLabel ${className?.inputLabel || ""}`} htmlFor={name}>
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
