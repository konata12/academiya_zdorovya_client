import styles from "./PlusMinusCheckbox.module.scss";
import React from "react";
import { CheckboxProps } from "@/app/types/ui/form_components/form_basic";

export default function PlusMinusCheckbox({
	handleFunction,
	isChecked,
	elemId,
	className,
	...props
}: CheckboxProps) {
	return (
		<label className={`${styles.checkbox} ${className?.label || ""}`}>
			<input
				className={className?.input || ""}
				checked={isChecked}
				onChange={handleFunction}
				type="checkbox"
				id={elemId}
				aria-label={isChecked ? "Close" : "Open"}
				{...props}
			/>
			<span className={className?.span || ""}>
				<svg
					className={styles.svg}
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 18 18"
					fill="none"
				>
					<path
						className={styles.hor}
						d="M2 10C0.8954 10 0 9.5523 0 9C0 8.4477 0.8954 8 2 8H16C17.1046 8 18 8.4477 18 9C18 9.5523 17.1046 10 16 10H2Z"
						fill="none"
					/>

					<path
						className={styles.ver}
						d="M8 2C8 0.8954 8.4477 0 9 0C9.5523 0 10 0.8954 10 2V16C10 17.1046 9.5523 18 9 18C8.4477 18 8 17.1046 8 16V2Z"
						fill="none"
					/>
				</svg>
			</span>
		</label>
	);
}
