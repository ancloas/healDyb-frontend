import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]} edges={['top']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Profile</Text>

        {/* User Info */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.line }]}>
          <View style={styles.profileHeader}>
            <View
              style={[
                styles.avatar,
                { backgroundColor: colors.accentTint },
              ]}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.profileName, { color: colors.ink }]}>Anugrah Kumar</Text>
              <Text style={[styles.profileEmail, { color: colors.inkSoft }]}>
                anugrah@example.com
              </Text>
            </View>
          </View>
        </View>

        {/* Personal Info Section */}
        <Text style={[styles.sectionTitle, { color: colors.ink }]}>Personal Information</Text>

        <SettingRow label="Age" value="32" colors={colors} />
        <SettingRow label="Gender" value="Male" colors={colors} />
        <SettingRow label="Diabetes Type" value="Type 2" colors={colors} />
        <SettingRow label="Duration" value="5 years" colors={colors} />

        {/* Goals Section */}
        <Text style={[styles.sectionTitle, { color: colors.ink }]}>Health Goals</Text>

        <SettingRow label="Target Weight" value="80 kg" colors={colors} />
        <SettingRow label="Target Glucose" value="120 mg/dL" colors={colors} />
        <SettingRow label="Daily Steps" value="8,000" colors={colors} />

        {/* App Settings Section */}
        <Text style={[styles.sectionTitle, { color: colors.ink }]}>App Settings</Text>

        <Pressable style={[styles.settingRow, { borderBottomColor: colors.line }]}>
          <Text style={[styles.settingLabel, { color: colors.ink }]}>Notifications</Text>
          <Text style={[styles.settingValue, { color: colors.accentTint }]}>●</Text>
        </Pressable>

        <Pressable style={[styles.settingRow, { borderBottomColor: colors.line }]}>
          <Text style={[styles.settingLabel, { color: colors.ink }]}>Dark Mode</Text>
          <Text style={[styles.settingValue, { color: colors.accentTint }]}>○</Text>
        </Pressable>

        <Pressable style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: colors.ink }]}>Language</Text>
          <Text style={[styles.settingValue, { color: colors.inkFaint }]}>English</Text>
        </Pressable>

        {/* Logout Button */}
        <Pressable style={[styles.logoutBtn, { backgroundColor: colors.warnTint }]}>
          <Text style={[styles.logoutText, { color: colors.warn }]}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingRow({ label, value, colors }: { label: string; value: string; colors: typeof Colors.light }) {
  return (
    <View style={[styles.settingRow, { borderBottomColor: colors.line }]}>
      <Text style={[styles.settingLabel, { color: colors.ink }]}>{label}</Text>
      <Text style={[styles.settingValue, { color: colors.inkSoft }]}>{value}</Text>
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
      paddingBottom: 100,
    },
    title: {
      fontSize: 24,
      fontWeight: '800',
      color: colors.ink,
      marginBottom: 18,
    },
    card: {
      borderRadius: 18,
      borderWidth: 1,
      padding: 18,
      marginBottom: 24,
    },
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 24,
    },
    avatarText: {
      fontSize: 24,
    },
    profileName: {
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 4,
    },
    profileEmail: {
      fontSize: 12,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginTop: 20,
      marginBottom: 10,
      color: colors.inkFaint,
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 14,
      paddingHorizontal: 4,
      borderBottomWidth: 1,
    },
    settingLabel: {
      fontSize: 14,
      fontWeight: '500',
    },
    settingValue: {
      fontSize: 13,
      fontWeight: '600',
    },
    logoutBtn: {
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 16,
      marginTop: 28,
      alignItems: 'center',
    },
    logoutText: {
      fontSize: 14,
      fontWeight: '700',
    },
  });
