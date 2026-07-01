import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppContext from './AppContext';
import {
  initializeUserRepository,
  loadUserProfile,
} from '../database/repositories/UserRepository';

const STORAGE_KEY = '@healdyb/app-state';

const initialOnboardingData = {
  personal_info: {},
  diabetes_profile: {
    diabetes_type: '',
    diagnosis_date: '',
  },
  food_preference: [],
  medications: [],
  reminders: {},
};

export default function AppProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [onboardingData, setOnboardingData] = useState(initialOnboardingData);

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      try {
        await initializeUserRepository();

        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const savedProfile = await loadUserProfile();

        if (!isMounted) {
          return;
        }

        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed?.onboardingData) {
              setOnboardingData(parsed.onboardingData);
            }
            if (typeof parsed?.onboardingCompleted === 'boolean') {
              setOnboardingCompleted(parsed.onboardingCompleted);
            }
          } catch (error) {
            console.warn('Failed to parse stored app state:', error);
          }
        }

        if (savedProfile) {
          setOnboardingData({
            personal_info: savedProfile.personal_info || {},
            diabetes_profile: {
              diabetes_type: savedProfile.diabetes_type || '',
              diagnosis_date: savedProfile.diagnosis_date || '',
            },
            food_preference: savedProfile.food_preferences || [],
            medications: savedProfile.medications || [],
            reminders: savedProfile.reminders || {},
          });
          setOnboardingCompleted(true);
        }
      } catch (error) {
        console.error('Failed to initialize app state:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ onboardingCompleted, onboardingData })
    ).catch((error) => {
      console.error('Failed to persist app state:', error);
    });
  }, [loading, onboardingCompleted, onboardingData]);

  const updateOnboardingData = (updates) => {
    setOnboardingData((previous) => ({
      ...previous,
      ...updates,
      personal_info: {
        ...(previous.personal_info || {}),
        ...((updates && updates.personal_info) || {}),
      },
      diabetes_profile: {
        ...(previous.diabetes_profile || {}),
        ...((updates && updates.diabetes_profile) || {}),
      },
      reminders: {
        ...(previous.reminders || {}),
        ...((updates && updates.reminders) || {}),
      },
    }));
  };

  const completeOnboarding = () => {
    setOnboardingCompleted(true);
  };

  const value = useMemo(
    () => ({
      loading,
      onboardingCompleted,
      onboardingData,
      updateOnboardingData,
      completeOnboarding,
    }),
    [loading, onboardingCompleted, onboardingData]
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});