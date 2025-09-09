import React from "react";
import styles from "./PriceTableTitleLine.module.scss";

interface PriceTableTitleLineProps {
	count: boolean;
	duration: boolean;
	price: boolean;
	totalPrice: boolean;
	columnsNumber: number;
}

export default function PriceTableTitleLine({
	count,
	duration,
	price,
	totalPrice,
	columnsNumber,
}: PriceTableTitleLineProps) {
	return (
		<div className={`${styles.tableLine}`}>
			<div className={styles.titleColumn}></div>

			<div className={styles.data}>
				{count && (
					<div
						className={styles.dataColumn}
						style={{ width: 100 / columnsNumber + "%" }}
					>
						Кількість занять
					</div>
				)}
				{duration && (
					<div
						className={styles.dataColumn}
						style={{ width: 100 / columnsNumber + "%" }}
					>
						Тривалість заняття
					</div>
				)}
				{price && (
					<div
						className={styles.dataColumn}
						style={{ width: 100 / columnsNumber + "%" }}
					>
						Ціна за 1 заняття
					</div>
				)}
				{totalPrice && (
					<div
						className={styles.dataColumn}
						style={{ width: 100 / columnsNumber + "%" }}
					>
						Ціна за весь курс
					</div>
				)}
			</div>
		</div>
	);
}
