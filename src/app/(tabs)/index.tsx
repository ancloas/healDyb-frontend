import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, Colors } from '@/constants/theme';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const styles = createStyles(colors);

  // Mock data
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const checkpoints = [
    { time: '8 AM', label: 'Morning walk', status: 'done', done: true },
    { time: '10 AM', label: 'Breakfast logged', status: 'done', done: true },
    { time: '12 PM', label: 'Lunch check-in', status: 'now', done: false },
    { time: '3 PM', label: 'No activity logged', status: 'upcoming', done: false },
    { time: '5 PM', label: 'Chai sugar log', status: 'upcoming', done: false },
    { time: '8 PM', label: 'Dinner + walk', status: 'upcoming', done: false },
    { time: '10 PM', label: 'Sleep tracking starts', status: 'upcoming', done: false },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]} edges={['top']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.homeTop}>
          <Text style={[styles.dateRow, { color: colors.inkSoft }]}>{dateStr}</Text>
          <View style={[styles.streakChip, { backgroundColor: colors.ink }]}>
            <Text style={{ color: colors.surface, fontSize: 11, fontWeight: '700' }}>
              🔥 12 day streak
            </Text>
          </View>
        </View>

        {/* Next Check-in Card */}
        <View style={[styles.nextCard, { backgroundColor: colors.surface, borderColor: colors.line }]}>
          <Text style={[styles.nextLabel, { color: colors.inkFaint }]}>NEXT CHECK-IN</Text>
          <View style={styles.nextRow}>
            <Text style={[styles.nextTime, { color: colors.ink }]}>12 PM</Text>
            <Text style={[styles.nextText, { color: colors.ink }]}>Lunch — kya khaya?</Text>
          </View>
          <View style={styles.nextActions}>
            <Pressable
              style={[styles.btnYes, { backgroundColor: colors.accent }]}>
              <Text style={{ color: colors.surface, fontSize: 13, fontWeight: '700' }}>Log now</Text>
            </Pressable>
            <Pressable style={[styles.btnNo, { backgroundColor: colors.pending }]}>
              <Text style={[{ fontSize: 13, fontWeight: '700' }, { color: colors.inkSoft }]}>
                Remind in 30 min
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Section Label */}
        <Text style={[styles.sectionLabel, { color: colors.inkFaint }]}>TODAY'S CHECKPOINTS</Text>

        {/* Checkpoints */}
        {checkpoints.map((cp, idx) => (
          <CheckpointRow key={idx} checkpoint={cp} colors={colors} styles={styles} />
        ))}

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <QuickStat label="Weight" value="86.2 kg" delta="↓ 3.8 kg" colors={colors} styles={styles} />
          <QuickStat
            label="Glucose (fasting)"
            value="128"
            delta="↓ 14 pts"
            colors={colors}
            styles={styles}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function CheckpointRow({
  checkpoint,
  colors,
  styles,
}: {
  checkpoint: { time: string; label: string; status: string; done: boolean };
  colors: typeof Colors.light;
  styles: ReturnType<typeof createStyles>;
}) {
  const dotColor = checkpoint.done ? colors.accent : colors.pending;
  const statusBg = checkpoint.done
    ? colors.accentTint
    : checkpoint.status === 'now'
      ? colors.pending
      : colors.pending;
  const statusTextColor = checkpoint.done
    ? colors.accent
    : checkpoint.status === 'now'
      ? colors.inkFaint
      : colors.inkFaint;

  return (
    <View style={[styles.checkpoint, { borderBottomColor: colors.line }]}>
      <Text style={[styles.cpTime, { color: colors.inkFaint }]}>{checkpoint.time}</Text>
      <View style={[styles.cpDot, { backgroundColor: dotColor }]} />
      <Text
        style={[
          styles.cpText,
          {
            color: checkpoint.done ? colors.inkFaint : colors.ink,
            textDecorationLine: checkpoint.done ? 'line-through' : 'none',
          },
        ]}>
        {checkpoint.label}
      </Text>
      <View style={[styles.cpStatus, { backgroundColor: statusBg }]}>
        <Text style={[{ fontSize: 11, fontWeight: '700' }, { color: statusTextColor }]}>
          {checkpoint.status === 'done'
            ? 'Done'
            : checkpoint.status === 'now'
              ? 'Now'
              : 'Upcoming'}
        </Text>
      </View>
    </View>
  );
}

function QuickStat({
  label,
  value,
  delta,
  colors,
  styles,
}: {
  label: string;
  value: string;
  delta: string;
  colors: typeof Colors.light;
  styles: ReturnType<typeof createStyles>;
}) {
  return (
    <View style={[styles.qstat, { backgroundColor: colors.surface, borderColor: colors.line }]}>
      <Text style={[styles.qstatLabel, { color: colors.inkFaint }]}>{label}</Text>
      <Text style={[styles.qstatVal, { color: colors.ink }]}>{value}</Text>
      <Text style={[styles.qstatDelta, { color: colors.accent }]}>{delta}</Text>
    </View>
  );
}

const createStyles = (colors: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      padding: 16,
      paddingBottom: BottomTabInset + 20,
    },
    homeTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    dateRow: {
      fontSize: 12,
      fontWeight: '600',
    },
    streakChip: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 20,
      fontSize: 11,
      fontWeight: '700',
    },
    nextCard: {
      borderRadius: 18,
      borderWidth: 1,
      padding: 18,
      marginBottom: 14,
    },
    nextLabel: {
      fontSize: 10.5,
      fontWeight: '800',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      marginBottom: 8,
    },
    nextRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    nextTime: {
      fontSize: 22,
      fontWeight: '800',
      minWidth: 64,
    },
    nextText: {
      fontSize: 14.5,
      fontWeight: '600',
      flex: 1,
      lineHeight: 20,
    },
    nextActions: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 14,
    },
    btnYes: {
      flex: 1,
      borderRadius: 12,
      paddingVertical: 11,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnNo: {
      flex: 1,
      borderRadius: 12,
      paddingVertical: 11,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sectionLabel: {
      fontSize: 10.5,
      fontWeight: '800',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      marginVertical: 18,
      marginBottom: 10,
    },
    checkpoint: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 12,
      paddingHorizontal: 4,
      borderBottomWidth: 1,
    },
    cpTime: {
      fontSize: 12,
      fontWeight: '700',
      minWidth: 44,
    },
    cpDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      flexShrink: 0,
    },
    cpText: {
      flex: 1,
      fontSize: 13.5,
      fontWeight: '500',
    },
    cpStatus: {
      borderRadius: 8,
      paddingVertical: 3,
      paddingHorizontal: 9,
    },
    quickStats: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 18,
    },
    qstat: {
      flex: 1,
      borderRadius: 14,
      borderWidth: 1,
      padding: 12,
    },
    qstatLabel: {
      fontSize: 10,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.4,
      marginBottom: 4,
    },
    qstatVal: {
      fontSize: 17,
      fontWeight: '800',
    },
    qstatDelta: {
      fontSize: 10.5,
      fontWeight: '700',
      marginTop: 1,
    },
  });
