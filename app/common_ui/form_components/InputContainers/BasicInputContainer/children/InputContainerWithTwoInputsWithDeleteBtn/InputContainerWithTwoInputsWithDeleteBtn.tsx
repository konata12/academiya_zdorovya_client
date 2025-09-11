import { InputContainerWithTwoInputsWithDeleteBtnProps } from "@/app/types/ui/form_components/inputContainers.type";
import styles from "./InputContainerWithTwoInputsWithDeleteBtn.module.scss";

export default function InputContainerWithTwoInputsWithDeleteBtn({
	labelOne,
	labelTwo,
	inputIdOne,
	inputIdTwo,
	valueOne,
	valueTwo,
	index,
	typeOne = "text",
	typeTwo = "text",
	errorOne,
	errorTwo,
	className,

	handleDelete,
	changeEventOne,
	changeEventTwo,
}: InputContainerWithTwoInputsWithDeleteBtnProps) {
	const firstId = `${inputIdOne}_${index}`;
	const secondId = `${inputIdTwo}_${index}`;

	return (
		<div
			className={`${styles.inputContainer} ${className?.firstInput?.inputContainer || ""}`}
		>
			<div className={`${styles.buttonContainer} ${className?.buttonContainer || ""}`}>
				<label
					className={`inputLabel ${className?.firstInput?.inputLabel || ""}`}
					htmlFor={firstId}
				>
					{labelOne}
				</label>
				{index !== undefined && index > 0 && (
					<button onClick={handleDelete} className={`btn blue sm`} type="button">
						Видалити
					</button>
				)}
			</div>
			<div className={styles.firstInputContainer}>
				<input
					className={`button ${(errorOne?.message && "wrong") || ""} ${styles.input} ${className?.firstInput?.input || ""}`}
					id={firstId}
					value={valueOne}
					type={typeOne}
					onChange={changeEventOne}
				/>
				{errorOne && (
					<p className={`${styles.error} ${className?.firstInput?.error || ""}`}>
						{errorOne.message}
					</p>
				)}
			</div>

			<label
				className={`inputLabel ${className?.secondInput?.inputLabel || ""}`}
				htmlFor={secondId}
			>
				{labelTwo}
			</label>
			<input
				className={`button ${(errorTwo?.message && "wrong") || ""} ${styles.input} ${className?.secondInput?.input || ""}`}
				id={secondId}
				value={valueTwo}
				type={typeTwo}
				onChange={changeEventTwo}
			/>
			{errorTwo && (
				<p className={`${styles.error} ${className?.secondInput?.error || ""}`}>
					{errorTwo.message}
				</p>
			)}
		</div>
	);
}
