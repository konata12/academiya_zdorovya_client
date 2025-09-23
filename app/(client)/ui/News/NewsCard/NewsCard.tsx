import { RightArrow } from "@/app/common_ui/images/RightArrow";
import { News } from "@/app/types/data/news.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./NewsCard.module.scss";

export const months = [
	"Січень",
	"Лютий",
	"Березень",
	"Квітень",
	"Травень",
	"Червень",
	"Липень",
	"Серпень",
	"Вересень",
	"Жовтень",
	"Листопад",
	"Грудень",
];

export function NewsCard({ news }: { news: News }) {
	const date = new Date(news.createdAt);
	return (
		<article className={styles.container}>
			<div className={styles.shadowContainer}>
				<div className={`${styles.imageContainer}`}>
					<Image
						className={styles.cardImage}
						src={news.backgroundImg}
						alt={"Заставка новини"}
						fill
						unoptimized={true}
					/>
				</div>
			</div>
			<div className={styles.text}>
				<p className={styles.date}>
					{`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}
				</p>
				<h5 className={styles.title}>{news.title}</h5>
				<p className={styles.description}>{news.description}</p>
				<Link
					href={`/news/${news.id}`}
					className={`btn blue md returnBtn ${styles.link}`}
				>
					Дізнатися більше
					<RightArrow />
				</Link>
			</div>
		</article>
	);
}
