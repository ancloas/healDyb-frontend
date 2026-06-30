import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import ScreenContainer from '../../components/common/ScreenContainer';
import PrimaryButton from '../../components/common/PrimaryButton';
import Colors from '../../constants/colors';

export default function WelcomeScreen({ navigation }) {
  return (
    <ScreenContainer>

      <View style={styles.container}>

        <Text style={styles.emoji}>
          💙
        </Text>

        <Text style={styles.title}>
          Welcome to HealDyb
        </Text>

        <Text style={styles.subtitle}>
          Your personal diabetes companion.
        </Text>

        <Text style={styles.description}>
          We'll ask a few quick questions to personalize your reminders,
          medications and daily health plan.
        </Text>

        <View style={styles.infoCard}>

          <Text style={styles.infoTitle}>
            During setup we'll help you:
          </Text>

          <Text style={styles.infoItem}>
            ✓ Create your health profile
          </Text>

          <Text style={styles.infoItem}>
            ✓ Add medications
          </Text>

          <Text style={styles.infoItem}>
            ✓ Configure reminders
          </Text>

          <Text style={styles.infoItem}>
            ✓ Personalize food recommendations
          </Text>

        </View>

      </View>

      <PrimaryButton
        title="Get Started"
        onPress={() => navigation.navigate('PersonalInfo')}
      />

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
  },

  emoji: {
    fontSize: 72,
    textAlign: 'center',
    marginBottom: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 12,
    fontSize: 18,
    color: Colors.primary,
    textAlign: 'center',
  },

  description: {
    marginTop: 24,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.textSecondary,
    paddingHorizontal: 20,
  },

  infoCard: {
    marginTop: 40,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    color: Colors.text,
  },

  infoItem: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 12,
  },

});