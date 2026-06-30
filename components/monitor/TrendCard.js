import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Card from '../common/Card';
import Colors from '../../constants/colors';

export default function TrendCard({
  title,
  value,
  subtitle,
}) {
  return (
    <Card style={styles.card}>

      <View style={styles.header}>
        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.value}>
          {value}
        </Text>
      </View>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>

      <View style={styles.chartPlaceholder}>
        <Text style={styles.chartText}>
          Chart Coming Soon
        </Text>
      </View>

    </Card>
  );
}

const styles = StyleSheet.create({

  card: {
    marginBottom: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },

  value: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },

  subtitle: {
    marginTop: 6,
    color: Colors.textSecondary,
    fontSize: 14,
  },

  chartPlaceholder: {
    marginTop: 20,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#F4F6F8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  chartText: {
    color: Colors.textMuted,
    fontSize: 14,
  },

});