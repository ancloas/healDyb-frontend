import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

export default function LogScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const styles = createStyles(colors);

  const [glucoseValue, setGlucoseValue] = useState(128);
  const [when, setWhen] = useState<'morning' | 'evening'>('morning');
  const [source, setSource] = useState<'photo' | 'manual'>('photo');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]} edges={['top']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Log glucose</Text>
          <Pressable>
            <Text style={styles.closeBtn}>✕</Text>
          </Pressable>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>FASTING GLUCOSE (mg/dL)</Text>
          <View style={styles.inputRow}>
            <Pressable
              style={styles.stepBtn}
              onPress={() => setGlucoseValue(Math.max(0, glucoseValue - 1))}>
              <Text style={styles.stepBtnText}>−</Text>
            </Pressable>
            <Text style={styles.inputNum}>{glucoseValue}</Text>
            <Pressable
              style={styles.stepBtn}
              onPress={() => setGlucoseValue(glucoseValue + 1)}>
              <Text style={styles.stepBtnText}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>WHEN</Text>
          <View style={styles.chipRow}>
            <Pressable
              style={[styles.chip, when === 'morning' && styles.chipSelected]}
              onPress={() => setWhen('morning')}>
              <Text style={[styles.chipText, when === 'morning' && styles.chipTextSelected]}>
                Morning
              </Text>
            </Pressable>
            <Pressable
              style={[styles.chip, when === 'evening' && styles.chipSelected]}
              onPress={() => setWhen('evening')}>
              <Text style={[styles.chipText, when === 'evening' && styles.chipTextSelected]}>
                Evening
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>SOURCE</Text>
          <View style={styles.chipRow}>
            <Pressable
              style={[styles.chip, source === 'photo' && styles.chipSelected]}
              onPress={() => setSource('photo')}>
              <Text style={[styles.chipText, source === 'photo' && styles.chipTextSelected]}>
                Glucometer photo
              </Text>
            </Pressable>
            <Pressable
              style={[styles.chip, source === 'manual' && styles.chipSelected]}
              onPress={() => setSource('manual')}>
              <Text style={[styles.chipText, source === 'manual' && styles.chipTextSelected]}>
                Manual
              </Text>
            </Pressable>
          </View>
        </View>

        {source === 'photo' && (
          <View style={[styles.infoBox, { backgroundColor: colors.accentTint }]}>
            <Text style={{ color: colors.accent, fontWeight: '700', fontSize: 12.5 }}>
              📷 Scanned from glucometer
            </Text>
            <Text
              style={{
                color: colors.accent,
                fontSize: 11.5,
                marginTop: 4,
                opacity: 0.85,
              }}>
              Auto-filled. Confirm value is correct.
            </Text>
          </View>
        )}

        <Pressable style={[styles.btn, styles.btnPrimary, { marginTop: 24 }]}>
          <Text style={styles.btnText}>Save reading</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: typeof Colors.light) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      padding: 18,
      paddingBottom: 100,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 18,
    },
    title: {
      fontSize: 18,
      fontWeight: '800',
      color: colors.ink,
    },
    closeBtn: {
      fontSize: 13,
      color: colors.inkFaint,
      fontWeight: '600',
    },
    field: {
      marginBottom: 16,
    },
    fieldLabel: {
      fontSize: 11.5,
      fontWeight: '700',
      color: colors.inkSoft,
      marginBottom: 8,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.bg,
      borderWidth: 1,
      borderColor: colors.line,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
      gap: 10,
    },
    stepBtn: {
      width: 32,
      height: 32,
      borderRadius: 8,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.line,
      justifyContent: 'center',
      alignItems: 'center',
    },
    stepBtnText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.ink,
    },
    inputNum: {
      fontSize: 22,
      fontWeight: '800',
      color: colors.ink,
      flex: 1,
      textAlign: 'center',
    },
    chipRow: {
      flexDirection: 'row',
      gap: 8,
      flexWrap: 'wrap',
    },
    chip: {
      paddingHorizontal: 15,
      paddingVertical: 9,
      borderRadius: 20,
      backgroundColor: colors.bg,
      borderWidth: 1,
      borderColor: colors.line,
    },
    chipSelected: {
      backgroundColor: colors.ink,
      borderColor: colors.ink,
    },
    chipText: {
      fontSize: 12.5,
      fontWeight: '600',
      color: colors.ink,
    },
    chipTextSelected: {
      color: colors.surface,
    },
    infoBox: {
      borderRadius: 14,
      padding: 14,
      marginTop: 24,
    },
    btn: {
      borderRadius: 14,
      paddingVertical: 15,
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnPrimary: {
      backgroundColor: colors.ink,
    },
    btnText: {
      fontSize: 14.5,
      fontWeight: '700',
      color: colors.surface,
    },
  });
}
