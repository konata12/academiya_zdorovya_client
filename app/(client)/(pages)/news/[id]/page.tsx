import { DetailsBanner } from "@/app/(client)/ui/common/sections/DetailsBanner/DetailsBanner";
import { months } from "@/app/(client)/ui/News/NewsCard/NewsCard";
import DetailsData from "@/app/common_ui/DetailsData/DetailsData";
import { RightArrow } from "@/app/common_ui/images/RightArrow";
import { fetchOneNews } from "@/app/services/server/fetchData.service";
import Link from "next/link";
import React from "react";
import styles from "./page.module.scss";

export default async function NewsDetails({ params }: { params: { id: string } }) {
	const newsData = await fetchOneNews(params.id);
	const date = new Date(newsData.createdAt);
	console.log("newsData", newsData);

	return (
		<article className={`page container ${styles.page}`}>
			<DetailsBanner
				title={newsData.title}
				description={newsData.description}
				imageSrc={newsData.backgroundImg}
			>
				<p className={styles.date}>
					{`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}
				</p>
			</DetailsBanner>
			<DetailsData data={newsData.details} />
			<Link className={`btn blue md returnBtn ${styles.returnBtn}`} href="/news">
				Повернутись до новин
				<RightArrow />
			</Link>
		</article>
	);
}
