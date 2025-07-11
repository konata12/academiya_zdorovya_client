import { OrderSliceNameType } from "@/app/types/data/details.type";

export type StoreName = 'news_images'

export function getIndexedDBStoreForDetailsImages(orderSliceName: OrderSliceNameType) {
    let store: StoreName

    switch (orderSliceName) {
        case 'newsDetailsOrder':
            store = 'news_images';
            break;

        default:
            throw new Error(`Unknown order slice name: ${orderSliceName}`);
    }

    return store
}