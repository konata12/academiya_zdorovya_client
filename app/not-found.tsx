import Link from "next/link";
import { RightArrow } from "@/app/common_ui/images/RightArrow";
import React from "react";
import styles from "./not-found.module.scss";

export default function NotFound() {
	return (
		<div className={styles.page}>
			<p className={styles.code}>404</p>
			<p className={styles.shortDescription}>Сторінку не знайдено</p>
			<p className={styles.mainDescription}>
				Ця сторінка втрачена або її не існує, будь ласка, поверніться на головну
				сторінку
			</p>
			<Link className="btn blue md returnBtn" href="/">
				Повернутись до новин
				<RightArrow />
			</Link>
		</div>
	);
}
