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
import AppContext from '../../context/AppContext'; // 💡 Double-check this matches your folder path

export default function DiabetesProfileScreen({ navigation }) {
  // 1. Consume the global onboarding data state and update function
  const { onboardingData, updateOnboardingData } = useContext(AppContext);

  // Destructure diabetes_profile fields for cleaner JSX code below
  const { diabetes_type, diagnosis_date } = onboardingData.diabetes_profile;

  // 2. Helper function to deep merge fields under diabetes_profile
  const handleUpdateField = (key, value) => {
    updateOnboardingData({
      diabetes_profile: {
        ...onboardingData.diabetes_profile,
        [key]: value,
      },
    });
  };

  return (
    <ScreenContainer>
      <ProgressHeader
        currentStep={2}
        totalSteps={6}
        title="Your Diabetes Profile"
        subtitle="Help us understand your condition."
      />

      <Text style={styles.sectionTitle}>Diabetes Type</Text>

      <Option
        title="Type 1"
        selected={diabetes_type === 'Type 1'}
        onPress={() => handleUpdateField('diabetes_type', 'Type 1')}
      />

      <Option
        title="Type 2"
        selected={diabetes_type === 'Type 2'}
        onPress={() => handleUpdateField('diabetes_type', 'Type 2')}
      />

      <Option
        title="Prediabetes"
        selected={diabetes_type === 'Prediabetes'}
        onPress={() => handleUpdateField('diabetes_type', 'Prediabetes')}
      />

      <Option
        title="Gestational"
        selected={diabetes_type === 'Gestational'}
        onPress={() => handleUpdateField('diabetes_type', 'Gestational')}
      />

      <Option
        title="Not Sure"
        selected={diabetes_type === 'Not Sure'}
        onPress={() => handleUpdateField('diabetes_type', 'Not Sure')}
      />

      <Text style={[styles.sectionTitle, { marginTop: 28 }]}>
        When were you diagnosed?
      </Text>

      <Option
        title="Less than 1 year"
        selected={diagnosis_date === '<1'}
        onPress={() => handleUpdateField('diagnosis_date', '<1')}
      />

      <Option
        title="1 - 5 years"
        selected={diagnosis_date === '1-5'}
        onPress={() => handleUpdateField('diagnosis_date', '1-5')}
      />

      <Option
        title="5 - 10 years"
        selected={diagnosis_date === '5-10'}
        onPress={() => handleUpdateField('diagnosis_date', '5-10')}
      />

      <Option
        title="More than 10 years"
        selected={diagnosis_date === '10+'}
        onPress={() => handleUpdateField('diagnosis_date', '10+')}
      />

      <View style={{ flex: 1 }} />

      <OnboardingFooter
        onBack={() => navigation.goBack()}
        onNext={() => navigation.navigate('FoodPreference')}
      />
    </ScreenContainer>
  );
}

function Option({ title, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.option, selected && styles.optionSelected]}
      onPress={onPress}
    >
      <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  option: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 12,
    backgroundColor: '#FFF',
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#E8F5E9',
  },
  optionText: {
    fontSize: 16,
    color: Colors.text,
  },
  optionTextSelected: {
    fontWeight: '700',
    color: Colors.primary,
  },
});