import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

export default function CheckpointItem({

    time,
    title,
    status,

}) {

    return (

        <View style={styles.container}>

            <Text style={styles.time}>
                {time}
            </Text>

            <View style={styles.middle}>

                <View style={styles.dot} />

                <Text style={styles.title}>
                    {title}
                </Text>

            </View>

            <Text style={styles.status}>
                {status}
            </Text>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {

        flexDirection: 'row',
        alignItems: 'center',

        paddingVertical: 14,

    },

    time: {

        width: 60,

        color: Colors.textSecondary,

    },

    middle: {

        flex: 1,

        flexDirection: 'row',

        alignItems: 'center',

    },

    dot: {

        width: 10,

        height: 10,

        borderRadius: 5,

        backgroundColor: Colors.primary,

        marginRight: 12,

    },

    title: {

        fontWeight: '600',

    },

    status: {

        color: Colors.primary,

        fontWeight: '600',

    },

});