import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';
import Radius from '../../constants/radius';
import Shadows from '../../constants/shadows';

export default function Card({ children, style }) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,

    ...Shadows,
  },
});