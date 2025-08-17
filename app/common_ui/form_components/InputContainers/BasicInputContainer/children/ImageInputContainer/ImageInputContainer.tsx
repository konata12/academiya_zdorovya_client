import type { ImageInputContainer } from "@/app/types/ui/form_components/inputContainers.type";

export function ImageInputContainer({
	label = "Завантажити",
	inputId,
	changeEvent,
	children,
	className,
}: ImageInputContainer) {
	return (
		<>
			<input
				className={className?.input || ""}
				id={inputId}
				type="file"
				hidden
				onChange={changeEvent}
			/>
			<label
				className={`btn blue sm ${className?.label || ""}`}
				htmlFor={inputId}
			>
				{label}
			</label>

			{children}
		</>
	);
}
