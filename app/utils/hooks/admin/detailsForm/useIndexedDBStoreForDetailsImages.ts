import { getIndexedDBStoreNameForDetailsImages } from "@/app/services/details.service";
import { DetailsOrderSliceNameType } from "@/app/types/data/details.type";
import { createStore } from "idb-keyval";

export function useIndexedDBStoreForDetailsImages(
	orderSliceName: DetailsOrderSliceNameType,
) {
	const store = getIndexedDBStoreNameForDetailsImages(orderSliceName);

	return createStore("app_db", store);
}
