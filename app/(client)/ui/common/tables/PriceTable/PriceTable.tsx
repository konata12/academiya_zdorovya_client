import PriceTableLine from "@/app/(client)/ui/common/tables/PriceTable/PriceTableLine/PriceTableLine";
import PriceTableTitleLine from "@/app/(client)/ui/common/tables/PriceTable/PriceTableTitleLine/PriceTableTitleLine";
import { selectPriceTableColumns } from "@/app/services/server/prices.services";
import { PriceSection } from "@/app/types/data/prices.type";
import React from "react";
import styles from "./PriceTable.module.scss";

export default function PriceTable({ data }: { data: PriceSection }) {
	const columnsRenderData = selectPriceTableColumns(data);
	const { count, duration, price, totalPrice, columnsNumber } = columnsRenderData;

	return (
		<div className={`${styles.pricesTable}`} id={data.titles[0].text}>
			<div className={styles.titles}>
				{data.titles.map((title, i) => {
					return (
						<div className={styles.priceTableTitle} key={i}>
							<h2 className={styles.title}>{title.text}</h2>
							<span className={styles.priceNearTitle}>
								{title.priceNearTitle}
							</span>
						</div>
					);
				})}
				{data.optionalService && (
					<p className={styles.optionalService}>{data.optionalService}</p>
				)}
			</div>

			<div className={styles.tableScrollContainer}>
				{data.prices && data.prices.length > 0 && (
					<div className={styles.table}>
						<PriceTableTitleLine
							count={count}
							duration={duration}
							price={price}
							totalPrice={totalPrice}
							columnsNumber={columnsNumber}
						/>

						{data.prices.map((price, i) => {
							return (
								<PriceTableLine
									pricing={price}
									renderColumns={columnsRenderData}
									key={i}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
