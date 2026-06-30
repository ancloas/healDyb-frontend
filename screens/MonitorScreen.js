import React from 'react';
import { StyleSheet } from 'react-native';

import ScreenContainer from '../components/common/ScreenContainer';
import SectionTitle from '../components/common/SectionTitle';

import TimeFilter from '../components/monitor/TimeFilter';
import TrendCard from '../components/monitor/TrendCard';
import MiniStatCard from '../components/monitor/MiniStatCard';
import InsightCard from '../components/monitor/InsightCard';

export default function MonitorScreen() {
  return (
    <ScreenContainer>

      <SectionTitle>
        Your Progress
      </SectionTitle>

      <TimeFilter />

      <TrendCard
        title="Weight"
        value="86.2 kg"
        subtitle="-1.8 kg this month"
      />

      <TrendCard
        title="Blood Glucose"
        value="124 mg/dL"
        subtitle="Stable"
      />

      <TrendCard
        title="Blood Pressure"
        value="118 / 78"
        subtitle="Healthy"
      />

      <SectionTitle>
        Activity
      </SectionTitle>

      <MiniStatCard
        label="Average Steps"
        value="6,245"
      />

      <MiniStatCard
        label="Average Sleep"
        value="7h 15m"
      />

      <MiniStatCard
        label="BMI"
        value="28.4"
      />

      <SectionTitle>
        AI Insights
      </SectionTitle>

      <InsightCard
        text="Your fasting glucose has improved by 8% over the last month. Keep maintaining your morning walk routine."
      />

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});