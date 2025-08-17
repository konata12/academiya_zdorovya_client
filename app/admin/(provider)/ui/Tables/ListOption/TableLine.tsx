import styles from "./TableLine.module.scss";

export default function TableLine({
	children,
	id,
}: Readonly<{
	children: React.ReactNode;
	id?: number;
}>) {
	return <div className={styles.option}>{children}</div>;
}
