"use client";

import React from "react";
import ErrorLayout from "@/app/(clientErrorsLayout)/(client)/ui/errors/ErrorLayout/ErrorLayout";
import headerStyles from "@/app/(clientErrorsLayout)/(client)/ui/Navbar/Header.module.scss";
import styles from "./error.module.scss";
import Image from "next/image";
import logo from "@/public/icons/logo.svg";

export default function Error() {
	return (
		<div className={styles.container}>
			<header className={`${headerStyles.header} ${styles.header}`}>
				<div className={`${headerStyles.container} container`}>
					<div className={headerStyles.logo}>
						<Image src={logo} priority={true} alt="logo" />
					</div>
				</div>
			</header>
			<ErrorLayout
				className={styles.main}
				code={500}
				massage={"Сталася помилка"}
				action={"Спробуйте перезавантажити сторінку або відвідати її пізніше"}
			/>
			<footer className={styles.footer}>
				<p>© 2024 Академія здоров’Я. Всі права захищені.</p>
			</footer>
		</div>
	);
}
