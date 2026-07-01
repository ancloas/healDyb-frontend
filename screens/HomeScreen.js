import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import ScreenContainer from '../components/common/ScreenContainer';
import SectionTitle from '../components/common/SectionTitle';

import HomeHeader from '../components/home/HomeHeader';
import NextCheckinCard from '../components/home/NextCheckinCard';
import CheckpointItem from '../components/home/CheckpointItem';
import QuickStatCard from '../components/home/QuickStatCard';

import AppContext from '../context/AppContext';
import { loadUserProfile } from '../database/repositories/UserRepository';

export default function HomeScreen() {
  const [activeProfile, setActiveProfile] = useState(null);

  // Backup context state fallback (in case the database is still warming up)
  const { onboardingData } = useContext(AppContext);

  useEffect(() => {
    let isMounted = true;

    async function fetchProfile() {
      try {
        const savedProfile = await loadUserProfile();
        if (isMounted) {
          setActiveProfile(savedProfile);
        }
      } catch (error) {
        console.error('Failed to load profile from SQLite:', error);
      }
    }

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const personalInfo = activeProfile?.personal_info || onboardingData?.personal_info || {};
  const medications = activeProfile?.medications || onboardingData?.medications || [];
  const reminders = activeProfile?.reminders || onboardingData?.reminders || {};

  // 4. Dynamically generate today's checklist checkpoints using real user settings
  const dynamicCheckpoints = [];
  
  if (reminders.glucoseReminder) {
    dynamicCheckpoints.push({ id: 'gl-1', time: '08:00 AM', title: 'Fasting Blood Glucose Check', status: 'pending' });
  }
  
  // Inject explicit custom cards for each real medication added during onboarding
  medications.forEach((med, index) => {
    dynamicCheckpoints.push({
      id: `med-${index}`,
      time: med.timing?.includes('Morning') ? '09:00 AM' : '02:00 PM',
      title: `Take Medication: ${med.name} (${med.dosage})`,
      status: 'pending',
    });
  });

  if (reminders.walkReminder) {
    dynamicCheckpoints.push({ id: 'wk-1', time: '06:00 PM', title: 'Post-Dinner Walk (30 mins)', status: 'pending' });
  }

  // Fallback to generic message if the user skipped adding any daily tasks
  if (dynamicCheckpoints.length === 0) {
    dynamicCheckpoints.push({ id: 'empty', time: 'All Day', title: 'Log your meals and maintain health balance', status: 'completed' });
  }

  return (
    <ScreenContainer>
      {/* Dynamic Welcome text inside HomeHeader based on personalInfo.name */}
      <HomeHeader userName={personalInfo.name || 'Friend'} />

      <NextCheckinCard nextTask={dynamicCheckpoints[0]?.title} time={dynamicCheckpoints[0]?.time} />

      <SectionTitle>Today's Checkpoints</SectionTitle>

      {dynamicCheckpoints.map((checkpoint) => (
        <CheckpointItem
          key={checkpoint.id}
          time={checkpoint.time}
          title={checkpoint.title}
          status={checkpoint.status}
        />
      ))}

      <SectionTitle>Quick Stats</SectionTitle>

      <View style={styles.statsRow}>
        <QuickStatCard
          label="Weight"
          value={personalInfo.weight ? `${personalInfo.weight} kg` : '-- kg'}
        />

        <QuickStatCard
          label="Glucose"
          value="128 mg/dL" // Will be linked to your future dynamic Glucose log table
        />
      </View>

      <View style={styles.statsRow}>
        <QuickStatCard
          label="Steps"
          value={reminders.walkReminder ? "0 / 6,000" : "--"}
        />

        <QuickStatCard
          label="Sleep"
          value="--h --m"
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
});