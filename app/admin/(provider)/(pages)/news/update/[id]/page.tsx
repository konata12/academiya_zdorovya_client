"use client";

import React from "react";
import styles from "./page.module.scss";
import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import UpdateNewsForm from "@/app/admin/(provider)/ui/Forms/news/update/UpdateNewsForm";
export default function page() {
	return (
		<div className={styles.newsUpdateFormPage}>
			<div className={styles.titleContainer}>
				<p className={`title left md`}>Редагувати новину</p>
				<SafeLink className="btn blue md" href="/admin/news">
					Повернутись до новин
				</SafeLink>
			</div>
			<UpdateNewsForm />
		</div>
	);
}
