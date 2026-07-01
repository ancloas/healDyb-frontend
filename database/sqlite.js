import {
  initializeUserRepository,
  loadUserProfile,
  saveUserProfile,
} from './repositories/UserRepository';

export async function getSqliteStore() {
  await initializeUserRepository();

  return {
    loadUserProfile,
    saveUserProfile,
  };
}

export { initializeUserRepository, loadUserProfile, saveUserProfile };