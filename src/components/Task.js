import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Task = ({ task }) => {
    return (
        <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{task}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    taskText: {
        fontSize: 16,
        color: '#333',
    },
});

export default Task;
