import React from "react";
import styles from "./InputContainerWithCheckboxHookForm.module.scss";
import Checkbox from "@/app/admin/(provider)/ui/Checkbox/Checkbox";
import { HookFormInputContainerWithCheckboxProps } from "@/app/types/ui/form_components/inputContainers.type";
import AnimatePresenceWithDynamicHeight from "@/app/common_ui/animated_components/AnimatePresenseWrapper/AnimatePresenseWithDynamicHeight/AnimatePresenceWithDynamicHeight";

export default function HookFormInputContainerWithCheckbox<T extends Record<string, any>>({
	label,
	className = {},
	name,
	register,
	errors,
	registerOptions,
	type = "text",

	handleFunction,
	isChecked,
}: HookFormInputContainerWithCheckboxProps<T>) {
	const error = errors[name];

	return (
		<div className={`${styles.inputContainer} ${className?.inputContainer || ""}`}>
			<div
				className={`${styles.checkboxContainer} ${className?.checkboxContainer || ""}`}
			>
				<label className={`inputLabel ${className?.inputLabel || ""}`} htmlFor={name}>
					{label}
				</label>
				<Checkbox
					handleFunction={handleFunction}
					isChecked={isChecked}
					elemId={name}
				/>
			</div>

			<AnimatePresenceWithDynamicHeight
				childrenIsRendered={isChecked}
				className={{
					absoluteContainer: styles.absoluteContainer,
				}}
			>
				<input
					className={`input
                    ${(error && "wrong") || ""}
                    ${styles.input}
                    ${className?.input || ""}
                    ${isChecked ? styles.active : ""}`}
					key={name}
					type={type}
					{...register(name, registerOptions)}
				/>

				{error && (
					<p className={`${styles.error} ${className?.error || ""}`}>
						{error.message as string}
					</p>
				)}
			</AnimatePresenceWithDynamicHeight>
		</div>
	);
}
