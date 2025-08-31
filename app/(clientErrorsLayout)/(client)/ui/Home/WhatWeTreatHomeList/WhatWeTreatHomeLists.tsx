"use client";

import { AboutTreatment } from "@/app/types/data/about_treatment.type";
import { use } from "react";
import styles from "./WhatWeTreatHomeLists.module.scss";
import DetailsDropdownList from "@/app/common_ui/animated_components/DetailsDropdownList/DetailsDropdownList";

export default function WhatWeTreatHomeLists({
	whatWeTreatList,
}: {
	whatWeTreatList: Promise<AboutTreatment[]>;
}) {
	const list = use(whatWeTreatList);

	return (
		<div className={styles.container}>
			{list.map((item) => {
				return (
					<DetailsDropdownList
						title={item.title}
						text={item.treatmentTypes}
						key={item.id}
					/>
				);
			})}
		</div>
	);
}
