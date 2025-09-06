import styles from "@/app/(client)/(pages)/news/page.module.scss";

export default function AboutUs() {
	return (
		<div className={"page"}>
			<section className={`section ${styles.heroSection}`}>
				<h1 className={"title lg"}>Новини</h1>
				<p>Будьте в курсі останніх подій нашого центру</p>
			</section>
		</div>
	);
}
