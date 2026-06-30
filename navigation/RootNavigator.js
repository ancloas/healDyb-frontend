import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppContext from '../context/AppContext'; // Adjust path if needed
import BottomTabNavigator from './BottomTabNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import CheckinScreen from '../screens/CheckinScreen';
import FeedbackScreen from '../screens/FeedbackScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  // Consume global state from your provider
  const { loading, onboardingCompleted } = useContext(AppContext);

  // Show a loading spinner while context reads from AsyncStorage
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!onboardingCompleted ? (
        <Stack.Screen
          name="Onboarding"
          component={OnboardingNavigator}
        />
      ) : (
        <Stack.Screen
          name="MainTabs"
          component={BottomTabNavigator}
        />
      )}

      <Stack.Screen
        name="Checkin"
        component={CheckinScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />

      <Stack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          presentation: 'modal',
          animation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
}