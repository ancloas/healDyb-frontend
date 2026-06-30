import React, { useContext } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
} from 'react-native';

import ScreenContainer from '../../components/common/ScreenContainer';
import ProgressHeader from '../../components/onboarding/ProgressHeader';
import OnboardingFooter from '../../components/onboarding/OnboardingFooter';
import Colors from '../../constants/colors';
import AppContext from '../../context/AppContext'; // 💡 Ensure this path matches your structure

export default function ReminderSetupScreen({ navigation }) {
  // 1. Grab context data and update methods
  const { onboardingData, updateOnboardingData } = useContext(AppContext);

  // 2. Fallback to default configurations if the user hasn't toggled anything yet
  const reminders = onboardingData.reminders || {
    mealReminder: true,
    medicineReminder: true,
    glucoseReminder: true,
    walkReminder: true,
    waterReminder: false,
  };

  // 3. Helper function to update target reminders key in the global store
  const handleToggleReminder = (key, value) => {
    updateOnboardingData({
      reminders: {
        ...reminders,
        [key]: value,
      },
    });
  };

  return (
    <ScreenContainer>
      <ProgressHeader
        currentStep={5}
        totalSteps={6}
        title="Daily Reminders"
        subtitle="Choose which reminders you'd like to receive."
      />

      <ReminderRow
        title="🍽 Meal Reminders"
        value={reminders.mealReminder}
        onValueChange={(val) => handleToggleReminder('mealReminder', val)}
      />

      <ReminderRow
        title="💊 Medicine Reminders"
        value={reminders.medicineReminder}
        onValueChange={(val) => handleToggleReminder('medicineReminder', val)}
      />

      <ReminderRow
        title="🩸 Glucose Checks"
        value={reminders.glucoseReminder}
        onValueChange={(val) => handleToggleReminder('glucoseReminder', val)}
      />

      <ReminderRow
        title="🚶 Walking"
        value={reminders.walkReminder}
        onValueChange={(val) => handleToggleReminder('walkReminder', val)}
      />

      <ReminderRow
        title="💧 Water Intake"
        value={reminders.waterReminder}
        onValueChange={(val) => handleToggleReminder('waterReminder', val)}
      />

      <View style={{ flex: 1 }} />

      <OnboardingFooter
        onBack={() => navigation.goBack()}
        onNext={() => navigation.navigate('OnboardingComplete')}
      />
    </ScreenContainer>
  );
}

function ReminderRow({ title, value, onValueChange }) {
  return (
    <View style={styles.row}>
      <Text style={styles.text}>{title}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  text: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
  },
});