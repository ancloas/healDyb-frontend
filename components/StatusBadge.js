// components/StatusBadge.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../theme';

const STATUS_CONFIG = {
  done: { bg: colors.accentTint, color: colors.accent, label: 'Done' },
  now: { bg: colors.pending, color: colors.ink, label: 'Now' },
  pending: { bg: colors.pending, color: colors.inkFaint, label: 'Upcoming' },
  missed: { bg: colors.warnTint, color: colors.warn, label: 'Missed' },
};

export default function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      <Text style={[styles.text, { color: cfg.color }]}>{cfg.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});
