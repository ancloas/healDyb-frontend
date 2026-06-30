import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import PersonalInfoScreen from '../screens/onboarding/PersonalInfoScreen';
import DiabetesProfileScreen from '../screens/onboarding/DiabetesProfileScreen';
import FoodPreferenceScreen from '../screens/onboarding/FoodPreferenceScreen';
import MedicationScreen from '../screens/onboarding/MedicationScreen';
import ReminderSetupScreen from '../screens/onboarding/ReminderSetupScreen';
import OnboardingCompleteScreen from '../screens/onboarding/OnboardingCompleteScreen';


const Stack = createNativeStackNavigator();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
      />

      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfoScreen}
      />

      <Stack.Screen
        name="DiabetesProfile"
        component={DiabetesProfileScreen}
      />

      <Stack.Screen
        name="FoodPreference"
        component={FoodPreferenceScreen}
      />

      <Stack.Screen
        name="Medication"
        component={MedicationScreen}
      />

      <Stack.Screen
        name="ReminderSetup"
        component={ReminderSetupScreen}
      />

      <Stack.Screen
        name="OnboardingComplete"
        component={OnboardingCompleteScreen}
      />
    </Stack.Navigator>
  );
}