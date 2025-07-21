import { getIndexedDB } from "@/app/services/indexedDB.service";
import { useEffect } from "react";

export function useConnectionToIndexedDB() {
    useEffect(() => {
        (async () => {
            await getIndexedDB()
        })()
    }, [])
}