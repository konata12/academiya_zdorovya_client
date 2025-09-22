import { ContactUsBtn } from "@/app/(client)/ui/common/buttons/ContactUsBtn/ContactUsBtn";
import { DetailsBanner } from "@/app/(client)/ui/common/sections/DetailsBanner/DetailsBanner";
import DetailsData from "@/app/common_ui/DetailsData/DetailsData";
import { RightArrow } from "@/app/common_ui/images/RightArrow";
import { fetchOneServiceType } from "@/app/services/server/fetchData.service";
import Link from "next/link";
import React from "react";
import styles from "./page.module.scss";

export default async function NewsDetails({ params }: { params: { serviceTypeId: string } }) {
	const serviceType = await fetchOneServiceType(params.serviceTypeId);

	return (
		<article className={`page container ${styles.page}`}>
			<DetailsBanner
				title={serviceType.title}
				description={serviceType.description}
				imageSrc={serviceType.backgroundImg}
			>
				<ContactUsBtn className={styles.btn} />
			</DetailsBanner>
			<DetailsData data={serviceType.details} />
			<Link className={`btn blue md returnBtn ${styles.returnBtn}`} href="/services">
				Повернутись до послуги
				<RightArrow />
			</Link>
		</article>
	);
}
