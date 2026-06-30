import React from 'react';
import { Text, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

export default function SectionTitle({ children }) {
  return (
    <Text style={styles.title}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 12,

    fontSize: 11,
    fontWeight: '800',

    color: Colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});