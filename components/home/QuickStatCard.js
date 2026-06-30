import React from 'react';
import { Text, StyleSheet } from 'react-native';

import Card from '../common/Card';

import Colors from '../../constants/colors';

export default function QuickStatCard({

    label,

    value,

}) {

    return (

        <Card style={styles.card}>

            <Text style={styles.label}>
                {label}
            </Text>

            <Text style={styles.value}>
                {value}
            </Text>

        </Card>

    );

}

const styles = StyleSheet.create({

    card: {

        flex: 1,

    },

    label: {

        color: Colors.textSecondary,

        fontSize: 14,

    },

    value: {

        marginTop: 8,

        fontSize: 24,

        fontWeight: '700',

        color: Colors.text,

    },

});