"use client";

import React from "react";
import styles from "./page.module.scss";
import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import UpdateNewsForm from "@/app/admin/(provider)/ui/Forms/news/update/UpdateNewsForm";
import { RightArrow } from "@/app/common_ui/images/RightArrow";

export default function page() {
	return (
		<div className={styles.newsUpdateFormPage}>
			<div className="titleContainerWithReturnBtn">
				<p className={`title left md`}>Редагувати новину</p>
				<SafeLink className="btn blue md returnBtn" href="/admin/news">
					Повернутись до новин
					<RightArrow />
				</SafeLink>
			</div>
			<UpdateNewsForm />
		</div>
	);
}
