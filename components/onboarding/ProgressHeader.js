import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

export default function ProgressHeader({
  currentStep,
  totalSteps,
  title,
  subtitle,
}) {

  const progress = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.container}>

      <View style={styles.topRow}>
        <Text style={styles.step}>
          Step {currentStep} of {totalSteps}
        </Text>

        <Text style={styles.percent}>
          {Math.round(progress)}%
        </Text>
      </View>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      {subtitle && (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginBottom: 32,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  step: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },

  percent: {
    fontSize: 14,
    color: Colors.textSecondary,
  },

  progressBackground: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },

  title: {
    marginTop: 24,
    fontSize: 30,
    fontWeight: '700',
    color: Colors.text,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textSecondary,
  },

});