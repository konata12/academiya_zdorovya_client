import React from "react";
import styles from "./page.module.scss";

export default function AboutUs() {
	return (
		<div className={"page"}>
			<section className={`section ${styles.heroSection}`}>
				<h1 className={"title lg"}>Ціни на послуги</h1>
				<p>Ознайомтесь з вартістю реабілітаційних програм у нашому центрі</p>
			</section>
		</div>
	);
}
