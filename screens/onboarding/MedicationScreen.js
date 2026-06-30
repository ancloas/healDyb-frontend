import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import ScreenContainer from '../../components/common/ScreenContainer';
import ProgressHeader from '../../components/onboarding/ProgressHeader';
import OnboardingFooter from '../../components/onboarding/OnboardingFooter';
import Colors from '../../constants/colors';
import AppContext from '../../context/AppContext'; // 💡 Ensure this folder path matches

export default function MedicationScreen({ navigation }) {
  // 1. Extract context values
  const { onboardingData, updateOnboardingData } = useContext(AppContext);
  
  // Guard clause to ensure we default to an empty array if not initialized
  const savedMedications = onboardingData.medications || [];

  // 2. Helper to add a medication to the global array list
  const handleAddSampleMedication = () => {
    const newMedicine = {
      name: 'Metformin',
      dosage: '500 mg',
      timing: 'Morning • Night',
      frequency: 'Daily'
    };

    updateOnboardingData({
      medications: [...savedMedications, newMedicine]
    });
  };

  return (
    <ScreenContainer>
      <ProgressHeader
        currentStep={4}
        totalSteps={6}
        title="Your Medications"
        subtitle="Add the medicines you take regularly."
      />

      {/* 3. Render empty state notice if array is empty, otherwise list cards */}
      {savedMedications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No medications added yet.</Text>
        </View>
      ) : (
        savedMedications.map((medicine, index) => (
          // Using index as the key since these don't have database IDs yet
          <View key={index} style={styles.card}>
            <Text style={styles.name}>{medicine.name}</Text>
            <Text style={styles.detail}>{medicine.dosage}</Text>
            <Text style={styles.detail}>{medicine.timing}</Text>
          </View>
        ))
      )}

      {/* Clicking this now pushes items straight to your global state context */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddSampleMedication}
      >
        <Text style={styles.addText}>+ Add Medication</Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }} />

      <OnboardingFooter
        onBack={() => navigation.goBack()}
        onNext={() => navigation.navigate('ReminderSetup')}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: 14,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  detail: {
    marginTop: 6,
    color: '#666', // Fallback for testing if Colors.textSecondary isn't loaded
    fontSize: 15,
  },
  addButton: {
    padding: 18,
    borderRadius: 14,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
    alignItems: 'center',
    marginTop: 8,
  },
  addText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 16,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    fontStyle: 'italic',
  }
});