import { createStore } from "idb-keyval";

export function useIndexedDBStoreForImages(name: string) {
    return createStore('app_db', name)
}