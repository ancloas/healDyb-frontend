import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Card from '../common/Card';
import Colors from '../../constants/colors';

export default function MiniStatCard({
  label,
  value,
}) {
  return (
    <Card style={styles.card}>

      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>

    </Card>
  );
}

const styles = StyleSheet.create({

  card: {
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    color: Colors.textSecondary,
  },

  value: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
  },

});