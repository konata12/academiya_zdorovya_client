"use client";

import React from "react";
import styles from "./page.module.scss";
import UpdatePriceForm from "@/app/admin/(provider)/ui/Forms/pricesForms/update/UpdatePriceForm";

export default function page() {
	return (
		<div className={styles.container}>
			<p className={`title left md ${styles.title}`}>Редагувати послугу з розцінками</p>
			<UpdatePriceForm />
		</div>
	);
}
