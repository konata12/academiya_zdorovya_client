import { PriceFormDataWithoutError, PriceSection } from "@/app/types/data/prices.type";
import { useFormChangeCheck } from "@/app/utils/hooks/common/useFormChangeCheck";

export function usePriceFormChangeCheck(
	oldPriceData: PriceSection | undefined,
	newPriceData: PriceFormDataWithoutError,
) {
	let parsedOldPriceData: PriceFormDataWithoutError | undefined = undefined;
	if (oldPriceData) {
		const { id, ...oldData } = oldPriceData;
		parsedOldPriceData = oldData;
	}
	useFormChangeCheck(parsedOldPriceData, newPriceData);
}
