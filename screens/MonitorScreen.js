import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import ScreenContainer from '../components/common/ScreenContainer';
import SectionTitle from '../components/common/SectionTitle';

import TimeFilter from '../components/monitor/TimeFilter';
import TrendCard from '../components/monitor/TrendCard';
import MiniStatCard from '../components/monitor/MiniStatCard';
import InsightCard from '../components/monitor/InsightCard';
import { loadHealthHistory } from '../database/repositories/HealthRepository';

export default function MonitorScreen() {
  const [weightLogs, setWeightLogs] = useState([]);
  const [glucoseLogs, setGlucoseLogs] = useState([]);
  const [bpLogs, setBpLogs] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const [weights, glucose, bloodPressure] = await Promise.all([
        loadHealthHistory('weight'),
        loadHealthHistory('glucose'),
        loadHealthHistory('blood_pressure'),
      ]);

      setWeightLogs(weights || []);
      setGlucoseLogs(glucose || []);
      setBpLogs(bloodPressure || []);
    } catch (error) {
      console.error('Failed to load monitor data:', error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const latestWeight = weightLogs[0] ? Number(weightLogs[0].value) : null;
  const latestGlucose = glucoseLogs[0] ? Number(glucoseLogs[0].value) : null;
  const latestBp = bpLogs[0]?.value || null;
  const weightTrend = latestWeight ? `${latestWeight.toFixed(1)} kg` : 'No data';
  const glucoseTrend = latestGlucose ? `${latestGlucose} mg/dL` : 'No data';
  const bpTrend = latestBp || 'No data';

  return (
    <ScreenContainer>

      <SectionTitle>
        Your Progress
      </SectionTitle>

      <TimeFilter />

      <TrendCard
        title="Weight"
        value={weightTrend}
        subtitle={weightLogs.length > 1 ? 'Tracked from recent entries' : 'Log your first weight entry'}
        data={weightLogs.map((log) => Number(log.value))}
      />

      <TrendCard
        title="Blood Glucose"
        value={glucoseTrend}
        subtitle={glucoseLogs.length > 1 ? 'Recent glucose trend' : 'Log your first glucose entry'}
        data={glucoseLogs.map((log) => Number(log.value))}
      />

      <TrendCard
        title="Blood Pressure"
        value={bpTrend}
        subtitle={bpLogs.length > 1 ? 'Recent blood pressure readings' : 'Log your first BP entry'}
        data={bpLogs.map((log) => String(log.value))}
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