export const USER_PROFILE_TABLE_SQL = `
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
`;

export const USER_PROFILE_SCHEMA = {
  tableName: 'user_profiles',
  columns: [
    'id',
    'personal_info',
    'diabetes_type',
    'diagnosis_date',
    'food_preferences',
    'medications',
    'reminders',
    'created_at',
  ],
};