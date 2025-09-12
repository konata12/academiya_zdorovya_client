import { FAQ } from "@/app/(client)/ui/common/sections/FAQ/FAQ";
import DepartmentPhoneNumberBtn from "@/app/(client)/ui/Home/DepartmentPhoneNumberBtn/DepartmentPhoneNumberBtn";
import btnStyles from "@/app/(client)/ui/Home/DepartmentPhoneNumberBtn/DepartmentPhoneNumberBtn.module.scss";
import MainPageGoalsCards from "@/app/(client)/ui/Home/MainPageGoalsCards/MainPageGoalsCards";
import HowWeTreatArticles from "@/app/(client)/ui/Home/HowWeTreatArticles/HowWeTreatArticles";
import OurServicesList from "@/app/(client)/ui/Home/OurServicesList/OurServicesList";
import WhatWeTreatHomeLists from "@/app/(client)/ui/Home/WhatWeTreatHomeList/WhatWeTreatHomeLists";
import logo from "@/public/icons/logo.svg";
import avatars from "@/public/images/client/main_hero_avatars.png";
import woman from "@/public/images/client/our_services.png";
import doctor from "@/public/images/client/what_we_treat_home_page.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./page.module.scss";

export default async function Home() {
	return (
		<div className={"page"}>
			<section className={styles.heroSection}>
				<div className={`container section ${styles.container}`}>
					<div>
						<div className={styles.logo}>
							<Image src={logo} alt={"Logo"} />
						</div>
						<h1>медичний центр фізичної реабілітації</h1>
					</div>

					<div className={styles.description}>
						<h2>
							{/*todo maybe their count may change*/}
							<span>2128 задоволених пацієнтів </span>
							<Image src={avatars} alt={"Avatars"} />
							<span>та професійна мультидсциплінарна </span>
							<span>команда лікарів і фізичних терапевтів</span>
						</h2>
						<p>
							Запишіться на прийом до наших досвідчених фахівців та отримайте
							індивідуальний підхід що забезпечить ефективне відновлення вашого
							здоров'я
						</p>
					</div>

					<div className={styles.buttons}>
						<DepartmentPhoneNumberBtn />
						<div className={`btn yellow xxl brown ${btnStyles.infoBtn}`}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="44"
								height="44"
								viewBox="0 0 44 44"
								fill="none"
							>
								<path
									d="M22.3335 44C10.2023 44 0.333496 34.1312 0.333496 22C0.333496 9.86883 10.2023 0 22.3335 0C34.4647 0 44.3335 9.86883 44.3335 22C44.3335 34.1312 34.4647 44 22.3335 44ZM22.3335 3.66667C12.2245 3.66667 4.00016 11.891 4.00016 22C4.00016 32.109 12.2245 40.3333 22.3335 40.3333C32.4425 40.3333 40.6668 32.109 40.6668 22C40.6668 11.891 32.4425 3.66667 22.3335 3.66667ZM26.9168 29.9383C27.795 29.4323 28.0957 28.3103 27.5878 27.434L24.1668 21.5087V11C24.1668 9.988 23.3473 9.16667 22.3335 9.16667C21.3197 9.16667 20.5002 9.988 20.5002 11V22C20.5002 22.3227 20.5845 22.638 20.7458 22.9167L24.4125 29.2673C24.7535 29.8558 25.3677 30.184 26.002 30.184C26.3137 30.184 26.629 30.1052 26.9168 29.9383Z"
									fill="#FEED01"
								/>
							</svg>
							<div>
								<p className={btnStyles.title}>Працюємо</p>
								<span>пн - сб з 9:00 - 20:00</span>
							</div>
						</div>
						<Link
							href={"/contacts"}
							className={`btn yellow xxl ${btnStyles.infoBtn}`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="44"
								height="44"
								viewBox="0 0 44 44"
								fill="none"
							>
								<path
									d="M35.4998 3.66667H33.6665V1.83333C33.6665 1.3471 33.4734 0.880788 33.1295 0.536971C32.7857 0.193154 32.3194 0 31.8332 0C31.3469 0 30.8806 0.193154 30.5368 0.536971C30.193 0.880788 29.9998 1.3471 29.9998 1.83333V3.66667H15.3332V1.83333C15.3332 1.3471 15.14 0.880788 14.7962 0.536971C14.4524 0.193154 13.9861 0 13.4998 0C13.0136 0 12.5473 0.193154 12.2035 0.536971C11.8597 0.880788 11.6665 1.3471 11.6665 1.83333V3.66667H9.83317C7.40291 3.66958 5.07303 4.63628 3.35457 6.35474C1.63612 8.07319 0.669415 10.4031 0.666504 12.8333V34.8333C0.669415 37.2636 1.63612 39.5935 3.35457 41.3119C5.07303 43.0304 7.40291 43.9971 9.83317 44H35.4998C37.9301 43.9971 40.26 43.0304 41.9784 41.3119C43.6969 39.5935 44.6636 37.2636 44.6665 34.8333V12.8333C44.6636 10.4031 43.6969 8.07319 41.9784 6.35474C40.26 4.63628 37.9301 3.66958 35.4998 3.66667ZM4.33317 12.8333C4.33317 11.3746 4.91263 9.9757 5.94408 8.94425C6.97553 7.9128 8.37448 7.33333 9.83317 7.33333H35.4998C36.9585 7.33333 38.3575 7.9128 39.3889 8.94425C40.4204 9.9757 40.9998 11.3746 40.9998 12.8333V14.6667H4.33317V12.8333ZM35.4998 40.3333H9.83317C8.37448 40.3333 6.97553 39.7539 5.94408 38.7224C4.91263 37.691 4.33317 36.292 4.33317 34.8333V18.3333H40.9998V34.8333C40.9998 36.292 40.4204 37.691 39.3889 38.7224C38.3575 39.7539 36.9585 40.3333 35.4998 40.3333Z"
									fill="currentColor"
								/>
								<path
									d="M22.6665 30.25C24.1853 30.25 25.4165 29.0188 25.4165 27.5C25.4165 25.9812 24.1853 24.75 22.6665 24.75C21.1477 24.75 19.9165 25.9812 19.9165 27.5C19.9165 29.0188 21.1477 30.25 22.6665 30.25Z"
									fill="currentColor"
								/>
								<path
									d="M13.4998 30.25C15.0186 30.25 16.2498 29.0188 16.2498 27.5C16.2498 25.9812 15.0186 24.75 13.4998 24.75C11.9811 24.75 10.7498 25.9812 10.7498 27.5C10.7498 29.0188 11.9811 30.25 13.4998 30.25Z"
									fill="currentColor"
								/>
								<path
									d="M31.8332 30.25C33.352 30.25 34.5832 29.0188 34.5832 27.5C34.5832 25.9812 33.352 24.75 31.8332 24.75C30.3144 24.75 29.0832 25.9812 29.0832 27.5C29.0832 29.0188 30.3144 30.25 31.8332 30.25Z"
									fill="currentColor"
								/>
							</svg>
							<div>
								<p className={`${btnStyles.title} ${btnStyles.black}`}>
									Запис на прийом
								</p>
								<span>Записатись зараз</span>
							</div>
						</Link>
					</div>
				</div>
			</section>
			<section className="news">NEWS</section>
			<section className={`container ${styles.whatWeTreatSection}`}>
				<article>
					<h2 className={"title left lg"}>Що ми лікуємо</h2>
					<WhatWeTreatHomeLists />
				</article>
				{/*todo change to good quality picture and add box shadow*/}
				<div className={styles.img}>
					<Image src={doctor} alt={"Doctor"} />
				</div>
			</section>
			<section className={`container section`}>
				<h2 className={"title left lg"}>Як ми лікуємо</h2>
				<p>
					Дізнайтеся більше про наші методи фізичноі терапії, які забезпечуть
					ефективне відновлення та тривалий результат.
				</p>
				<HowWeTreatArticles />
			</section>
			<section className={`container ${styles.ourServicesSection}`}>
				{/*todo change to good quality picture and add box shadow*/}
				<div className={styles.img}>
					<Image src={woman} alt={"Doctor"} />
				</div>
				<article>
					<h2 className={"title left lg"}>Наш спектр послуг</h2>
					<OurServicesList />
				</article>
			</section>
			<section className={`container section`}>
				<h2 className={"title left lg"}>Наша мета та цінності</h2>
				<p>
					Відданість, професіоналізм, індивідуальний підхід та турбота про кожного
					пацієнта – основа нашої роботи.
				</p>
				<MainPageGoalsCards />
			</section>
			<section className="">REVIEWS</section>
			<FAQ />
		</div>
	);
}
