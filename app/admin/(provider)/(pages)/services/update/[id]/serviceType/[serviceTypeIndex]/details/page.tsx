"use client";

import NotFoundFallback from "@/app/admin/(provider)/ui/NotFoundFallback/NotFoundFallback";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { useParams } from "next/navigation";
import React from "react";
import DetailsForm from "@/app/admin/(provider)/ui/Forms/details/DetailsForm";
import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import { RightArrow } from "@/app/common_ui/images/RightArrow";

export default function page() {
	const { services } = useAppSelector((state: RootState) => state.services);

	const { id, serviceTypeIndex } = useParams<{
		id: string;
		serviceTypeIndex: string;
	}>();
	const service = services.find((service) => `${service.id}` === id);

	return (
		<div>
			<div className="titleContainerWithReturnBtn">
				<p className={`title left md`}>Редактор послуги</p>
				<SafeLink className="btn blue md returnBtn" href="./">
					Повернутись до виду послуг
					<RightArrow />
				</SafeLink>
			</div>

			{service?.serviceTypes?.[+serviceTypeIndex] ? (
				<DetailsForm
					titles={true}
					paragraphs={true}
					quotes={true}
					lists={true}
					images={true}
					orderSliceName="serviceTypeUpdateDetailsOrder"
				/>
			) : (
				<NotFoundFallback />
			)}
		</div>
	);
}
