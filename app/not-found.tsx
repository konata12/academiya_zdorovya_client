import ErrorLayout from "@/app/(client)/ui/errors/ErrorLayout/ErrorLayout";
import FooterBottom from "@/app/(client)/ui/Footer/FooterBottom";
import headerStyles from "@/app/(client)/ui/Header/Header.module.scss";
import styles from "@/app/error.module.scss";
import logo from "@/public/icons/logo.svg";
import Image from "next/image";
import React from "react";

export default function NotFound() {
	return (
		<div className={styles.container}>
			<header className={`${headerStyles.header} ${styles.header}`}>
				<div className={`${headerStyles.container} container`}>
					<div className={`${headerStyles.logo} ${styles.logo}`}>
						<Image src={logo} priority={true} alt="logo" />
					</div>
				</div>
			</header>
			<ErrorLayout
				className={styles.main}
				code={404}
				massage={"Сторінку не знайдено"}
				action={
					"Ця сторінка втрачена або її не існує, будь ласка, \n" +
					"поверніться на головну сторінку"
				}
			/>
			<FooterBottom />
		</div>
	);
}
