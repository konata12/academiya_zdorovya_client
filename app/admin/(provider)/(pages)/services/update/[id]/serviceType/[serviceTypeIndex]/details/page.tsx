"use client";

import React from "react";
import styles from "./page.module.scss";
import DetailsForm from "@/app/admin/(provider)/ui/Forms/details/DetailsForm";
import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";

export default function page() {
	return (
		<div>
			<div className={styles.titleContainer}>
				<p className={`title left md`}>Редактор послуги</p>
				<SafeLink className="btn blue md" href="./">
					Повернутись до виду послуг
				</SafeLink>
			</div>

			<DetailsForm
				titles={true}
				paragraphs={true}
				quotes={true}
				lists={true}
				images={true}
				orderSliceName="serviceTypeUpdateDetailsOrder"
			/>
		</div>
	);
}
