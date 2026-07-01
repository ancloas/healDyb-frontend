import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabaseSync('healdyb.db');

export function getDatabase() {
  return database;
}

export default database;