import {
	PriceSectionEnum,
	PriceSectionEnumType,
	PricesFromSliceNameType,
	PriceTitleEnumType,
	PriceVariantOptionsEnumType,
} from "@/app/types/data/prices.type";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import { usePricesFormSlice } from "@/app/utils/hooks/admin/pricesForm/usePricesFormSlice";
import { ChangeEvent, useCallback } from "react";
import { FormElements } from "@/app/types/ui/form_components/inputContainers.type";

interface ChangeEventProps<T extends FormElements> {
	e: ChangeEvent<T>;
	elementType: PriceSectionEnumType;
	field?: PriceTitleEnumType | PriceVariantOptionsEnumType;
	arrIndex?: number;
}

export function usePricesFormHandleChange(sliceName: PricesFromSliceNameType) {
	const dispatch = useAppDispatch();
	const {
		setPricesTitleFieldValue,
		setPricesOptionalServiceValue,
		setPricesPriceFieldValue,
	} = usePricesFormSlice(sliceName);

	return useCallback(
		<T extends FormElements>({
			e,
			elementType,
			field,
			arrIndex,
		}: ChangeEventProps<T>) => {
			const newValue = e.target.value;

			switch (elementType) {
				case PriceSectionEnum.TITLES:
					if (field && arrIndex !== undefined) {
						field = field as PriceTitleEnumType;
						dispatch(
							setPricesTitleFieldValue({
								field,
								value: newValue,
								index: arrIndex,
							}),
						);
					}
					break;
				case PriceSectionEnum.OPTIONALSERVICE:
					dispatch(setPricesOptionalServiceValue(newValue));
					break;
				case PriceSectionEnum.PRICES:
					if (field && arrIndex !== undefined) {
						field = field as PriceVariantOptionsEnumType;
						dispatch(
							setPricesPriceFieldValue({
								field,
								value: newValue,
								index: arrIndex,
							}),
						);
					}
					break;
			}
		},
		[sliceName],
	);
}
