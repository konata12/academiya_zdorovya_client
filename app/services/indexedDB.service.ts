// app/lib/db.ts
import { openDB, IDBPDatabase } from 'idb';

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
    console.log('creating db start')
    // Server-side guard
    if (typeof window === 'undefined') {
        throw new Error('IndexedDB is only available in the browser');
    }

    // Singleton pattern
    if (!dbInstance) {
        console.log('creating db second step')
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