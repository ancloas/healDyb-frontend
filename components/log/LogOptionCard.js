import React from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Card from '../common/Card';

export default function LogOptionCard({

  icon,
  title,
  subtitle,
  onPress,

}) {

  return (

    <Pressable onPress={onPress}>

      <Card style={styles.card}>

        <Ionicons
          name={icon}
          size={30}
        />

        <View style={styles.content}>

          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>

        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
        />

      </Card>

    </Pressable>

  );

}

const styles = StyleSheet.create({

  card: {

    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 16,

  },

  content: {

    flex: 1,

    marginLeft: 16,

  },

  title: {

    fontSize: 18,

    fontWeight: '700',

  },

  subtitle: {

    marginTop: 4,

    color: '#666',

  },

});