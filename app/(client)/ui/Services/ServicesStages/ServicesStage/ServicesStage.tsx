import styles from "./ServicesStage.module.scss";

export interface ServicesStageProps {
	title: string;
	description: string;
}
export function ServicesStage({ title, description }: ServicesStageProps) {
	return (
		<div className={`${styles.link}`}>
			<h3 className={styles.title}>{title}</h3>
			<p className={styles.description}>{description}</p>
			<div className={styles.sideLine}></div>
		</div>
	);
}
