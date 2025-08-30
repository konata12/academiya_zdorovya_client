"use client";

import { AboutTreatment } from "@/app/types/data/about_treatment.type";
import { use } from "react";
import styles from "./WhatWeTreatHomeLists.module.scss";
import WhatWeTreatHomeList from "@/app/(client)/ui/Home/WhatWeTreatHomeList/WhatWeTreatHomeList/WhatWeTreatHomeList";

export default function WhatWeTreatHomeLists({
	whatWeTreatList,
}: {
	whatWeTreatList: Promise<AboutTreatment[]>;
}) {
	const list = use(whatWeTreatList);

	return (
		<div className={styles.container}>
			{list.map((item) => {
				return <WhatWeTreatHomeList data={item} key={item.id} />;
			})}
		</div>
	);
}
