// app/lib/db.ts
import { getIndexedDBStoreForImages } from '@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages';
import { openDB, IDBPDatabase } from 'idb';
import { get, set } from 'idb-keyval';

interface AppDBSchema {
    // ABOUT TREATMENT
    'about_treatment_images': {
        key: string;
        value: Blob;
    };
    'about_treatment_create_images': {
        key: string;
        value: Blob;
    };
    'about_treatment_update_images': {
        key: string;
        value: Blob;
    };

    //NEWS
    'news_images': {
        key: string;
        value: Blob;
    };
    'news_update_images': {
        key: string;
        value: Blob;
    };
    'news_create_images': {
        key: string;
        value: Blob;
    };
    // Add other stores as needed
}

const DB_NAME = 'app_db';
const DB_VERSION = 2;

let dbInstance: Promise<IDBPDatabase<AppDBSchema>> | null = null;

export const getIndexedDB = async (): Promise<IDBPDatabase<AppDBSchema>> => {
    // Server-side guard
    if (typeof window === 'undefined') {
        throw new Error('IndexedDB is only available in the browser');
    }

    // Singleton pattern
    if (!dbInstance) {
        dbInstance = openDB<AppDBSchema>(DB_NAME, DB_VERSION, {
            upgrade(db) {
                // Create stores if they don't exist
                // ABOUT TREATMENT
                if (!db.objectStoreNames.contains('about_treatment_images')) {
                    db.createObjectStore('about_treatment_images');
                }
                if (!db.objectStoreNames.contains('about_treatment_create_images')) {
                    db.createObjectStore('about_treatment_create_images');
                }
                if (!db.objectStoreNames.contains('about_treatment_update_images')) {
                    db.createObjectStore('about_treatment_update_images');
                }

                // NEWS
                if (!db.objectStoreNames.contains('news_images')) {
                    db.createObjectStore('news_images');
                }
                if (!db.objectStoreNames.contains('news_update_images')) {
                    db.createObjectStore('news_update_images');
                }
                if (!db.objectStoreNames.contains('news_create_images')) {
                    db.createObjectStore('news_create_images');
                }

                // Add more stores as needed
            },

            // Enhanced error handling
            blocked() {
                console.warn('Database upgrade blocked by existing connection');
                throw new Error('Database is blocked by another connection');
            },

            blocking() {
                console.warn('This connection is blocking database upgrade');
                // Optionally close the connection
            },

            terminated() {
                console.warn('Database connection terminated unexpectedly');
                dbInstance = null; // Reset instance to allow reconnection
            }
        }).catch(err => {
            // Reset instance on failure
            dbInstance = null;
            console.error('Database connection failed:', err);
            throw new Error(`Failed to open database: ${err.message}`);
        });
    }

    return dbInstance;
};

export async function transferImageBetweenIndexDBStores(
    image: string,
    getStoreName: string,
    setStoreName: string,
) {
    const getStore = getIndexedDBStoreForImages(getStoreName)
    const setStore = getIndexedDBStoreForImages(setStoreName)
    try {
        const imageFile = await get<Blob | File>(image, getStore)
        await set(image, imageFile, setStore)
    } catch (error) {
        console.log(error)
        throw new Error('Failed to transfer image between IndexedDB stores');
    }
}
export async function transferAndReplaceImageBetweenIndexDBStores(
    newImageName: string,
    oldImageName: string | undefined,
    getStoreName: string,
    setStoreName: string,
) {
    try {
        if (!oldImageName) throw new Error('Old image name is required for replacement');
        const db = await getIndexedDB();

        // Start a transaction that includes both stores
        const tx = db.transaction([getStoreName, setStoreName], 'readwrite');
        const getStore = tx.objectStore(getStoreName);
        const setStore = tx.objectStore(setStoreName);

        // Get the new image from source store
        const newImage = await getStore.get(newImageName);
        if (!newImage) {
            throw new Error(`Image ${newImageName} not found in ${getStoreName}`);
        }

        // Perform all operations atomically
        await Promise.all([
            // Add new image to destination store
            setStore.put(newImage, newImageName),

            // Remove old image from destination store if it exists
            setStore.delete(oldImageName),
        ]);

        // Wait for transaction to complete
        await tx.done;

    } catch (error) {
        console.error('Failed to transfer and replace image:', error);
        throw new Error(`Failed to transfer image: ${error instanceof Error ? error.message : String(error)}`);
    }
}