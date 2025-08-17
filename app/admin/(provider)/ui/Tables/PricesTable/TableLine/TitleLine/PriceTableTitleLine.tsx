import React from "react";
import styles from "./PriceTableTitleLine.module.scss";
import {
	PriceTableData,
	PriceVariantOptionsEnum,
} from "@/app/types/data/prices.type";

export default function PriceTableTitleLine({
	columnsData,
	columnsNumber,
	priceVariantOptions,
}: {
	columnsData: PriceTableData;
	columnsNumber: number;
	priceVariantOptions: boolean[];
}) {
	return (
		<div className={`${styles.tableLine}`}>
			<div className={styles.titleColumn}></div>

			<div className={styles.data}>
				{!!columnsData[PriceVariantOptionsEnum.COUNT].length &&
					priceVariantOptions[0] && (
						<div
							className={styles.dataColumn}
							style={{ width: 100 / columnsNumber + "%" }}
						>
							Кількість занять
						</div>
					)}
				{!!columnsData[PriceVariantOptionsEnum.DURATION].length &&
					priceVariantOptions[1] && (
						<div
							className={styles.dataColumn}
							style={{ width: 100 / columnsNumber + "%" }}
						>
							Тривалість заняття
						</div>
					)}
				{!!columnsData[PriceVariantOptionsEnum.PRICE].length &&
					priceVariantOptions[2] && (
						<div
							className={styles.dataColumn}
							style={{ width: 100 / columnsNumber + "%" }}
						>
							Ціна за 1 заняття
						</div>
					)}
				{!!columnsData[PriceVariantOptionsEnum.TOTALPRICE].length &&
					priceVariantOptions[3] && (
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
