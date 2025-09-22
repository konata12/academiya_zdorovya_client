import AboutUsPageGoalsCards from "@/app/(client)/ui/AboutUs/AboutUsPageGoalsCards/AboutUsPageGoalsCards";
import { ContactUsBtn } from "@/app/(client)/ui/common/buttons/ContactUsBtn/ContactUsBtn";
import { NewsCarouselFetchContainer } from "@/app/(client)/ui/common/sections/NewsCarousel/NewsCarouselFetchContainer";
import { OurTeam } from "@/app/(client)/ui/common/sections/OurTeam/OurTeam";
import { Reviews } from "@/app/(client)/ui/common/sections/Reviews/Reviews";
import btnStyles from "@/app/(client)/ui/Home/DepartmentPhoneNumberBtn/DepartmentPhoneNumberBtn.module.scss";
import mainImg from "@/public/images/client/about_us_main.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./page.module.scss";

export default async function AboutUs() {
	return (
		<div className={"page"}>
			<section className={`section ${styles.heroSection}`}>
				<h1 className={"title lg"}>Про нас</h1>
				<p>Дізнайтеся більше про нашу місію, цінності та підхід</p>
			</section>
			<section className={`section container ${styles.descriptionSection}`}>
				{/*todo change to good quality picture and add box shadow*/}
				<div className={styles.img}>
					<Image src={mainImg} alt={"Our team"} />
				</div>
				<article>
					<h2 className={"title left lg"}>
						Команда професіоналів на шляху до повного відновлення{" "}
					</h2>
					<p>
						Академія Здоров'я — це місце, де головну роль відіграють люди: команда
						досвідчених лікарів, фізичних терапевтів та інших фахівців, які щиро
						дбають про ваше здоров’я. Кожен з нас тут, щоб підтримати Вас на шляху
						до одужання, надати професійну допомогу та створити комфортні умови для
						відновлення. Ми віримо, що запорукою успішної реабілітації є насамперед
						довіра, професіоналізм, розуміння та підтримка на кожному етапі
						відновлення.
					</p>
					<ContactUsBtn className={styles.btn} />
				</article>
			</section>
			<section className={`container section ${styles.goalsSection}`}>
				<h2 className={"title left lg"}>Наша мета та цінності</h2>
				<p>
					Відданість, професіоналізм, індивідуальний підхід та турбота про кожного
					пацієнта – основа нашої роботи.
				</p>
				<AboutUsPageGoalsCards />
			</section>
			<OurTeam />
			<Reviews />
			<NewsCarouselFetchContainer />
		</div>
	);
}
