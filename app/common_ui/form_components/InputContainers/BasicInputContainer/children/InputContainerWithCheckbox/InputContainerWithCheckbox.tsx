import { InputContainerWithCheckboxProps } from "@/app/types/ui/form_components/inputContainers.type";
import styles from "./InputContainerWithCheckbox.module.scss";
import Checkbox from "@/app/admin/(provider)/ui/Checkbox/Checkbox";
import AnimatePresenceWithDynamicHeight from "@/app/common_ui/animated_components/AnimatePresenseWrapper/AnimatePresenseWithDynamicHeight/AnimatePresenceWithDynamicHeight";

export default function InputContainerWithCheckbox({
	label,
	inputId,
	value,
	type = "text",
	isChecked,
	error,
	className,

	handleCheckbox,
	changeEvent,
}: InputContainerWithCheckboxProps) {
	const checkboxId = `${inputId}_checkbox`;
	value = value || "";

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
					handleFunction={handleCheckbox}
					isChecked={isChecked}
					elemId={checkboxId}
				/>
			</div>

			<AnimatePresenceWithDynamicHeight
				childrenIsRendered={isChecked}
				className={{
					absoluteContainer: styles.absoluteContainer,
				}}
			>
				<input
					className={`button ${(error?.message && "wrong") || ""} ${styles.input} ${className?.input || ""} ${isChecked ? styles.active : ""}`}
					id={inputId}
					value={value}
					type={type}
					onChange={changeEvent}
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
