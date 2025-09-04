import DepartmentPhoneNumber from "@/app/(client)/ui/common/DepartmentPhoneNumber/DepartmentPhoneNumber";
import FooterBottom from "@/app/(client)/ui/Footer/FooterBottom";
import FooterDepartments from "@/app/(client)/ui/Footer/FooterDepartments";
import { FooterNavBar } from "@/app/(client)/ui/Footer/FooterNavBar";
import {
	fetchDepartments,
	fetchServicesTitles,
} from "@/app/services/client/fetchData.service";
import logo from "@/public/icons/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import styles from "./Footer.module.scss";

export default function Footer() {
	const departments = fetchDepartments();
	const services = fetchServicesTitles();

	return (
		<footer className={styles.footer}>
			<div className={`container`}>
				<div className={styles.dataContainers}>
					<div className={`${styles.dataContainer} ${styles.company}`}>
						<Image src={logo} alt="logo" className={styles.logo} />
						<h4 className={styles.title}>Медичний центр фізичної реабілітації</h4>
						<p className={styles.text}>пн - сб з 9:00 - 20:00</p>
						<div className={styles.icons}>
							<Link
								href={"https://www.instagram.com/akademia_zdorovja/"}
								aria-label={"Instagram"}
								target="_blank"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="28"
									height="28"
									viewBox="0 0 28 28"
									fill="none"
								>
									<path
										d="M14 2.52233C17.738 2.52233 18.1813 2.53633 19.6572 2.604C21.1832 2.674 22.7547 3.02167 23.8665 4.1335C24.9888 5.25583 25.326 6.81217 25.396 8.34283C25.4637 9.81867 25.4777 10.262 25.4777 14C25.4777 17.738 25.4637 18.1813 25.396 19.6572C25.3272 21.175 24.9713 22.7617 23.8665 23.8665C22.7442 24.9888 21.189 25.326 19.6572 25.396C18.1813 25.4637 17.738 25.4777 14 25.4777C10.262 25.4777 9.81867 25.4637 8.34283 25.396C6.83667 25.3272 5.229 24.9632 4.1335 23.8665C3.017 22.75 2.674 21.1785 2.604 19.6572C2.53633 18.1813 2.52233 17.738 2.52233 14C2.52233 10.262 2.53633 9.81867 2.604 8.34283C2.67283 6.83083 3.03217 5.23483 4.1335 4.1335C5.2535 3.0135 6.81567 2.674 8.34283 2.604C9.81867 2.53633 10.262 2.52233 14 2.52233ZM14 0C10.1978 0 9.72067 0.0163333 8.22733 0.084C6.06317 0.183167 3.91417 0.785167 2.34967 2.34967C0.779333 3.92 0.183167 6.06433 0.084 8.22733C0.0163333 9.72067 0 10.1978 0 14C0 17.8022 0.0163333 18.2793 0.084 19.7727C0.183167 21.9345 0.7875 24.0893 2.34967 25.6503C3.91883 27.2195 6.06667 27.8168 8.22733 27.916C9.72067 27.9837 10.1978 28 14 28C17.8022 28 18.2793 27.9837 19.7727 27.916C21.9357 27.8168 24.087 27.2137 25.6503 25.6503C27.2218 24.0788 27.8168 21.9357 27.916 19.7727C27.9837 18.2793 28 17.8022 28 14C28 10.1978 27.9837 9.72067 27.916 8.22733C27.8168 6.06317 27.2137 3.913 25.6503 2.34967C24.0835 0.782833 21.9298 0.182 19.7727 0.084C18.2793 0.0163333 17.8022 0 14 0Z"
										strokeWidth="0"
										fill="none"
									/>
									<path
										d="M14 6.81104C10.0299 6.81104 6.81104 10.0299 6.81104 14C6.81104 17.9702 10.0299 21.189 14 21.189C17.9702 21.189 21.189 17.9702 21.189 14C21.189 10.0299 17.9702 6.81104 14 6.81104ZM14 18.6667C11.4229 18.6667 9.33337 16.5772 9.33337 14C9.33337 11.4229 11.4229 9.33337 14 9.33337C16.5772 9.33337 18.6667 11.4229 18.6667 14C18.6667 16.5772 16.5772 18.6667 14 18.6667Z"
										strokeWidth="0"
										fill="none"
									/>
									<path
										d="M21.4735 8.20619C22.4013 8.20619 23.1535 7.45403 23.1535 6.52619C23.1535 5.59835 22.4013 4.84619 21.4735 4.84619C20.5456 4.84619 19.7935 5.59835 19.7935 6.52619C19.7935 7.45403 20.5456 8.20619 21.4735 8.20619Z"
										strokeWidth="0"
										fill="none"
									/>
								</svg>
							</Link>
							<Link
								href={"https://www.facebook.com/akademia.zdorovja"}
								aria-label={"Facebook"}
								target="_blank"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="28"
									height="28"
									viewBox="0 0 28 28"
									fill="none"
								>
									<path
										d="M28 14.085C28 21.0721 22.8737 26.8646 16.1817 27.9158V18.159H19.4355L20.055 14.1223H16.1817V11.5031C16.1817 10.3983 16.723 9.32263 18.4567 9.32263H20.2172V5.88563C20.2172 5.88563 18.6188 5.61263 17.0917 5.61263C13.902 5.61263 11.8183 7.54579 11.8183 11.0446V14.1211H8.27283V18.1578H11.8183V27.9146C5.1275 26.8623 0 21.071 0 14.085C0 6.35346 6.2685 0.0849609 14 0.0849609C21.7315 0.0849609 28 6.35229 28 14.085Z"
										strokeWidth="0"
										fill="none"
									/>
								</svg>
							</Link>
						</div>
					</div>
					<div className={`${styles.dataContainer} ${styles.departmentsContainer}`}>
						<h4 className={styles.title}>Адреси центрів</h4>
						<Suspense
							fallback={
								<p className={`loading ${styles.text} ${styles.big}`}></p>
							}
						>
							<FooterDepartments departmentsPromise={departments} />
						</Suspense>
					</div>
					<div className={`${styles.dataContainer}`}>
						<h4 className={styles.title}>Юридична інформація</h4>
						<p className={styles.text}>Перегляньте наші умови</p>
						<div className={styles.links}>
							<Link
								className={`${styles.text} ${styles.big}`}
								href={"/privacyPolicy"}
							>
								Політика конфіденційності
							</Link>
							<Link
								className={`${styles.text} ${styles.big}`}
								href={"/publicOffer"}
							>
								Публічна оферта
							</Link>
						</div>
					</div>
					<div className={`${styles.dataContainer}`}>
						<h4 className={styles.title}>Контактна інформація</h4>
						<p className={styles.text}>Зв'яжіться з нами</p>
						<address className={styles.address}>
							<a
								className={`${styles.text} ${styles.big}`}
								href={"mailto:akademiyazdorovya@gmail.com"}
							>
								akademiyazdorovya@gmail.com
							</a>
							<Suspense
								fallback={
									<p className={`loading ${styles.text} ${styles.big}`}></p>
								}
							>
								<DepartmentPhoneNumber
									departmentsPromise={departments}
									className={`${styles.text} ${styles.big}`}
								/>
							</Suspense>
						</address>
					</div>
				</div>
				<Suspense fallback={<p className={`loading ${styles.navFallback}`}></p>}>
					<FooterNavBar servicesPromise={services} />
				</Suspense>
			</div>
			<FooterBottom className={styles.mainBottom} />
		</footer>
	);
}
