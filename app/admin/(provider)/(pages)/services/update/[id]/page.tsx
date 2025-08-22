"use client";

import React from "react";
import styles from "./page.module.scss";
import UpdateServiceForm from "@/app/admin/(provider)/ui/Forms/services/update/UpdateServicesForm";

export default function page() {
	return (
		<div className={styles.FormPage}>
			<div className="titleContainerWithReturnBtn">
				<p className={`title left md`}>Редагувати послугу</p>
			</div>
			<UpdateServiceForm />
		</div>
	);
}
