import React from "react";
import styles from "./DetailsDataQuote.module.scss";

export function DetailsDataQuote({ text, author }: { text: string; author: string }) {
	return (
		<div className={styles.quote}>
			<blockquote className={styles.text}>"{text}"</blockquote>
			<cite className={styles.author}>{author}</cite>
			<div className={styles.sideLine}></div>
		</div>
	);
}
