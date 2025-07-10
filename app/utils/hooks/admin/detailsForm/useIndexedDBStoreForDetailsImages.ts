import { OrderSliceNameType } from "@/app/types/data/details.type";
import { createStore } from "idb-keyval";

type StoreName = 'news_images'

export function useIndexedDBStoreForDetailsImages(orderSliceName: OrderSliceNameType) {
    let store: StoreName

    switch (orderSliceName) {
        case 'newsDetailsOrder':
            store = 'news_images';
            break;

        default:
            throw new Error(`Unknown order slice name: ${orderSliceName}`);
    }

    return createStore('app_db', store)
}