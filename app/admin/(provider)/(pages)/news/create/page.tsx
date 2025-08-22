"use client";

import React from "react";
import styles from "./page.module.scss";
import CreateNewsForm from "@/app/admin/(provider)/ui/Forms/news/create/CreateNewsForm";
import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import { RightArrow } from "@/app/common_ui/images/RightArrow";

export default function page() {
	return (
		<div className={styles.newsCreateFormPage}>
			<div className="titleContainerWithReturnBtn">
				<p className={`title left md`}>Додати новину</p>
				<SafeLink className="btn blue md returnBtn" href="/admin/news">
					Повернутись до новин
					<RightArrow />
				</SafeLink>
			</div>
			<CreateNewsForm />
		</div>
	);
}
