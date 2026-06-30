import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import MonitorScreen from '../screens/MonitorScreen';
import LogNavigator from './LogNavigator';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;

            case 'Record':
              iconName = focused ? 'add-circle' : 'add-circle-outline';
              break;

            case 'Monitor':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              break;

            default:
              iconName = 'ellipse';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },

        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#9E9E9E',

        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Record"
        component={LogNavigator}
      />

      <Tab.Screen
        name="Monitor"
        component={MonitorScreen}
      />
    </Tab.Navigator>
  );
}