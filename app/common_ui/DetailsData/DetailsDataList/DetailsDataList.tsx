import styles from "./DetailsDataList.module.scss";

export function DetailsDataList({
	numerable,
	options,
}: {
	numerable: boolean;
	options: string[];
}) {
	return (
		<>
			{numerable ? (
				<ol className={styles.list}>
					{options.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ol>
			) : (
				<ul className={styles.list}>
					{options.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			)}
		</>
	);
}
