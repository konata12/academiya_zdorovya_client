import { PriceFormData } from "@/app/types/data/prices.type";
import React from "react";
import styles from "./PriceTableLine.module.scss";

interface PriceTableLineProps {
	pricing: PriceFormData;
	renderColumns: {
		count: boolean;
		duration: boolean;
		price: boolean;
		totalPrice: boolean;
		columnsNumber: number;
	};
}

export default function PriceTableLine({ pricing, renderColumns }: PriceTableLineProps) {
	const { count, duration, price, totalPrice, columnsNumber } = renderColumns;
	const {
		title,
		titleDescription,
		meetingCount,
		meetingDuration,
		meetingPrice,
		coursePrice,
	} = pricing;

	return (
		<div className={`${styles.tableLine} ${styles.dataLine}`}>
			<div className={styles.titleColumn}>
				<p>{title}</p>
				{titleDescription && <p>{titleDescription}</p>}
			</div>

			<div className={styles.data}>
				{count && (
					<div
						className={styles.dataColumn}
						style={{ width: 100 / columnsNumber + "%" }}
					>
						{meetingCount}
					</div>
				)}
				{duration && (
					<div
						className={styles.dataColumn}
						style={{ width: 100 / columnsNumber + "%" }}
					>
						{meetingDuration}
					</div>
				)}
				{price && (
					<div
						className={styles.dataColumn}
						style={{ width: 100 / columnsNumber + "%" }}
					>
						{meetingPrice}
					</div>
				)}
				{totalPrice && (
					<div
						className={styles.dataColumn}
						style={{ width: 100 / columnsNumber + "%" }}
					>
						{coursePrice}
					</div>
				)}
			</div>
		</div>
	);
}
