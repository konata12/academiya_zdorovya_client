import { PriceSection } from "@/app/types/data/prices.type";

export function selectPriceTableColumns(priceSection: PriceSection) {
	let count: boolean = false;
	let duration: boolean = false;
	let price: boolean = false;
	let totalPrice: boolean = false;

	if (priceSection.prices) {
		priceSection.prices.forEach((item) => {
			if (item.meetingCount?.length) count = true;
			if (item.meetingDuration?.length) duration = true;
			if (item.meetingPrice?.length) price = true;
			if (item.coursePrice?.length) totalPrice = true;
		});
	}

	return {
		count,
		duration,
		price,
		totalPrice,
		columnsNumber: +count + +duration + +price + +totalPrice,
	};
}
