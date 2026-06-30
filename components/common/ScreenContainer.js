import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

export default function ScreenContainer({ children }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: 16,
    paddingBottom: 100,
  },
});