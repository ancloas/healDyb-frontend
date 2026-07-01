import React from 'react';
import { StyleSheet, Text } from 'react-native';

import ScreenContainer from '../../components/common/ScreenContainer';
import LogOptionCard from '../../components/log/LogOptionCard';

export default function LogChooserScreen({ navigation }) {
  return (
    <ScreenContainer>

      <Text style={styles.title}>
        Record Health Data
      </Text>

      <Text style={styles.subtitle}>
        Choose what you would like to log.
      </Text>

      <LogOptionCard
        icon="scale-outline"
        title="Weight"
        subtitle="Log your current weight"
        onPress={() => navigation.navigate('WeightLog')}
      />

      <LogOptionCard
        icon="heart-outline"
        title="Blood Pressure"
        subtitle="Log blood pressure and pulse"
        onPress={() => navigation.navigate('BPLog')}
      />

      <LogOptionCard
        icon="water-outline"
        title="Blood Glucose"
        subtitle="Log glucose reading"
        onPress={() => navigation.navigate('GlucoseLog')}
      />

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 28,
    color: '#666',
  },

});