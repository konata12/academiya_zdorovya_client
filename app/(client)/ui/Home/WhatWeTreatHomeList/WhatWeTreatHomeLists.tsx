import DetailsDropdownList from "@/app/common_ui/animated_components/DetailsDropdownList/DetailsDropdownList";
import { fetchWhatWeTreatsNoImages } from "@/app/services/server/fetchData.service";
import styles from "./WhatWeTreatHomeLists.module.scss";

export default async function WhatWeTreatHomeLists() {
	const list = await fetchWhatWeTreatsNoImages();

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
