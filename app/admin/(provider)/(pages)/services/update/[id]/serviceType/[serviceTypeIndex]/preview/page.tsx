"use client";

import styles from "@/app/(client)/(pages)/news/[id]/page.module.scss";
import btnStyles from "@/app/(client)/(pages)/services/[id]/page.module.scss";
import { ContactUsBtn } from "@/app/(client)/ui/common/buttons/ContactUsBtn/ContactUsBtn";
import DetailsDataPreview from "@/app/common_ui/DetailsData/Preview/DetailsDataPreview";
import { DetailsBannerPreview } from "@/app/common_ui/sections/DetailsBanner/Preview/DetailsBannerPreview";
import { useGetImageUrlFromIndexedDBImage } from "@/app/utils/hooks/admin/indexedDB/useGetImageUrlFromIndexedDBImage";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import React from "react";

export default function NewsDetails() {
	const serviceTypeData = useAppSelector((state: RootState) => state.serviceTypeUpdateForm);
	const imageUrl = useGetImageUrlFromIndexedDBImage(
		serviceTypeData.backgroundImg,
		"service_update_images",
	);

	return (
		<article className={`page container ${styles.page}`}>
			<DetailsBannerPreview
				title={serviceTypeData.title}
				description={serviceTypeData.description}
				imageSrc={imageUrl}
			>
				<ContactUsBtn className={btnStyles.btn} />
			</DetailsBannerPreview>
			<DetailsDataPreview orderSliceName={"serviceTypeUpdateDetailsOrder"} />
		</article>
	);
}
