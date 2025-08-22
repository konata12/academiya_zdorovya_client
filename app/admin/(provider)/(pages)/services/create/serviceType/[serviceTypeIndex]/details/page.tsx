"use client";

import React from "react";
import DetailsForm from "@/app/admin/(provider)/ui/Forms/details/DetailsForm";
import Link from "next/link";
import { RightArrow } from "@/app/common_ui/images/RightArrow";

export default function page() {
	return (
		<div>
			<div className="titleContainerWithReturnBtn">
				<p className={`title left md`}>Редактор послуги</p>
				<Link className="btn blue md returnBtn" href="./">
					Повернутись до виду послуг
					<RightArrow />
				</Link>
			</div>

			<DetailsForm
				titles={true}
				paragraphs={true}
				quotes={true}
				lists={true}
				images={true}
				orderSliceName="serviceTypeCreateDetailsOrder"
			/>
		</div>
	);
}
