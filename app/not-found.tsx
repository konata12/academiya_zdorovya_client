import ErrorLayout from "@/app/(client)/ui/errors/ErrorLayout/ErrorLayout";
import Footer from "@/app/(client)/ui/Footer/Footer";
import Header from "@/app/(client)/ui/Header/Header";
import styles from "@/app/error.module.scss";
import React from "react";

export default function NotFound() {
	return (
		<>
			<Header />
			<ErrorLayout
				className={styles.main}
				code={404}
				massage={"Сторінку не знайдено"}
				action={
					"Ця сторінка втрачена або її не існує, будь ласка, \n" +
					"поверніться на головну сторінку"
				}
			/>
			<Footer />
		</>
	);
}
