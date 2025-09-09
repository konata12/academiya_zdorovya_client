import DetailsData from "@/app/common_ui/DetailsData/DetailsData";
import { fetchLegalInfo } from "@/app/services/server/fetchData.service";
import React from "react";
import styles from "./page.module.scss";

export default async function PrivacyPolicy() {
	const privacyPolicyData = await fetchLegalInfo("privacyPolicy");

	return (
		<div className={`page ${styles.page}`}>
			<section className={`section container`}>
				<h1 className={`title lg ${styles.title}`}>Політика конфіденційності</h1>
				<DetailsData data={privacyPolicyData} isLegalInfo={true} />
			</section>
		</div>
	);
}
