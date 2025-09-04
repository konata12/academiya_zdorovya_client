"use client";

import React from "react";
import styles from "./page.module.scss";
import CreatePriceForm from "@/app/admin/(provider)/ui/Forms/pricesForms/create/CreatePriceForm";

export default function page() {
	return (
		<div className={styles.container}>
			<p className={`title left md ${styles.title}`}>Додати послугу з розцінками</p>
			<CreatePriceForm />
		</div>
	);
}
