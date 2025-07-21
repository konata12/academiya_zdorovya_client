import { clearDetailsIndexDB } from "@/app/services/details.service";
import { DetailsRedactorType } from "@/app/types/data/details.type";
import { del, UseStore } from "idb-keyval";
import { useCallback } from "react";

export function useNewsFormIndexedDB(store: UseStore) {

    const clearNewsFormDataIndexedDB = useCallback((
        backgroundImg: string | null,
        details: DetailsRedactorType | null,
    ) => {
        if (backgroundImg) del(backgroundImg, store)
        
        clearDetailsIndexDB(details, store)
    }, [store])

    return {
        clearNewsFromDataIndexedDB: clearNewsFormDataIndexedDB
    }
}