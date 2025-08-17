import styles from "./ModalWindow.module.scss";

export interface ModalWindowProps {
	children?: React.ReactNode;
	title: string;
}

export default function ModalWindow({ children, title }: ModalWindowProps) {
	return (
		<div className={styles.container}>
			<div className={styles.window}>
				<p className={styles.title}>{title}</p>
				{children}
			</div>
		</div>
	);
}
