import styles from "./NotFoundFallback.module.scss";

export default function NotFoundFallback({ message }: { message?: string }) {
	return (
		<div className={styles.container}>{message ? message : "Така сторінка не існує"}</div>
	);
}
