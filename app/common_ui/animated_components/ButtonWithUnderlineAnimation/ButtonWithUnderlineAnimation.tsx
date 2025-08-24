import styles from "./ButtonWithUnderlineAnimation.module.scss";
import { ReactNode } from "react";

interface ButtonWithUnderlineAnimationProps {
	isActive: boolean;
	onClick: () => void;
	children?: ReactNode;
	className?: ButtonWithUnderlineAnimationStylesType;
}
interface ButtonWithUnderlineAnimationStylesType {
	link?: string;
	active?: string;
	btn?: string;
}

export default function ButtonWithUnderlineAnimation({
	isActive,
	onClick,
	children,
	className,
}: ButtonWithUnderlineAnimationProps) {
	const activeClassName = isActive ? `${styles.active} ${className?.active || ""}` : "";

	return (
		<div className={`${styles.link} ${activeClassName} ${className?.link || ""}`}>
			<button
				className={`${styles.btn} ${className?.btn || ""}`}
				type="button"
				onClick={onClick}
			>
				{children}
			</button>
		</div>
	);
}
