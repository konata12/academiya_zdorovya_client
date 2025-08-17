import styles from "./ErrorWrapper.module.scss";

interface ErrorWrapperProps {
	error?: string;
	children: React.ReactNode;
	style?: {
		errorWrapper?: React.CSSProperties;
		error?: React.CSSProperties;
	};
	className?: {
		errorWrapper?: string;
		error?: string;
	};
}

export function ErrorWrapper({
	error,
	children,
	style,
	className,
}: ErrorWrapperProps) {
	return (
		<div
			style={style?.errorWrapper}
			className={`${styles.errorWrapper} ${(error && styles.wrong) || ""} ${className?.errorWrapper || ""}`}
		>
			{error && (
				<p
					style={style?.error}
					className={`${styles.error} ${className?.error || ""}`}
				>
					{error}
				</p>
			)}

			{children}
		</div>
	);
}
