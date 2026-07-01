import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';

import { saveWeightLog } from '../../database/repositories/HealthRepository';

import ScreenContainer from '../../components/common/ScreenContainer';
import Card from '../../components/common/Card';
import PrimaryButton from '../../components/common/PrimaryButton';
import SecondaryButton from '../../components/common/SecondaryButton';

import Colors from '../../constants/colors';

export default function WeightLogScreen({ navigation }) {
  const [weight, setWeight] = useState('');

  return (
    <ScreenContainer>

      <Text style={styles.title}>
        Weight
      </Text>

      <Text style={styles.subtitle}>
        Record your current weight.
      </Text>

      <Card style={styles.card}>

        <Text style={styles.label}>
          Weight (kg)
        </Text>

        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          placeholder="e.g. 86.2"
          value={weight}
          onChangeText={setWeight}
        />

      </Card>

      <Card style={styles.scanCard}>

        <Text style={styles.scanTitle}>
          Scan from Scale
        </Text>

        <Text style={styles.scanSubtitle}>
          Capture your weighing scale using the camera.
        </Text>

        <SecondaryButton
          title="📷 Scan Scale"
          onPress={() => {}}
        />

      </Card>

      <PrimaryButton
        title="Save Weight"
        onPress={async () => {
          if (!weight) {
            Alert.alert('Missing value', 'Please enter your weight before saving.');
            return;
          }

          await saveWeightLog(Number(weight));
          Alert.alert('Saved', 'Your weight entry has been recorded.');
          navigation.goBack();
        }}
      />

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
  },

  subtitle: {
    marginTop: 4,
    marginBottom: 24,
    color: Colors.textSecondary,
  },

  card: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: Colors.text,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 32,
    textAlign: 'center',
  },

  scanCard: {
    marginBottom: 24,
  },

  scanTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },

  scanSubtitle: {
    color: Colors.textSecondary,
    marginBottom: 16,
  },

});