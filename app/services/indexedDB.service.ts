// app/lib/db.ts
import { openDB, IDBPDatabase } from 'idb';

export interface AppDBSchema {
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

    // EMPLOYEE
    'employee_images': {
        key: string;
        value: Blob;
    };
    'employee_create_images': {
        key: string;
        value: Blob;
    };
    'employee_update_images': {
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

    //SERVICE
    'service_images': {
        key: string;
        value: Blob;
    };
    'service_update_images': {
        key: string;
        value: Blob;
    };
    'service_create_images': {
        key: string;
        value: Blob;
    };
}

const DB_NAME = 'app_db';
const DB_VERSION = 4;

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

                // EMPLOYEE
                if (!db.objectStoreNames.contains('employee_images')) {
                    db.createObjectStore('employee_images');
                }
                if (!db.objectStoreNames.contains('employee_create_images')) {
                    db.createObjectStore('employee_create_images');
                }
                if (!db.objectStoreNames.contains('employee_update_images')) {
                    db.createObjectStore('employee_update_images');
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

                // SERVICE
                if (!db.objectStoreNames.contains('service_images')) {
                    db.createObjectStore('service_images');
                }
                if (!db.objectStoreNames.contains('service_update_images')) {
                    db.createObjectStore('service_update_images');
                }
                if (!db.objectStoreNames.contains('service_create_images')) {
                    db.createObjectStore('service_create_images');
                }
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
    getStoreName: keyof AppDBSchema,
    setStoreName: keyof AppDBSchema,
    transferFuncName: string = 'transferImageBetweenIndexDBStores',
) {
    try {
        if (!image) throw new Error(`Image name is required for transfer: ${transferFuncName}`);
        const db = await getIndexedDB();

        // Verify stores exist
        if (!db.objectStoreNames.contains(getStoreName) || !db.objectStoreNames.contains(setStoreName)) {
            throw new Error(`One or more stores do not exist: ${getStoreName}, ${setStoreName}`);
        }

        // Start a transaction that includes both stores
        const tx = db.transaction([getStoreName, setStoreName], 'readwrite');
        const getStore = tx.objectStore(getStoreName);
        const setStore = tx.objectStore(setStoreName);

        // Get the image from source store
        const imageFile: Blob | File = await getStore.get(image);
        if (!imageFile) {
            throw new Error(`Image ${image} not found when: ${transferFuncName}`);
        }

        // Set the image from source store in set store
        await setStore.put(imageFile, image)

        // Wait for transaction to complete
        await tx.done;
    } catch (error) {
        console.error('Failed to transfer and replace image:', error);
        throw new Error(`Failed to transfer image between IndexedDB stores (${transferFuncName}): ${error instanceof Error ? error.message : String(error)}`);
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

        // Verify stores exist
        if (!db.objectStoreNames.contains(getStoreName) || !db.objectStoreNames.contains(setStoreName)) {
            throw new Error(`One or more stores do not exist: ${getStoreName}, ${setStoreName}`);
        }

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
export async function transferAndReplaceArrayOfImagesBetweenIndexDBStores(
    newImageNames: string[],
    oldImageNames: string[],
    getStoreName: keyof AppDBSchema,
    setStoreName: keyof AppDBSchema,
    transferFuncName: string = 'transferAndReplaceArrayOfImagesBetweenIndexDBStores'
) {
    try {
        const db = await getIndexedDB();

        // Verify stores exist
        if (!db.objectStoreNames.contains(getStoreName) || !db.objectStoreNames.contains(setStoreName)) {
            throw new Error(`One or more stores do not exist: ${getStoreName}, ${setStoreName}`);
        }

        // Start a transaction that includes both stores
        const tx = db.transaction([getStoreName, setStoreName], 'readwrite');
        const getStore = tx.objectStore(getStoreName);
        const setStore = tx.objectStore(setStoreName);

        // Get all new images from source store
        const newImages = await Promise.all(
            newImageNames.map(name => getStore.get(name))
        );

        // Check if all new images exist
        const missingNewImages = newImageNames.filter((name, index) => !newImages[index]);
        if (missingNewImages.length > 0) {
            throw new Error(`Some new images not found in ${getStoreName}: ${missingNewImages.join(', ')}`);
        }

        // Perform all operations atomically
        const operations: Promise<unknown>[] = [];

        // Delete all old images
        oldImageNames.forEach(oldName => {
            operations.push(setStore.delete(oldName));
        });

        // Add all new images
        newImageNames.forEach((newName, index) => {
            operations.push(setStore.put(newImages[index]!, newName));
        });

        await Promise.all(operations);

        // Wait for transaction to complete
        await tx.done;

    } catch (error) {
        console.error('Failed to transfer and replace array of images:', error);
        throw new Error(
            `Failed to transfer array of images between IndexedDB stores (${transferFuncName}): ` +
            `${error instanceof Error ? error.message : String(error)}`
        );
    }
}