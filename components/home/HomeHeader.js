import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

export default function HomeHeader() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.date}>
          Mon, 21 June
        </Text>

        <Text style={styles.subtitle}>
          Good Morning 👋
        </Text>
      </View>

      <View style={styles.streak}>
        <Text style={styles.streakText}>
          🔥 12
        </Text>

        <Text style={styles.streakLabel}>
          day streak
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  date: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text,
  },

  subtitle: {
    marginTop: 4,
    color: Colors.textSecondary,
  },

  streak: {
    alignItems: 'center',
  },

  streakText: {
    fontSize: 20,
    fontWeight: '700',
  },

  streakLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
});