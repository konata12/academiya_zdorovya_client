import { InputContainerWithDeleteBtnProps } from "@/app/types/ui/form_components/inputContainers.type";
import styles from "./InputContainerWithDeleteBtn.module.scss";

export default function InputContainerWithDeleteBtn({
	label,
	inputId,
	value,
	index,
	type = "text",
	error,
	className,

	handleDelete,
	changeEvent,
}: InputContainerWithDeleteBtnProps) {
	const id = `${inputId}_${index}`;

	return (
		<div className={`${styles.inputContainer} ${className?.inputContainer || ""}`}>
			<div className={`${styles.buttonContainer} ${className?.buttonContainer || ""}`}>
				<label className={`inputLabel ${className?.inputLabel || ""}`} htmlFor={id}>
					{label}
				</label>
				{index !== undefined && index > 0 && (
					<button onClick={handleDelete} className={`btn blue sm`} type="button">
						Видалити
					</button>
				)}
			</div>

			<input
				className={`button ${(error?.message && "wrong") || ""} ${styles.input} ${className?.input || ""}`}
				id={id}
				value={value}
				type={type}
				onChange={changeEvent}
			/>

			{error && (
				<p className={`${styles.error} ${className?.error || ""}`}>{error.message}</p>
			)}
		</div>
	);
}
