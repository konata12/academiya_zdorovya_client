"use client";

import React from "react";
import styles from "./page.module.scss";
import ServiceTypeForm from "@/app/admin/(provider)/ui/Forms/services/serviceType/ServiceTypeForm";
import Link from "next/link";

export default function page() {
	return (
		<div className={styles.newsCreateFormPage}>
			<div className={styles.titleContainer}>
				<p className={`title left md`}>Додати вид послуги</p>
				<Link className="btn blue md" href="../">
					Повернутись до послуг
				</Link>
			</div>

			<ServiceTypeForm
				sliceName="serviceTypeCreateForm"
				detailsSliceName="serviceTypeCreateDetailsOrder"
			/>
		</div>
	);
}
