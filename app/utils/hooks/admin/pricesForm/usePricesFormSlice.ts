import { PricesFromSliceNameType } from "@/app/types/data/prices.type";
import { useMemo } from "react";
import {
	addPricesCreatePriceValue,
	addPricesCreateTitleValue,
	deletePricesCreatePriceValue,
	deletePricesCreateTitleValue,
	resetPricesCreateFromData,
	setPricesCreateOptionalServiceValue,
	setPricesCreateBasicValueError,
	setPricesCreatePriceFieldValue,
	setPricesCreatePricesFieldValueError,
	setPricesCreateTitleFieldValue,
	setPricesCreateTitleFieldValueError,
} from "@/app/utils/redux/prices/pricesCreateFormSlice";
import {
	addPricesUpdatePriceValue,
	addPricesUpdateTitleValue,
	deletePricesUpdatePriceValue,
	deletePricesUpdateTitleValue,
	resetPricesUpdateFromData,
	setPricesUpdateBasicValueError,
	setPricesUpdateOptionalServiceValue,
	setPricesUpdatePriceFieldValue,
	setPricesUpdatePricesFieldValueError,
	setPricesUpdateTitleFieldValue,
	setPricesUpdateTitleFieldValueError,
} from "@/app/utils/redux/prices/pricesUpdateFormSlice";

export function usePricesFormSlice(sliceName: PricesFromSliceNameType) {
	return useMemo(() => {
		switch (sliceName) {
			case "pricesCreateForm":
				return {
					// TITLES
					addPricesTitleValue: addPricesCreateTitleValue,
					deletePricesTitleValue: deletePricesCreateTitleValue,
					setPricesTitleFieldValue: setPricesCreateTitleFieldValue,
					// 	OPTIONAL SERVICE
					setPricesOptionalServiceValue: setPricesCreateOptionalServiceValue,
					// PRICES
					addPricesPriceValue: addPricesCreatePriceValue,
					deletePricesPriceValue: deletePricesCreatePriceValue,
					setPricesPriceFieldValue: setPricesCreatePriceFieldValue,
					// ERRORS
					setPricesTitleFieldValueError: setPricesCreateTitleFieldValueError,
					setPricesBasicValueError: setPricesCreateBasicValueError,
					setPricesPricesFieldValueError: setPricesCreatePricesFieldValueError,

					resetPricesFromData: resetPricesCreateFromData,
				};
			case "pricesUpdateForm":
				return {
					// TITLES
					addPricesTitleValue: addPricesUpdateTitleValue,
					deletePricesTitleValue: deletePricesUpdateTitleValue,
					setPricesTitleFieldValue: setPricesUpdateTitleFieldValue,
					// 	OPTIONAL SERVICE
					setPricesOptionalServiceValue: setPricesUpdateOptionalServiceValue,
					// PRICES
					addPricesPriceValue: addPricesUpdatePriceValue,
					deletePricesPriceValue: deletePricesUpdatePriceValue,
					setPricesPriceFieldValue: setPricesUpdatePriceFieldValue,
					// ERRORS
					setPricesTitleFieldValueError: setPricesUpdateTitleFieldValueError,
					setPricesBasicValueError: setPricesUpdateBasicValueError,
					setPricesPricesFieldValueError: setPricesUpdatePricesFieldValueError,

					resetPricesFromData: resetPricesUpdateFromData,
				};
		}
	}, [sliceName]);
}
