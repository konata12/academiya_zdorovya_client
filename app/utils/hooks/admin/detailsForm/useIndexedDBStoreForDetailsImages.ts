import { getIndexedDBStoreForDetailsImages } from "@/app/services/details.service";
import { OrderSliceNameType } from "@/app/types/data/details.type";
import { createStore } from "idb-keyval";



export function useIndexedDBStoreForDetailsImages(orderSliceName: OrderSliceNameType) {
    const store = getIndexedDBStoreForDetailsImages(orderSliceName)

    return createStore('app_db', store)
}