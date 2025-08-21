"use client";

import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import React from "react";
import styles from "./page.module.scss";
import DetailsForm from "@/app/admin/(provider)/ui/Forms/details/DetailsForm";
import { RightArrow } from "@/app/common_ui/images/RightArrow";

export default function page() {
	return (
		<div>
			<div className={styles.titleContainer}>
				<p className={`title left md`}>Політика конфіденційності</p>
				<SafeLink className="btn blue md backBtn" href="./">
					Назад
					<RightArrow />
				</SafeLink>
			</div>

			<DetailsForm
				titles={true}
				paragraphs={true}
				lists={true}
				orderSliceName="privacyPolicyUpdateDetailsOrder"
			/>
		</div>
	);
}
