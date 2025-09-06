import styles from "./page.module.scss";

export default function ContactUs() {
	return (
		<div className={"page"}>
			<section className={`section ${styles.heroSection}`}>
				<h1 className={"title lg"}>Зв'яжіться з нами</h1>
				<p>
					Заповніть базову інформацію або зателефонуйте на гарячу лінію, щоб
					записатись на прийом
				</p>
			</section>
		</div>
	);
}
