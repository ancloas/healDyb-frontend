import React, { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
} from 'react-native';

import ScreenContainer from '../../components/common/ScreenContainer';
import Card from '../../components/common/Card';
import PrimaryButton from '../../components/common/PrimaryButton';
import SecondaryButton from '../../components/common/SecondaryButton';

import Colors from '../../constants/colors';

export default function BloodPressureLogScreen({ navigation }) {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');

  return (
    <ScreenContainer>

      <Text style={styles.title}>
        Blood Pressure
      </Text>

      <Text style={styles.subtitle}>
        Record your latest blood pressure reading.
      </Text>

      <Card style={styles.card}>

        <View style={styles.row}>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>SYS</Text>

            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              placeholder="120"
              value={systolic}
              onChangeText={setSystolic}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>DIA</Text>

            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              placeholder="80"
              value={diastolic}
              onChangeText={setDiastolic}
            />
          </View>

        </View>

        <Text style={[styles.label, { marginTop: 20 }]}>
          Pulse (bpm)
        </Text>

        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="72"
          value={pulse}
          onChangeText={setPulse}
        />

      </Card>

      <Card style={styles.scanCard}>

        <Text style={styles.scanTitle}>
          Scan BP Monitor
        </Text>

        <Text style={styles.scanSubtitle}>
          Capture your blood pressure monitor using the camera.
        </Text>

        <SecondaryButton
          title="📷 Scan Monitor"
          onPress={() => {}}
        />

      </Card>

      <PrimaryButton
        title="Save Reading"
        onPress={() => {
          console.log({
            systolic,
            diastolic,
            pulse,
          });

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

  row: {
    flexDirection: 'row',
    gap: 16,
  },

  inputContainer: {
    flex: 1,
  },

  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 24,
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