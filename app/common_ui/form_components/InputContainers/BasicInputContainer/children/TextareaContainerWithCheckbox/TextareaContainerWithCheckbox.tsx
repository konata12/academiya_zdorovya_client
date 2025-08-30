import AnimatePresenceWithDynamicHeight from "@/app/common_ui/animated_components/AnimatePresenseWrapper/AnimatePresenseWithDynamicHeight/AnimatePresenceWithDynamicHeight";
import AutoResizingTextarea from "@/app/common_ui/form_components/basic_components/AutoResizingTextarea/AutoResizingTextarea";
import styles from "./TextareaContainerWithCheckbox.module.scss";
import { TextareaContainerWithCheckboxProps } from "@/app/types/ui/form_components/inputContainers.type";
import Checkbox from "@/app/admin/(provider)/ui/Checkbox/Checkbox";

export default function TextareaContainerWithCheckbox({
	label,
	inputId,
	value,
	isChecked,
	error,
	className,
	minRows,
	maxRows,

	handleCheckbox,
	changeEvent,
}: TextareaContainerWithCheckboxProps) {
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
				<AutoResizingTextarea
					className={`input ${(error?.message && "wrong") || ""} ${styles.input} ${className?.input || ""} ${isChecked ? styles.active : ""}`}
					id={inputId}
					minRows={minRows}
					maxRows={maxRows}
					onChange={changeEvent}
					value={value}
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
