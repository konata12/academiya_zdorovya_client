import React from "react";
import styles from "./PricesTable.module.scss";
import { PriceSectionFormData } from "@/app/types/data/prices.type";
import PriceTableTitleLine from "@/app/admin/(provider)/ui/Tables/PricesTable/TableLine/TitleLine/PriceTableTitleLine";
import PriceTableLine from "@/app/admin/(provider)/ui/Tables/PricesTable/TableLine/PriceTableLine";
import { useAdjustPricesTableColumnsToData } from "@/app/utils/hooks/admin/pricesForm/useAdjustPricesTableColumnsToData";

export default function PricesTable({
	data,
	includeOptionalService,
	includePrices,
	includesPricesDescription,
	priceVariantOptions,
	className,
}: {
	data: Omit<PriceSectionFormData, "errors">;
	includeOptionalService: boolean;
	includePrices: boolean;
	includesPricesDescription: boolean[];
	priceVariantOptions: boolean[];
	className?: string;
}) {
	const { columnsData, columnsNumber } = useAdjustPricesTableColumnsToData(data);

	return (
		<div className={`${styles.pricesTable} ${className}`}>
			<div className={styles.titles}>
				{data.titles.map((title, i) => {
					return (
						<div className={styles.priceTableTitle} key={i}>
							<h3 className={styles.title}>{title.text}</h3>
							<span className={styles.priceNearTitle}>
								{title.priceNearTitle}
							</span>
						</div>
					);
				})}
				<p className={styles.optionalService}>
					{includeOptionalService && data.optionalService}
				</p>
			</div>

			{data.prices && includePrices && (
				<div className={styles.table}>
					<PriceTableTitleLine
						columnsData={columnsData}
						columnsNumber={columnsNumber}
						priceVariantOptions={priceVariantOptions}
					/>
					{data.prices.map((price, i) => {
						return (
							<PriceTableLine
								pricing={price}
								includesDescription={includesPricesDescription[i]}
								columnsData={columnsData}
								columnsNumber={columnsNumber}
								priceVariantOptions={priceVariantOptions}
								key={i}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}
