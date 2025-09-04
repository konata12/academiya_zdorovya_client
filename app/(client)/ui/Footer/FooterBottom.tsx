import styles from "./Footer.module.scss";
import React from "react";

export default function FooterBottom({ className }: { className?: string }) {
	const year = new Date().getFullYear();

	return (
		<div className={`${styles.bottom} ${className || ""}`}>
			<p>© {year} Академія здоров’Я. Всі права захищені.</p>
		</div>
	);
}
