import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabaseAsync('places.db');

export function init() {
    return database.runAsync(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )
    `);
}