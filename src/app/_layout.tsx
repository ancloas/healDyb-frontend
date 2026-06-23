import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { Text, useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.inkFaint,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.line,
            borderTopWidth: 1,
            paddingBottom: 10,
            height: 70,
          },
          tabBarLabelStyle: {
            fontSize: 9.5,
            fontWeight: '700',
            marginBottom: 4,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Today',
            tabBarLabel: 'Today',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>⌂</Text>,
          }}
        />
        <Tabs.Screen
          name="log"
          options={{
            title: 'Log',
            tabBarLabel: 'Log',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>▤</Text>,
          }}
        />
        <Tabs.Screen
          name="monitor"
          options={{
            title: 'Monitor',
            tabBarLabel: 'Monitor',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>◧</Text>,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>●</Text>,
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
