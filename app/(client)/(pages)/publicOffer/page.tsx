import DetailsData from "@/app/common_ui/DetailsData/DetailsData";
import { fetchLegalInfo } from "@/app/services/server/fetchData.service";
import React from "react";
import styles from "./page.module.scss";

export default async function PrivacyPolicy() {
	const publicOfferData = await fetchLegalInfo("publicOffer");

	return (
		<div className={`page ${styles.page}`}>
			<section className={`section container`}>
				<h1 className={`title lg ${styles.title}`}>Публічна оферта</h1>
				<DetailsData data={publicOfferData} isLegalInfo={true} />
			</section>
		</div>
	);
}
