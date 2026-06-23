// screens/HomeScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors, spacing, radius, type } from '../theme';
import CheckpointRow from '../components/CheckpointRow';
import {
  todayCheckpoints,
  quickStats,
  streak,
} from '../data/mockData';

export default function HomeScreen({ navigation }) {
  // The "next" card always shows the first checkpoint with status 'now'.
  // If none is 'now', fall back to the next 'pending' one.
  const nextCheckpoint =
    todayCheckpoints.find((c) => c.status === 'now') ||
    todayCheckpoints.find((c) => c.status === 'pending');

  const handleCheckpointPress = (checkpoint) => {
    if (checkpoint.type === 'meal' && checkpoint.id === 'lunch') {
      navigation.navigate('Checkin', { checkpointId: checkpoint.id });
    }
    // Other checkpoint types (activity, sleep, habit) would route to
    // their own quick-log flows here. Lunch is wired for the demo.
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top row: date + streak */}
        <View style={styles.topRow}>
          <Text style={styles.date}>Mon, 21 June</Text>
          <View style={styles.streakChip}>
            <Text style={styles.streakText}>🔥 {streak} day streak</Text>
          </View>
        </View>

        {/* Next action card */}
        {nextCheckpoint && (
          <View style={styles.nextCard}>
            <Text style={type.label}>NEXT CHECK-IN</Text>
            <View style={styles.nextRow}>
              <Text style={styles.nextTime}>{nextCheckpoint.time}</Text>
              <Text style={styles.nextText}>{nextCheckpoint.title}</Text>
            </View>
            <View style={styles.nextActions}>
              <TouchableOpacity
                style={styles.btnYes}
                onPress={() => handleCheckpointPress(nextCheckpoint)}
                activeOpacity={0.85}
              >
                <Text style={styles.btnYesText}>Log now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnNo} activeOpacity={0.85}>
                <Text style={styles.btnNoText}>Remind in 30 min</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Today's checkpoints */}
        <Text style={[type.label, styles.sectionLabel]}>
          TODAY'S CHECKPOINTS
        </Text>
        <View style={styles.timelineCard}>
          {todayCheckpoints.map((cp) => (
            <CheckpointRow
              key={cp.id}
              checkpoint={cp}
              onPress={handleCheckpointPress}
            />
          ))}
        </View>

        {/* Quick stats */}
        <View style={styles.statsRow}>
          {quickStats.map((stat) => (
            <View key={stat.id} style={styles.statCard}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statDelta}>{stat.delta}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  scrollContent: { padding: spacing.lg, paddingBottom: 40 },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  date: { fontSize: 12, color: colors.inkSoft, fontWeight: '600' },
  streakChip: {
    backgroundColor: colors.ink,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  streakText: { fontSize: 11, fontWeight: '700', color: '#FFF' },

  nextCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.xl,
    padding: 18,
    marginBottom: spacing.md,
  },
  nextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  nextTime: { fontSize: 22, fontWeight: '800', color: colors.ink, minWidth: 64 },
  nextText: { fontSize: 14.5, fontWeight: '600', color: colors.ink, flex: 1 },
  nextActions: { flexDirection: 'row', gap: 8, marginTop: 14 },
  btnYes: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: 11,
    alignItems: 'center',
  },
  btnYesText: { color: '#FFF', fontSize: 13, fontWeight: '700' },
  btnNo: {
    flex: 1,
    backgroundColor: colors.pending,
    borderRadius: radius.md,
    paddingVertical: 11,
    alignItems: 'center',
  },
  btnNoText: { color: colors.inkSoft, fontSize: 13, fontWeight: '700' },

  sectionLabel: { marginTop: spacing.lg, marginBottom: spacing.sm },

  timelineCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
  },

  statsRow: { flexDirection: 'row', gap: 10, marginTop: spacing.lg },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.lg,
    padding: 14,
  },
  statLabel: {
    fontSize: 10,
    color: colors.inkFaint,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  statValue: { fontSize: 17, fontWeight: '800', color: colors.ink },
  statDelta: { fontSize: 10.5, fontWeight: '700', color: colors.accent, marginTop: 1 },
});
