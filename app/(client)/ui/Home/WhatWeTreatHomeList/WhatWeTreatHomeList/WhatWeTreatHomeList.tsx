import { AboutTreatment } from "@/app/types/data/about_treatment.type";
import { useState } from "react";
import styles from "./WhatWeTreatHomeList.module.scss";
import PlusMinusCheckbox from "@/app/common_ui/checkboxes/PlusMinusCheckbox/PlusMinusCheckbox";
import AnimatePresenceWithDynamicHeight from "@/app/common_ui/animated_components/AnimatePresenseWrapper/AnimatePresenseWithDynamicHeight/AnimatePresenceWithDynamicHeight";

export default function WhatWeTreatHomeList({ data }: { data: AboutTreatment }) {
	const [open, setOpen] = useState(false);

	return (
		<article className={styles.container}>
			<div className={styles.labelContainer}>
				<h3>{data.title}</h3>
				<PlusMinusCheckbox
					isChecked={open}
					handleFunction={(e) => setOpen(e.target.checked)}
				/>
			</div>

			<AnimatePresenceWithDynamicHeight childrenIsRendered={open}>
				<ul className={`${styles.list}`}>
					{data.treatmentTypes.map((type, i) => {
						return <li key={i}>{type}</li>;
					})}
				</ul>
			</AnimatePresenceWithDynamicHeight>
		</article>
	);
}
