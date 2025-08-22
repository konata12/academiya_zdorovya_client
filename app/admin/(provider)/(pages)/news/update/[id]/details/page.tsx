"use client";

import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import React from "react";
import DetailsForm from "@/app/admin/(provider)/ui/Forms/details/DetailsForm";
import { usePathname } from "next/navigation";
import { RightArrow } from "@/app/common_ui/images/RightArrow";

export default function page() {
	const pathname = usePathname();
	const linkBackURL = pathname
		.split("/")
		.slice(0, pathname.split("/").length - 1)
		.join("/");

	return (
		<div>
			<div className="titleContainerWithReturnBtn">
				<p className={`title left md`}>Редактор новини</p>
				<SafeLink className="btn blue md returnBtn" href={linkBackURL}>
					Повернутись до створення
					<RightArrow />
				</SafeLink>
			</div>

			<DetailsForm
				titles={true}
				paragraphs={true}
				quotes={true}
				lists={true}
				images={true}
				orderSliceName="newsUpdateDetailsOrder"
			/>
		</div>
	);
}
