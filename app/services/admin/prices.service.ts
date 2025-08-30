import {
	PriceFormData,
	PriceFormDataWithoutError,
	PriceSectionUI,
	TitlesFormData,
} from "@/app/types/data/prices.type";

export function parsePriceSectionFormDataToPriceSectionCreateFormData(
	data: PriceFormDataWithoutError,
	uiData: PriceSectionUI,
): PriceFormDataWithoutError {
	return {
		titles: parsePriceTitleFormDataToPriceTitleCreateFormData(data.titles, uiData),
		optionalService: uiData.optionalServiceCheckbox ? data.optionalService : null,
		prices: parsePriceFormDataToPriceCreateFormData(data.prices, uiData),
	};
}

export function parsePriceTitleFormDataToPriceTitleCreateFormData(
	titles: TitlesFormData[],
	uiData: PriceSectionUI,
) {
	return titles.map((title, i) => {
		return {
			text: title.text,
			priceNearTitle: uiData.addTitlePriceCheckbox[i] ? title.priceNearTitle : null,
		};
	});
}
export function parsePriceFormDataToPriceCreateFormData(
	prices: PriceFormData[] | null,
	uiData: PriceSectionUI,
) {
	if (!uiData.priceVariantsCheckbox) return null;

	return (
		prices &&
		prices.map((price, i) => {
			return {
				title: price.title,
				titleDescription: uiData.addPriceVariantDescriptionCheckbox[i]
					? price.titleDescription
					: null,
				meetingCount: uiData.meetingCountCheckbox ? price.meetingCount : null,
				meetingDuration: uiData.meetingDurationCheckbox ? price.meetingDuration : null,
				meetingPrice: uiData.meetingPriceCheckbox ? price.meetingPrice : null,
				coursePrice: uiData.meetingTotalPriceCheckbox ? price.coursePrice : null,
			};
		})
	);
}
