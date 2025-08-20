import { useMemo } from "react";
import {
	PriceFormDataWithoutError,
	PriceSectionFormData,
	PriceTableColumnsData,
	PriceTableData,
	PriceVariantOptionsEnum,
} from "@/app/types/data/prices.type";

export function useAdjustPricesTableColumnsToData(data: PriceFormDataWithoutError) {
	return useMemo((): PriceTableColumnsData => {
		const columnsData: PriceTableData = {
			[PriceVariantOptionsEnum.COUNT]: [],
			[PriceVariantOptionsEnum.DURATION]: [],
			[PriceVariantOptionsEnum.PRICE]: [],
			[PriceVariantOptionsEnum.TOTALPRICE]: [],
		};

		if (data.prices) {
			data.prices.forEach((price) => {
				columnsData[PriceVariantOptionsEnum.COUNT].push(price.meetingCount);
				columnsData[PriceVariantOptionsEnum.DURATION].push(price.meetingDuration);
				columnsData[PriceVariantOptionsEnum.PRICE].push(price.meetingPrice);
				columnsData[PriceVariantOptionsEnum.TOTALPRICE].push(price.coursePrice);
			});
			columnsData[PriceVariantOptionsEnum.COUNT] = columnsData[
				PriceVariantOptionsEnum.COUNT
			].filter((data) => {
				return data !== null && data !== "";
			});
			columnsData[PriceVariantOptionsEnum.DURATION] = columnsData[
				PriceVariantOptionsEnum.DURATION
			].filter((data) => {
				return data !== null && data !== "";
			});
			columnsData[PriceVariantOptionsEnum.PRICE] = columnsData[
				PriceVariantOptionsEnum.PRICE
			].filter((data) => {
				return data !== null && data !== "";
			});
			columnsData[PriceVariantOptionsEnum.TOTALPRICE] = columnsData[
				PriceVariantOptionsEnum.TOTALPRICE
			].filter((data) => {
				return data !== null && data !== "";
			});
			let columnsNumber = Object.values(columnsData).reduce(
				(columnsNumber, currentColumn) => {
					if (currentColumn.length) return columnsNumber + 1;
					return columnsNumber;
				},
				0,
			);

			return { columnsData, columnsNumber };
		}

		return {
			columnsData,
			columnsNumber: 0,
		};
	}, [data]);
}
