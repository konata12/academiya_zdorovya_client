import React from "react";
import styles from "./PriceTableLine.module.scss";
import {
	PriceFormData,
	PriceTableData,
	PriceVariantOptionsEnum,
} from "@/app/types/data/prices.type";

export default function PriceTableLine({
	pricing,
	includesDescription,
	columnsData,
	columnsNumber,
	priceVariantOptions,
}: {
	pricing: PriceFormData;
	includesDescription: boolean;
	columnsData: PriceTableData;
	columnsNumber: number;
	priceVariantOptions: boolean[];
}) {
	return (
		<div className={`${styles.tableLine} ${styles.dataLine}`}>
			<div className={styles.titleColumn}>
				<p>{pricing.title}</p>
				{includesDescription && <p>{pricing.titleDescription}</p>}
			</div>

			<div className={styles.data}>
				{!!columnsData[PriceVariantOptionsEnum.COUNT].length &&
					priceVariantOptions[0] && (
						<div
							className={styles.dataColumn}
							style={{ width: 100 / columnsNumber + "%" }}
						>
							{pricing.meetingCount}
						</div>
					)}
				{!!columnsData[PriceVariantOptionsEnum.DURATION].length &&
					priceVariantOptions[1] && (
						<div
							className={styles.dataColumn}
							style={{ width: 100 / columnsNumber + "%" }}
						>
							{pricing.meetingDuration}
						</div>
					)}
				{!!columnsData[PriceVariantOptionsEnum.PRICE].length &&
					priceVariantOptions[2] && (
						<div
							className={styles.dataColumn}
							style={{ width: 100 / columnsNumber + "%" }}
						>
							{pricing.meetingPrice}
						</div>
					)}
				{!!columnsData[PriceVariantOptionsEnum.TOTALPRICE].length &&
					priceVariantOptions[3] && (
						<div
							className={styles.dataColumn}
							style={{ width: 100 / columnsNumber + "%" }}
						>
							{pricing.coursePrice}
						</div>
					)}
			</div>
		</div>
	);
}
