import { getIndexedDBStoreForDetailsImages } from "@/app/services/details.service";
import { DetailsOrderSliceNameType } from "@/app/types/data/details.type";
import { createStore } from "idb-keyval";



export function useIndexedDBStoreForDetailsImages(orderSliceName: DetailsOrderSliceNameType) {
    const store = getIndexedDBStoreForDetailsImages(orderSliceName)

    return createStore('app_db', store)
}