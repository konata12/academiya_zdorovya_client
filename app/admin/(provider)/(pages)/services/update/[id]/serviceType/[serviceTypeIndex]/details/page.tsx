"use client";

import React from "react";
import DetailsForm from "@/app/admin/(provider)/ui/Forms/details/DetailsForm";
import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import { RightArrow } from "@/app/common_ui/images/RightArrow";

export default function page() {
	return (
		<div>
			<div className="titleContainerWithReturnBtn">
				<p className={`title left md`}>Редактор послуги</p>
				<SafeLink className="btn blue md returnBtn" href="./">
					Повернутись до виду послуг
					<RightArrow />
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
