import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Card from '../common/Card';
import Colors from '../../constants/colors';

export default function InsightCard({ text }) {
  return (
    <Card style={styles.card}>

      <View style={styles.header}>
        <Text style={styles.icon}>💡</Text>

        <Text style={styles.title}>
          AI Insight
        </Text>
      </View>

      <Text style={styles.text}>
        {text}
      </Text>

    </Card>
  );
}

const styles = StyleSheet.create({

  card: {
    marginBottom: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  icon: {
    fontSize: 24,
    marginRight: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },

  text: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.textSecondary,
  },

});