// screens/FeedbackScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors, spacing, radius } from '../theme';
import { feedbackByOption } from '../data/mockData';

export default function FeedbackScreen({ route, navigation }) {
  const { optionId } = route.params || {};
  const feedback = feedbackByOption[optionId] || feedbackByOption.dal_roti;

  const handleDone = () => {
    // Pop back to Home, clearing the Checkin/Feedback stack.
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.top}>
        <TouchableOpacity onPress={handleDone}>
          <Text style={styles.dismiss}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mid}>
        <View style={styles.badge}>
          <Text style={styles.badgeEmoji}>{feedback.emoji}</Text>
        </View>

        <Text style={styles.headline}>{feedback.headline}</Text>
        <Text style={styles.detail}>{feedback.detail}</Text>

        <View style={styles.dataRow}>
          {feedback.dataChips.map((chip, idx) => (
            <View key={idx} style={styles.dataChip}>
              <Text style={styles.dataLabel}>{chip.label}</Text>
              <Text style={styles.dataValue}>{chip.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.nextBox}>
          <Text style={styles.nextText}>
            <Text style={styles.nextBold}>Next time: </Text>
            {feedback.nextTip}
          </Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.doneBtn} onPress={handleDone} activeOpacity={0.85}>
          <Text style={styles.doneText}>Got it</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },

  top: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  dismiss: { fontSize: 16, color: colors.inkFaint, fontWeight: '600' },

  mid: { flex: 1, paddingHorizontal: spacing.xxl, justifyContent: 'center' },

  badge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.accentTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  badgeEmoji: { fontSize: 24 },

  headline: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.ink,
    lineHeight: 26,
    marginBottom: 10,
  },
  detail: {
    fontSize: 13.5,
    color: colors.inkSoft,
    lineHeight: 20,
    marginBottom: 18,
  },

  dataRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
  dataChip: {
    flex: 1,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    padding: 10,
  },
  dataLabel: {
    fontSize: 10,
    color: colors.inkFaint,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  dataValue: { fontSize: 14, fontWeight: '800', color: colors.ink, marginTop: 2 },

  nextBox: {
    backgroundColor: colors.bg,
    borderLeftWidth: 3,
    borderLeftColor: colors.ink,
    borderRadius: 8,
    padding: 14,
  },
  nextText: { fontSize: 12.5, color: colors.inkSoft, lineHeight: 19 },
  nextBold: { color: colors.ink, fontWeight: '700' },

  bottom: { paddingHorizontal: spacing.xxl, paddingBottom: 28, paddingTop: 16 },
  doneBtn: {
    backgroundColor: colors.ink,
    borderRadius: radius.lg,
    paddingVertical: 15,
    alignItems: 'center',
  },
  doneText: { color: '#FFF', fontSize: 14.5, fontWeight: '700' },
});
