import React from 'react';
import { View, StyleSheet } from 'react-native';

import ScreenContainer from '../components/common/ScreenContainer';
import SectionTitle from '../components/common/SectionTitle';

import HomeHeader from '../components/home/HomeHeader';
import NextCheckinCard from '../components/home/NextCheckinCard';
import CheckpointItem from '../components/home/CheckpointItem';
import QuickStatCard from '../components/home/QuickStatCard';
import { todayCheckpoints } from '../data/mockData';

export default function HomeScreen( ) {
  return (
    <ScreenContainer>

      <HomeHeader />

      <NextCheckinCard />

      <SectionTitle>
        Today's Checkpoints
      </SectionTitle>

     {todayCheckpoints.map((checkpoint) => (
        <CheckpointItem
          key={checkpoint.id}
          time={checkpoint.time}
          title={checkpoint.title}
          status={checkpoint.status}
        />
      ))}

      <SectionTitle>
        Quick Stats
      </SectionTitle>

      <View style={styles.statsRow}>
        <QuickStatCard
          label="Weight"
          value="86.2 kg"
        />

        <QuickStatCard
          label="Glucose"
          value="128 mg/dL"
        />
      </View>

      <View style={styles.statsRow}>
        <QuickStatCard
          label="Steps"
          value="6,245"
        />

        <QuickStatCard
          label="Sleep"
          value="7h 15m"
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