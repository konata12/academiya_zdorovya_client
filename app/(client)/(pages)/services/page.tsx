import styles from "./page.module.scss";

export default function AboutUs() {
	return (
		<div className={"page"}>
			<section className={`section ${styles.heroSection}`}>
				<h1 className={"title lg"}>Послуги</h1>
				<p>
					Перегляньте наші основні послуги, спрямовані на відновлення вашого здоров'я
				</p>
			</section>
		</div>
	);
}
