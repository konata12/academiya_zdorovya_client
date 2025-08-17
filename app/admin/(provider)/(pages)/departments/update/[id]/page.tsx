"use client";

import styles from "./page.module.scss";
import UpdateDepartmentForm from "@/app/admin/(provider)/ui/Forms/depatrments/update/UpdateDepartmentsForm";

export default function UpdateDepartment() {
	return (
		<div className={styles.container}>
			<p className={`title left md ${styles.title}`}>Редагувати відділення</p>
			<UpdateDepartmentForm />
		</div>
	);
}
