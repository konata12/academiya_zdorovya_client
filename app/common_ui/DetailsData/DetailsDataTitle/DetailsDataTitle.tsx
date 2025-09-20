import styles from "./DetailsDataTitle.module.scss";

export function DetailsDataTitle({ title }: { title: string }) {
	return <h3 className={styles.title}>{title}</h3>;
}
