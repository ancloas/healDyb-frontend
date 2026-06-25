// screens/CheckinScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors, spacing, radius } from '../theme';
import { lunchCheckin } from '../data/mockData';

export default function CheckinScreen({ navigation }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleConfirm = () => {
    if (!selectedId) return;
    // In production: persist the answer, update today's checkpoint status.
    navigation.replace('Feedback', { optionId: selectedId });
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.tag}>{lunchCheckin.tag}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.dismiss}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Question + options */}
      <View style={styles.mid}>
        <Text style={styles.question}>{lunchCheckin.question}</Text>

        <View style={styles.optionList}>
          {lunchCheckin.options.map((opt) => {
            const selected = opt.id === selectedId;
            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.option, selected && styles.optionSelected]}
                onPress={() => setSelectedId(opt.id)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.optionText,
                    selected && styles.optionTextSelected,
                  ]}
                >
                  {opt.label}
                </Text>
                {selected && <Text style={styles.checkMark}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Bottom actions */}
      <View style={styles.bottom}>
        <TouchableOpacity
          style={[styles.confirmBtn, !selectedId && styles.confirmBtnDisabled]}
          onPress={handleConfirm}
          disabled={!selectedId}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.skipLink}>Skip — remind me later</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  tag: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.inkFaint,
  },
  dismiss: { fontSize: 16, color: colors.inkFaint, fontWeight: '600' },

  mid: { flex: 1, paddingHorizontal: spacing.xxl, justifyContent: 'center' },
  question: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.ink,
    lineHeight: 32,
    marginBottom: 28,
  },

  optionList: { gap: 10 },
  option: {
    backgroundColor: colors.bg,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: radius.lg,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionSelected: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  optionText: { fontSize: 14.5, fontWeight: '600', color: colors.ink },
  optionTextSelected: { color: '#FFF' },
  checkMark: { color: '#FFF', fontSize: 14, fontWeight: '700' },

  bottom: { paddingHorizontal: spacing.xxl, paddingBottom: 28, paddingTop: 20 },
  confirmBtn: {
    backgroundColor: colors.ink,
    borderRadius: radius.lg,
    paddingVertical: 15,
    alignItems: 'center',
  },
  confirmBtnDisabled: { opacity: 0.35 },
  confirmText: { color: '#FFF', fontSize: 14.5, fontWeight: '700' },
  skipLink: {
    textAlign: 'center',
    fontSize: 12.5,
    color: colors.inkFaint,
    fontWeight: '600',
    paddingTop: 14,
  },
});
