import { ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, Colors } from '@/constants/theme';

export default function MonitorScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]} edges={['top']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: colors.ink }]}>This week</Text>
        <Text style={[styles.subtitle, { color: colors.inkFaint }]}>14 Jun – 20 Jun</Text>

        {/* Weight Metric */}
        <View style={[styles.metricRow, { backgroundColor: colors.surface, borderColor: colors.line }]}>
          <View style={[styles.metricIcon, { backgroundColor: colors.bg }]}>
            <Text>⚖️</Text>
          </View>
          <View style={styles.metricMid}>
            <Text style={[styles.metricLabel, { color: colors.inkFaint }]}>Weight</Text>
            <Text style={[styles.metricValue, { color: colors.ink }]}>86.2 kg</Text>
          </View>
          <View style={styles.metricRight}>
            <Text style={[styles.metricTrend, styles.trendGood, { color: colors.accent }]}>↓ 0.6 kg</Text>
            <Text style={[styles.metricDue, { color: colors.inkFaint }]}>logged Sun</Text>
          </View>
        </View>

        {/* Glucose Metric */}
        <View style={[styles.metricRow, { backgroundColor: colors.surface, borderColor: colors.line }]}>
          <View style={[styles.metricIcon, { backgroundColor: colors.bg }]}>
            <Text>🩸</Text>
          </View>
          <View style={styles.metricMid}>
            <Text style={[styles.metricLabel, { color: colors.inkFaint }]}>Fasting glucose</Text>
            <Text style={[styles.metricValue, { color: colors.ink }]}>128 mg/dL</Text>
          </View>
          <View style={styles.metricRight}>
            <Text style={[styles.metricTrend, styles.trendGood, { color: colors.accent }]}>↓ 6 pts</Text>
            <Text style={[styles.metricDue, { color: colors.inkFaint }]}>logged today</Text>
          </View>
        </View>

        {/* Blood Pressure Metric */}
        <View style={[styles.metricRow, { backgroundColor: colors.surface, borderColor: colors.line }]}>
          <View style={[styles.metricIcon, { backgroundColor: colors.bg }]}>
            <Text>💗</Text>
          </View>
          <View style={styles.metricMid}>
            <Text style={[styles.metricLabel, { color: colors.inkFaint }]}>Blood pressure</Text>
            <Text style={[styles.metricValue, { color: colors.ink }]}>—</Text>
          </View>
          <View style={styles.metricRight}>
            <Text style={[styles.metricTrend, styles.trendFlag, { color: colors.warn }]}>Due today</Text>
            <Text style={[styles.metricDue, { color: colors.inkFaint }]}>last: 5 days ago</Text>
          </View>
        </View>

        {/* Sleep Metric */}
        <View style={[styles.metricRow, { backgroundColor: colors.surface, borderColor: colors.line }]}>
          <View style={[styles.metricIcon, { backgroundColor: colors.bg }]}>
            <Text>😴</Text>
          </View>
          <View style={styles.metricMid}>
            <Text style={[styles.metricLabel, { color: colors.inkFaint }]}>Sleep avg</Text>
            <Text style={[styles.metricValue, { color: colors.ink }]}>6h 40m</Text>
          </View>
          <View style={styles.metricRight}>
            <Text style={[styles.metricTrend, styles.trendFlag, { color: colors.warn }]}>Below 7h target</Text>
            <Text style={[styles.metricDue, { color: colors.inkFaint }]}>auto-tracked</Text>
          </View>
        </View>

        {/* Adherence Section */}
        <Text style={[styles.sectionLabel, { color: colors.inkFaint }]}>Check-in adherence</Text>

        <AdherenceBar label="Breakfast" percentage={86} colors={colors} styles={styles} />
        <AdherenceBar label="Lunch" percentage={100} colors={colors} styles={styles} />
        <AdherenceBar label="Dinner walk" percentage={57} colors={colors} styles={styles} />
        <AdherenceBar label="Chai log" percentage={71} colors={colors} styles={styles} />

        {/* 7-day Activity */}
        <Text style={[styles.sectionLabel, { color: colors.inkFaint }]}>7-day activity</Text>
        <View style={styles.weekGrid}>
          <DayCell day="M" status="full" colors={colors} styles={styles} />
          <DayCell day="T" status="full" colors={colors} styles={styles} />
          <DayCell day="W" status="partial" colors={colors} styles={styles} />
          <DayCell day="T" status="full" colors={colors} styles={styles} />
          <DayCell day="F" status="full" colors={colors} styles={styles} />
          <DayCell day="S" status="empty" colors={colors} styles={styles} />
          <DayCell day="S" status="partial" colors={colors} styles={styles} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function AdherenceBar({
  label,
  percentage,
  colors,
  styles,
}: {
  label: string;
  percentage: number;
  colors: typeof Colors.light;
  styles: ReturnType<typeof createStyles>;
}) {
  return (
    <View style={styles.adherenceRow}>
      <Text style={[styles.adhLabel, { color: colors.inkSoft }]}>{label}</Text>
      <View style={[styles.adhTrack, { backgroundColor: colors.pending }]}>
        <View
          style={[
            styles.adhFill,
            { backgroundColor: colors.accent, width: `${percentage}%` },
          ]}
        />
      </View>
      <Text style={[styles.adhPct, { color: colors.ink }]}>{percentage}%</Text>
    </View>
  );
}

