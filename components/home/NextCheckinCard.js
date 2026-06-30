import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Card from '../common/Card';
import PrimaryButton from '../common/PrimaryButton';
import SecondaryButton from '../common/SecondaryButton';
import Colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';


export default function NextCheckinCard() {
  const navigation = useNavigation()
  return (
    <Card>

      <Text style={styles.heading}>
        NEXT CHECK-IN
      </Text>

      <Text style={styles.time}>
        12:00 PM
      </Text>

      <Text style={styles.title}>
        Lunch
      </Text>

      <Text style={styles.subtitle}>
        What did you eat?
      </Text>

      <View style={styles.buttons}>
        <PrimaryButton
          title="Log now"
        onPress={() => navigation.navigate('Checkin')}
        />

        <SecondaryButton
          title="Later"
          onPress={() => navigation.navigate('Home')}
          style={{ marginLeft: 12 }}
        />
      </View>

    </Card>
  );
}

const styles = StyleSheet.create({

  heading: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1,
  },

  time: {
    marginTop: 14,
    fontSize: 32,
    fontWeight: '700',
    color: Colors.primary,
  },

  title: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },

  subtitle: {
    marginTop: 4,
    color: Colors.textSecondary,
  },

  buttons: {
    marginTop: 24,
    flexDirection: 'row',
  },

});