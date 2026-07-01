import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import AppContext from './AppContext';
import { initializeUserRepository } from '../database/repositories/UserRepository';

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
      } catch (error) {
        console.error('Failed to initialize SQLite database:', error);
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

  const updateOnboardingData = (updates) => {
    setOnboardingData((previous) => ({
      ...previous,
      ...updates,
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