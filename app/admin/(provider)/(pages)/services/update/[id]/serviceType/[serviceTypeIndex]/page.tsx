"use client";

import React from "react";
import styles from "./page.module.scss";
import ServiceTypeForm from "@/app/admin/(provider)/ui/Forms/services/serviceType/ServiceTypeForm";
import Link from "next/link";
import { RightArrow } from "@/app/common_ui/images/RightArrow";

export default function page() {
	return (
		<div className={styles.newsCreateFormPage}>
			<div className="titleContainerWithReturnBtn">
				<p className={`title left md`}>Редагувати вид послуги</p>
				<Link className="btn blue md returnBtn" href="../">
					Повернутись до послуг
					<RightArrow />
				</Link>
			</div>

			<ServiceTypeForm
				sliceName="serviceTypeUpdateForm"
				detailsSliceName="serviceTypeUpdateDetailsOrder"
			/>
		</div>
	);
}
