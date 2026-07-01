import { getDatabase } from '../database';

let initialized = false;

export async function initializeHealthRepository() {
  if (initialized) {
    return;
  }

  const database = getDatabase();

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS health_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      value TEXT NOT NULL,
      metadata TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  initialized = true;
}

export async function saveWeightLog(value) {
  await initializeHealthRepository();
  const database = getDatabase();
  return database.runAsync(
    'INSERT INTO health_logs (type, value, metadata) VALUES (?, ?, ?)',
    ['weight', String(value), JSON.stringify({ unit: 'kg' })]
  );
}

export async function saveGlucoseLog(value, measurementType) {
  await initializeHealthRepository();
  const database = getDatabase();
  return database.runAsync(
    'INSERT INTO health_logs (type, value, metadata) VALUES (?, ?, ?)',
    ['glucose', String(value), JSON.stringify({ measurementType })]
  );
}

export async function saveBloodPressureLog(systolic, diastolic, pulse) {
  await initializeHealthRepository();
  const database = getDatabase();
  return database.runAsync(
    'INSERT INTO health_logs (type, value, metadata) VALUES (?, ?, ?)',
    ['blood_pressure', `${systolic}/${diastolic}`, JSON.stringify({ pulse })]
  );
}

export async function loadHealthHistory(type) {
  await initializeHealthRepository();
  const database = getDatabase();
  return database.getAllAsync(
    'SELECT * FROM health_logs WHERE type = ? ORDER BY created_at DESC',
    [type]
  );
}

export async function loadLatestWeight() {
  const rows = await loadHealthHistory('weight');
  return rows?.[0] ? { ...rows[0], value: Number(rows[0].value) } : null;
}

export async function loadLatestGlucose() {
  const rows = await loadHealthHistory('glucose');
  return rows?.[0] ? { ...rows[0], value: Number(rows[0].value) } : null;
}

export async function loadLatestBloodPressure() {
  const rows = await loadHealthHistory('blood_pressure');
  if (!rows?.[0]) {
    return null;
  }

  const [systolic, diastolic] = String(rows[0].value).split('/');
  return { ...rows[0], systolic: Number(systolic), diastolic: Number(diastolic) };
}
