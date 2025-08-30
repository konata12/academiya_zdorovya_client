import styles from "./WhatWeTreatHomeListsFallback.module.scss";

export default function WhatWeTreatHomeListsFallback() {
	return (
		<div className={styles.container}>
			{Array.from({ length: 4 }).map((_, i) => (
				<div key={i}></div>
			))}
		</div>
	);
}
