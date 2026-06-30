import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

export default function SecondaryButton({
  title,
  onPress,
  style,
}) {
  return (
    <Pressable
      style={[styles.button, style]}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: Colors.pending,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  text: {
    color: Colors.textSecondary,
    fontWeight: '700',
    fontSize: 14,
  },
});