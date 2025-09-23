"use client";

import styles from "@/app/(client)/(pages)/news/[id]/page.module.scss";
import { months } from "@/app/(client)/ui/News/NewsCard/NewsCard";
import DetailsDataPreview from "@/app/common_ui/DetailsData/Preview/DetailsDataPreview";
import { DetailsBannerPreview } from "@/app/common_ui/sections/DetailsBanner/Preview/DetailsBannerPreview";
import { useGetImageUrlFromIndexedDBImage } from "@/app/utils/hooks/admin/indexedDB/useGetImageUrlFromIndexedDBImage";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import React from "react";

export default function NewsDetails() {
	const newsData = useAppSelector((state: RootState) => state.newsCreateForm);
	const imageUrl = useGetImageUrlFromIndexedDBImage(
		newsData.backgroundImg,
		"news_create_images",
	);
	const date = new Date(Date.now());

	return (
		<article className={`page container ${styles.page}`}>
			<DetailsBannerPreview
				title={newsData.title}
				description={newsData.description}
				imageSrc={imageUrl}
			>
				<p className={styles.date}>
					{`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}
				</p>
			</DetailsBannerPreview>
			<DetailsDataPreview orderSliceName={"newsCreateDetailsOrder"} />
		</article>
	);
}
