import { createStore } from "idb-keyval";

export function getIndexedDBStoreForImages(name: string) {
	return createStore("app_db", name);
}
