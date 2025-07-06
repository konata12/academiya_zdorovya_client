import { get, set, del } from 'idb-keyval';

interface IndexedDBStorage {
    getItem: <T = any>(key: string) => Promise<T | null>;
    setItem: <T = any>(key: string, value: T) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
}

export const indexedDBStorage: IndexedDBStorage = {
    getItem: async <T = any>(key: string): Promise<T | null> => {
        const value = await get<T>(key);
        return value || null;
    },
    setItem: async <T = any>(key: string, value: T): Promise<void> => {
        await set(key, value);
    },
    removeItem: async (key: string): Promise<void> => {
        await del(key);
    },
};