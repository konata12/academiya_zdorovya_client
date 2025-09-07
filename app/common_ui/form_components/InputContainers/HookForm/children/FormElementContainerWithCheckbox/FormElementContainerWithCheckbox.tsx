import React from "react";
import styles from "./FormElementContainerWithCheckbox.module.scss";
import Checkbox from "@/app/admin/(provider)/ui/Checkbox/Checkbox";
import { FromElementContainerWithCheckboxProps } from "@/app/types/ui/form_components/inputContainers.type";
import AnimatePresenceWithDynamicHeight from "@/app/common_ui/animated_components/AnimatePresenseWrapper/AnimatePresenseWithDynamicHeight/AnimatePresenceWithDynamicHeight";

export default function FormElementContainerWithCheckbox({
	children,
	label,
	className = {},
	checkboxId,

	handleFunction,
	isChecked,
	dependency,
}: FromElementContainerWithCheckboxProps) {
	console.log(isChecked);
	return (
		<div className={`${styles.inputContainer} ${className?.inputContainer || ""}`}>
			<div
				className={`${styles.checkboxContainer} ${className?.checkboxContainer || ""}`}
			>
				<label
					className={`inputLabel ${className?.inputLabel || ""}`}
					htmlFor={checkboxId}
				>
					{label}
				</label>
				<Checkbox
					handleFunction={handleFunction}
					isChecked={isChecked}
					elemId={checkboxId}
				/>
			</div>

			<AnimatePresenceWithDynamicHeight
				childrenIsRendered={isChecked}
				dependency={dependency}
				className={{
					absoluteContainer: styles.absoluteContainer,
				}}
			>
				{children}
			</AnimatePresenceWithDynamicHeight>
		</div>
	);
}
