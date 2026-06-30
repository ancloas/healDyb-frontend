import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LogHomeScreen from '../screens/log/LogHomeScreen';
import WeightLogScreen from '../screens/log/WeightLogScreen';
import BPLogScreen from '../screens/log/BPLogScreen';
import GlucoseLogScreen from '../screens/log/GlucoseLogScreen';

const Stack = createNativeStackNavigator();

export default function LogNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="LogHome"
        component={LogHomeScreen}
      />

      <Stack.Screen
        name="WeightLog"
        component={WeightLogScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="BPLog"
        component={BPLogScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="GlucoseLog"
        component ={GlucoseLogScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}