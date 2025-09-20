import React from "react";
import styles from "./DetailsDataQuote.module.scss";

export function DetailsDataQuote({ text, author }: { text: string; author: string }) {
	return (
		<div className={styles.quote}>
			<p className={styles.text}>"{text}"</p>
			<p className={styles.author}>{author}</p>
			<div className={styles.sideLine}></div>
		</div>
	);
}
