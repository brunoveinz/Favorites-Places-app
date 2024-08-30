import * as SQLite from 'expo-sqlite';
import { Place } from '../models/Place'

const database = SQLite.openDatabaseSync('places.db');
 
export function init() {
    return database.runAsync(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lon REAL NOT NULL
        )
    `);
}

export function insertPlace(place) {
  return database
    .runAsync(
      `
      INSERT INTO places (title, imageUri, address, lat, lon)
      VALUES (?, ?, ?, ?, ?)
    `,
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ]
    )
    .then((result) => {
      // Imprime un mensaje de éxito
      console.log("Insert successful:", result);
      return result; // Devuelve el resultado si necesitas manejarlo más adelante
    })
    .catch((error) => {
      // Imprime un mensaje de error
      console.error("Error inserting place:", error);
      throw error; // Lanza el error de nuevo si necesitas manejarlo más adelante
    });
}


export async function fetchPlaces() {
  const result = await database.getAllAsync('SELECT * FROM places');
  const places = [];  
  result.forEach(record => {
    const place = new Place(
      record.title,
      record.imageUri,
      {
        address: record.address,
        lat: record.lat,
        lng: record.lon 
      },
      record.id,

    );
    places.push(place);
  });
  
  
  return places;
}


export async function fetchPlaceDetails(id) {
  const dbPlace = await database.getFirstAsync(
      'SELECT * FROM places WHERE id = ?',
      [id]
  );
  const place = new Place(
      dbPlace.title,
      dbPlace.imageUri,
      { lat: dbPlace.lat, lng: dbPlace.lon, address: dbPlace.address },
      dbPlace.id
  );

  return place;
}