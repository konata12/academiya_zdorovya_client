import BasicInputContainer from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/BasicInputContainer";
import type { InputContainer } from "@/app/types/ui/form_components/inputContainers.type";
import styles from "./InputContainer.module.scss";

export default function InputContainer({
	label,
	inputId,
	error,
	value = "",
	className,
	type = "text",
	changeEvent,
}: InputContainer) {
	const errorForStyle = error && error.message;

	return (
		<BasicInputContainer
			label={label}
			inputId={inputId}
			className={className}
			error={error}
		>
			<input
				className={`button ${(errorForStyle && "wrong") || ""} ${styles.input} ${className?.input || ""}`}
				id={inputId}
				type={type}
				onChange={changeEvent}
				value={value}
			/>
		</BasicInputContainer>
	);
}
