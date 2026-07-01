import React, { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Pressable,
  Alert,
} from 'react-native';

import { saveGlucoseLog } from '../../database/repositories/HealthRepository';

import ScreenContainer from '../../components/common/ScreenContainer';
import Card from '../../components/common/Card';
import PrimaryButton from '../../components/common/PrimaryButton';
import SecondaryButton from '../../components/common/SecondaryButton';

import Colors from '../../constants/colors';

const TYPES = [
  'Fasting',
  'Before Meal',
  'After Meal',
  'Bedtime',
];

export default function GlucoseLogScreen({ navigation }) {
  const [glucose, setGlucose] = useState('');
  const [selectedType, setSelectedType] = useState('Fasting');

  return (
    <ScreenContainer>

      <Text style={styles.title}>
        Blood Glucose
      </Text>

      <Text style={styles.subtitle}>
        Record your glucose reading.
      </Text>

      <Card style={styles.card}>

        <Text style={styles.label}>
          Glucose (mg/dL)
        </Text>

        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="126"
          value={glucose}
          onChangeText={setGlucose}
        />

        <Text style={[styles.label, { marginTop: 24 }]}>
          Measurement Type
        </Text>

        <View style={styles.chips}>

          {TYPES.map((type) => {

            const selected = selectedType === type;

            return (
              <Pressable
                key={type}
                onPress={() => setSelectedType(type)}
                style={[
                  styles.chip,
                  selected && styles.selectedChip,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    selected && styles.selectedChipText,
                  ]}
                >
                  {type}
                </Text>
              </Pressable>
            );
          })}

        </View>

      </Card>

      <Card style={styles.scanCard}>

        <Text style={styles.scanTitle}>
          Scan Glucose Meter
        </Text>

        <Text style={styles.scanSubtitle}>
          Capture your glucose meter using the camera.
        </Text>

        <SecondaryButton
          title="📷 Scan Meter"
          onPress={() => {}}
        />

      </Card>

      <PrimaryButton
        title="Save Reading"
        onPress={async () => {
          if (!glucose) {
            Alert.alert('Missing value', 'Please enter your glucose reading before saving.');
            return;
          }

          await saveGlucoseLog(Number(glucose), selectedType);
          Alert.alert('Saved', 'Your glucose reading has been recorded.');
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
    fontSize: 28,
    textAlign: 'center',
  },

  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  chip: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  selectedChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  chipText: {
    color: Colors.text,
    fontWeight: '600',
  },

  selectedChipText: {
    color: '#fff',
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