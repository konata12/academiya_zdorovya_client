import styles from "./SvgIcon.module.scss";

export function SvgIcon({
	className = "",
	children,
}: Readonly<{
	className?: string;
	children: React.ReactNode;
}>) {
	return <div className={`${styles.icon} ${className}`}>{children}</div>;
}
