import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Animated, Alert } from 'react-native';

const HomeScreen = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [fadeAnim] = useState(new Animated.Value(1)); // Untuk animasi

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const deleteTask = (index) => {
        Alert.alert(
            "Delete Task",
            "Are you sure you want to delete this task?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {
                        Animated.timing(fadeAnim, {
                            toValue: 0,
                            duration: 300,
                            useNativeDriver: true,
                        }).start(() => {
                            setTasks(tasks.filter((_, i) => i !== index));
                            fadeAnim.setValue(1); // Reset animasi
                        });
                    },
                    style: "destructive",
                },
            ]
        );
    };

    const toggleComplete = (index) => {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const renderTask = ({ item, index }) => (
        <Animated.View style={[styles.taskContainer, { opacity: fadeAnim }]}>
            <TouchableOpacity onPress={() => toggleComplete(index)} style={styles.taskTextContainer}>
                <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>
                    {item.text}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(index)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>To-Do List</Text>
            <TextInput
                style={styles.input}
                placeholder="Add a new task..."
                placeholderTextColor="#aaa"
                value={newTask}
                onChangeText={setNewTask}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
                <Text style={styles.addButtonText}>+ Add Task</Text>
            </TouchableOpacity>
            {tasks.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>🎉 Great job! No tasks left. 🎉</Text>
                </View>
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderTask}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e9f7f9',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#b2bec3',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    addButton: {
        backgroundColor: '#1abc9c',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 20,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    listContainer: {
        flexGrow: 1,
        paddingTop: 10,
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    taskTextContainer: {
        flex: 1,
    },
    taskText: {
        fontSize: 16,
        color: '#2c3e50',
    },
    completedTaskText: {
        textDecorationLine: 'line-through',
        color: '#95a5a6',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3498db',
        textAlign: 'center',
    },
});

export default HomeScreen;
