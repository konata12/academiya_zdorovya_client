import { FAQ } from "@/app/(client)/ui/common/sections/FAQ/FAQ";
import { OurTeam } from "@/app/(client)/ui/common/sections/OurTeam/OurTeam";
import { Reviews } from "@/app/(client)/ui/common/sections/Reviews/Reviews";
import React from "react";
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
			<section>SERVICES</section>
			<section>What we treat</section>
			<OurTeam />
			<Reviews />
			<FAQ />
		</div>
	);
}
