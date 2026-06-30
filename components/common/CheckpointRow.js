// components/CheckpointRow.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme';
import StatusBadge from './StatusBadge';

const DOT_COLOR = {
  done: colors.accent,
  now: colors.ink,
  pending: colors.pending,
  missed: colors.warn,
};

export default function CheckpointRow({ checkpoint, onPress }) {
  const { time, title, status } = checkpoint;
  const isDone = status === 'done';
  const isTappable = status === 'now' || status === 'pending';

  const Wrapper = isTappable ? TouchableOpacity : View;

  return (
    <Wrapper
      style={styles.row}
      onPress={isTappable ? () => onPress?.(checkpoint) : undefined}
      activeOpacity={0.6}
    >
      <Text style={styles.time}>{time}</Text>
      <View style={[styles.dot, { backgroundColor: DOT_COLOR[status] }]} />
      <Text style={[styles.title, isDone && styles.titleDone]} numberOfLines={1}>
        {title}
      </Text>
      <StatusBadge status={status} />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  time: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.inkFaint,
    minWidth: 44,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  title: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '500',
    color: colors.ink,
  },
  titleDone: {
    color: colors.inkFaint,
    textDecorationLine: 'line-through',
  },
});
