import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { RealmProvider } from '@realm/react';

import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import HomeScreen from './screens/HomeScreen';
import CheckinScreen from './screens/CheckinScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import LogScreen from './screens/log/LogHomeScreen';
import AppProvider from './context/AppProvider';
import { UserProfile, PersonalInfo, Medication } from './src/database/schemas';


export default function App() {
  return (
   <RealmProvider schema={[UserProfile, PersonalInfo, Medication]}>
    <AppProvider>
      <NavigationContainer>
        <StatusBar hidden={true} />
        <RootNavigator />
      </NavigationContainer>
    </AppProvider>
    </RealmProvider>
  );
}