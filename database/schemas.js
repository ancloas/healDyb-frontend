// src/database/schemas.js
import Realm from 'realm';

// 1. Medication Schema
export class Medication extends Realm.Object {
  static schema = {
    name: 'Medication',
    properties: {
      name: 'string',
      dosage: 'string',
      timing: 'string',
      frequency: 'string',
    },
  };
}

// 2. Personal Info Sub-Document Schema
export class PersonalInfo extends Realm.Object {
  static schema = {
    name: 'PersonalInfo',
    embedded: true, // "embedded" means it lives directly inside the UserProfile
    properties: {
      name: 'string',
      age: 'string',
      gender: 'string',
      height: 'string',
      weight: 'string',
    },
  };
}

// 3. Main User Profile Schema
export class UserProfile extends Realm.Object {
  static schema = {
    name: 'UserProfile',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      personal_info: 'PersonalInfo',
      diabetes_type: 'string',
      diagnosis_date: 'string',
      food_preferences: 'string[]', // Array of strings
      medications: 'Medication[]',  // Relationship array pointing to Medication objects
    },
  };
}