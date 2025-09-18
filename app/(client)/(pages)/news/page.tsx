import styles from "@/app/(client)/(pages)/news/page.module.scss";
import { NewsCard } from "@/app/(client)/ui/News/NewsCard/NewsCard";
import { fetchNewsCards } from "@/app/services/server/fetchData.service";
import React from "react";

export default async function AboutUs() {
	const news = await fetchNewsCards();
	console.log("news", news);

	return (
		<div className={"page"}>
			<section className={`section ${styles.heroSection}`}>
				<h1 className={"title lg"}>Новини</h1>
				<p>Будьте в курсі останніх подій нашого центру</p>
			</section>
			{!news.length ? (
				<p className={"title lg"}>Новини відсутні</p>
			) : (
				<>
					<section className="news">NEWS Carousel</section>
					<section className={`container section`}>
						<h2 className={"title left lg"}>Інші новини</h2>
						<p>
							Перегляньте архів новин нашого центру та дізнайтеся про важливі
							події та оновлення, які відбулися раніше.
						</p>
						<div className={styles.cardsContainer}>
							{news.map((data) => (
								<NewsCard news={data} key={data.id} />
							))}
						</div>
					</section>
				</>
			)}
		</div>
	);
}
