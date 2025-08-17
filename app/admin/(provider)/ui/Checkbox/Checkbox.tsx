import React from "react";
import styles from "./Checkbox.module.scss";
import { CheckboxProps } from "@/app/types/ui/form_components/form_basic";

export default function Checkbox({
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
				{...props}
			/>
			<span className={className?.span || ""}>
				<i className={className?.i || ""}></i>
			</span>
		</label>
	);
}
