import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

export default function TimeFilter() {
  return (
    <View style={styles.container}>

      <TouchableOpacity style={[styles.option, styles.selected]}>
        <Text style={[styles.text, styles.selectedText]}>
          7D
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.text}>
          30D
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.text}>
          3M
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.text}>
          1Y
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },

  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },

  selected: {
    backgroundColor: Colors.primary,
  },

  text: {
    fontWeight: '600',
    color: Colors.textSecondary,
  },

  selectedText: {
    color: '#FFFFFF',
  },

});