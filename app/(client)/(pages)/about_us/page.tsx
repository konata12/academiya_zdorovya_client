import styles from "./page.module.scss";

export default async function AboutUs() {
	return (
		<div className={"page"}>
			<section className={`section ${styles.heroSection}`}>
				<h1 className={"title lg"}>Про нас</h1>
				<p>Дізнайтеся більше про нашу місію, цінності та підхід</p>
			</section>
		</div>
	);
}
