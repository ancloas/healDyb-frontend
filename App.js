import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './context/AppProvider';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}