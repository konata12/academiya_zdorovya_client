import React from "react";
import styles from "./page.module.scss";
import UpdateAboutTreatmentForm from "@/app/admin/(provider)/ui/Forms/aboutTreatment/update/UpdateAboutTreatmentForm";

export default function page() {
	return (
		<div>
			<div className={styles.container}>
				<p className={`title left md ${styles.title}`}>Редагувати послугу</p>
				<UpdateAboutTreatmentForm />
			</div>
		</div>
	);
}
