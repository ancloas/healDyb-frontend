import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import ScreenContainer from '../../components/common/ScreenContainer';
import PrimaryButton from '../../components/common/PrimaryButton';
import Colors from '../../constants/colors';
import AppContext from '../../context/AppContext';
import { saveUserProfile } from '../../database/repositories/UserRepository';

export default function OnboardingCompleteScreen({ navigation }) {
  const { onboardingData, completeOnboarding } = useContext(AppContext);
  const [isSaving, setIsSaving] = useState(false);

  const handleFinish = async () => {
    setIsSaving(true);
    try {
      await saveUserProfile({
        personal_info: onboardingData?.personal_info || {},
        diabetes_type: onboardingData?.diabetes_profile?.diabetes_type || '',
        diagnosis_date: onboardingData?.diabetes_profile?.diagnosis_date || '',
        food_preferences: onboardingData?.food_preference || [],
        medications: onboardingData?.medications || [],
        reminders: onboardingData?.reminders || {},
      });

      completeOnboarding();
    } catch (error) {
      console.error('Failed to save onboarding data to SQLite:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.icon}>🎉</Text>

        <Text style={styles.title}>You're All Set!</Text>

        <Text style={styles.subtitle}>
          HealDyb is ready to help you manage your diabetes every day.
        </Text>

        {isSaving ? (
          <View style={[styles.card, styles.center]}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.savingText}>Configuring your secure local database...</Text>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>What's next?</Text>
            <Text style={styles.item}>✓ Track blood glucose</Text>
            <Text style={styles.item}>✓ Log meals & medicines</Text>
            <Text style={styles.item}>✓ Receive smart reminders</Text>
            <Text style={styles.item}>✓ Monitor your health trends</Text>
          </View>
        )}
      </View>

      <PrimaryButton
        title={isSaving ? "Saving..." : "Start Using HealDyb"}
        onPress={handleFinish}
        disabled={isSaving}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 72,
    textAlign: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.text,
  },
  subtitle: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textSecondary,
    paddingHorizontal: 20,
  },
  card: {
    marginTop: 40,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#F7F8FA',
    minHeight: 180,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  savingText: {
    marginTop: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: Colors.text,
  },
  item: {
    fontSize: 16,
    marginBottom: 12,
    color: Colors.textSecondary,
  },
});