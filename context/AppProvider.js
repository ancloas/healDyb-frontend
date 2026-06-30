import React, {
  useState,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AppContext from './AppContext';

const initialOnboardingData = {
  personal_info: {
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: ''
  },
  diabetes_profile: {
    diabetes_type: '', // e.g., 'Type 1', 'Type 2'
    diagnosis_date: '',
  },
  food_preference: [], // Starts as a clean, empty list of strings
  medications: []      // 💡 Clean empty list for dynamic medicine items
};

export default function AppProvider({ children }) {

  const [loading, setLoading] = useState(true);

  const [onboardingCompleted, setOnboardingCompleted] =
    useState(false);

  const [onboardingData, setOnboardingData] = useState(initialOnboardingData);

  const updateOnboardingData = (newData) => {
    setOnboardingData(prev => ({ ...prev, ...newData }));
  };

  useEffect(() => {

    async function initializeApp() {

      const value = await AsyncStorage.getItem(
        'onboardingCompleted'
      );

      setOnboardingCompleted(value === 'true');

      setLoading(false);
    }

    initializeApp();

  }, []);

  async function completeOnboarding() {

    await AsyncStorage.setItem(
      'onboardingCompleted',
      'true'
    );

    setOnboardingCompleted(true);
  }

  return (
    <AppContext.Provider
      value={{
        loading,
        onboardingCompleted,
        completeOnboarding,
        onboardingData,
        updateOnboardingData
      }}
    >
      {children}
    </AppContext.Provider>
  );

}