import React, { useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import ScreenContainer from '../../components/common/ScreenContainer';
import ProgressHeader from '../../components/onboarding/ProgressHeader';
import OnboardingFooter from '../../components/onboarding/OnboardingFooter';
import Colors from '../../constants/colors';
import AppContext from '../../context/AppContext'; // 💡 Make sure this path matches your context file folder

export default function PersonalInfoScreen({ navigation }) {
  // 1. Consume the global context state and update function
  const { onboardingData, updateOnboardingData } = useContext(AppContext);
  
  // Destructure personal_info for clean code syntax below
  const { name, age, height, weight, gender } = onboardingData.personal_info;

  // 2. Helper function to update only the personal_info nested fields
  const handleUpdateField = (key, value) => {
    updateOnboardingData({
      personal_info: {
        ...onboardingData.personal_info,
        [key]: value,
      },
    });
  };

  return (
    <ScreenContainer>
      <ProgressHeader
        currentStep={1}
        totalSteps={6}
        title="Tell us about yourself"
        subtitle="We'll use this information to personalize your health journey."
      />

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="John Doe"
        value={name}
        onChangeText={(text) => handleUpdateField('name', text)}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="32"
        keyboardType="numeric"
        value={age}
        onChangeText={(text) => handleUpdateField('age', text)}
      />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.genderContainer}>
        <GenderChip
          title="Male"
          selected={gender === 'Male'}
          onPress={() => handleUpdateField('gender', 'Male')}
        />
        <GenderChip
          title="Female"
          selected={gender === 'Female'}
          onPress={() => handleUpdateField('gender', 'Female')}
        />
        <GenderChip
          title="Other"
          selected={gender === 'Other'}
          onPress={() => handleUpdateField('gender', 'Other')}
        />
      </View>

      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        style={styles.input}
        placeholder="170"
        keyboardType="numeric"
        value={height}
        onChangeText={(text) => handleUpdateField('height', text)}
      />

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="82"
        keyboardType="numeric"
        value={weight}
        onChangeText={(text) => handleUpdateField('weight', text)}
      />

      <View style={{ flex: 1 }} />

      <OnboardingFooter
        hideBack
        onNext={() => navigation.navigate('DiabetesProfile')}
      />
    </ScreenContainer>
  );
}

function GenderChip({ title, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.genderChip, selected && styles.genderChipSelected]}
      onPress={onPress}
    >
      <Text style={[styles.genderText, selected && styles.genderTextSelected]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderChip: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  genderChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  genderText: {
    color: Colors.text,
    fontWeight: '600',
  },
  genderTextSelected: {
    color: '#FFF',
  },
});