function DayCell({
  day,
  status,
  colors,
  styles,
}: {
  day: string;
  status: 'full' | 'partial' | 'empty';
  colors: typeof Colors.light;
  styles: ReturnType<typeof createStyles>;
}) {
  const bgColor =
    status === 'full'
      ? colors.accent
      : status === 'partial'
        ? colors.warnTint
        : colors.pending;
  const textColor =
    status === 'full' ? colors.surface : status === 'partial' ? colors.warn : colors.inkFaint;

  return (
    <View
      style={[
        styles.dayCell,
        { backgroundColor: bgColor },
      ]}>
      <Text style={[{ color: textColor, fontWeight: '700', fontSize: 10 }]}>{day}</Text>
    </View>
  );
}

const createStyles = (colors: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      padding: 18,
      paddingBottom: BottomTabInset + 20,
    },
    title: {
      fontSize: 18,
      fontWeight: '800',
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 12.5,
      marginBottom: 18,
    },
    metricRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingHorizontal: 15,
      paddingVertical: 13,
      marginBottom: 9,
      borderRadius: 14,
      borderWidth: 1,
    },
    metricIcon: {
      width: 34,
      height: 34,
      borderRadius: 9,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 15,
    },
    metricMid: {
      flex: 1,
    },
    metricLabel: {
      fontSize: 12,
      fontWeight: '600',
      marginBottom: 1,
    },
    metricValue: {
      fontSize: 16,
      fontWeight: '800',
      marginTop: 1,
    },
    metricRight: {
      alignItems: 'flex-end',
    },
    metricTrend: {
      fontSize: 11,
      fontWeight: '700',
    },
    trendGood: {},
    trendFlag: {},
    metricDue: {
      fontSize: 10,
      marginTop: 2,
    },
    sectionLabel: {
      fontSize: 10.5,
      fontWeight: '800',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      marginVertical: 18,
      marginTop: 18,
      marginBottom: 10,
    },
    adherenceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 8,
    },
    adhLabel: {
      fontSize: 11.5,
      fontWeight: '600',
      width: 90,
      flexShrink: 0,
    },
    adhTrack: {
      flex: 1,
      height: 8,
      borderRadius: 4,
      overflow: 'hidden',
    },
    adhFill: {
      height: '100%',
      borderRadius: 4,
    },
    adhPct: {
      fontSize: 11.5,
      fontWeight: '700',
      width: 32,
      textAlign: 'right',
    },
    weekGrid: {
      display: 'flex',
      flexDirection: 'row',
      gap: 6,
      marginTop: 4,
    },
    dayCell: {
      flex: 1,
      aspectRatio: 1,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
