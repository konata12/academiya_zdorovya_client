import { months } from "@/app/(client)/ui/News/NewsCard/NewsCard";
import DetailsData from "@/app/common_ui/DetailsData/DetailsData";
import { RightArrow } from "@/app/common_ui/images/RightArrow";
import { fetchOneNews } from "@/app/services/server/fetchData.service";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./page.module.scss";

export default async function NewsDetails({ params }: { params: { id: string } }) {
	const newsData = await fetchOneNews(params.id);
	const date = new Date(newsData.createdAt);
	console.log("newsData", newsData);

	return (
		<article className={`page container ${styles.page}`}>
			<div className={styles.bannerContainer}>
				<div className={styles.text}>
					<h1 className={styles.title}>{newsData.title}</h1>
					<p className={styles.description}>{newsData.description}</p>
				</div>

				<div className={styles.bannerShadow}>
					<div className={styles.banner}>
						<div className={styles.imageContainer}>
							<Image
								className={styles.image}
								src={newsData.backgroundImg}
								alt={"Новина"}
								fill
							/>
						</div>
						<p className={styles.date}>
							{`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}
						</p>
					</div>
				</div>
			</div>
			<DetailsData data={newsData.details} />
			<Link className={`btn blue md returnBtn ${styles.returnBtn}`} href="/news">
				Повернутись до новин
				<RightArrow />
			</Link>
		</article>
	);
}
