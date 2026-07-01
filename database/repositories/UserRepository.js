import { getDatabase } from '../database';

let initialized = false;

export async function initializeUserRepository() {
  if (initialized) {
    return;
  }

  const database = getDatabase();

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS user_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      personal_info TEXT NOT NULL,
      diabetes_type TEXT,
      diagnosis_date TEXT,
      food_preferences TEXT,
      medications TEXT,
      reminders TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  initialized = true;
}

export async function saveUserProfile(profileData) {
  await initializeUserRepository();

  const database = getDatabase();
  const payload = {
    personal_info: profileData?.personal_info || {},
    diabetes_type: profileData?.diabetes_type || '',
    diagnosis_date: profileData?.diagnosis_date || '',
    food_preferences: profileData?.food_preferences || [],
    medications: profileData?.medications || [],
    reminders: profileData?.reminders || {},
  };

  await database.runAsync('DELETE FROM user_profiles');

  const result = await database.runAsync(
    `INSERT INTO user_profiles (
      personal_info,
      diabetes_type,
      diagnosis_date,
      food_preferences,
      medications,
      reminders
    ) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      JSON.stringify(payload.personal_info),
      payload.diabetes_type,
      payload.diagnosis_date,
      JSON.stringify(payload.food_preferences),
      JSON.stringify(payload.medications),
      JSON.stringify(payload.reminders),
    ]
  );

  return result.lastInsertRowId;
}

export async function loadUserProfile() {
  await initializeUserRepository();

  const database = getDatabase();
  const row = await database.getFirstAsync(
    'SELECT * FROM user_profiles ORDER BY id DESC LIMIT 1'
  );

  if (!row) {
    return null;
  }

  return {
    ...row,
    personal_info: row.personal_info ? JSON.parse(row.personal_info) : {},
    food_preferences: row.food_preferences ? JSON.parse(row.food_preferences) : [],
    medications: row.medications ? JSON.parse(row.medications) : [],
    reminders: row.reminders ? JSON.parse(row.reminders) : {},
  };
}
