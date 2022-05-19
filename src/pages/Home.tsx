import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskEditing, setIsTaskEditing] = useState(false)

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = tasks.find(task => task.title === newTaskTitle)

    if (taskAlreadyExists) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }

    const data: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks([...tasks, data])
  }

  function handleToggleTaskDone(id: number) {
    const task = tasks.find(item => item.id === id)
    if (task) {
      task.done = !task.done
      const updatedTasks = tasks.map(task => ({ ...task }))
      setTasks(updatedTasks)
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        style: 'cancel',
        text: 'Não',
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          setTasks(tasks.filter(item => item.id !== id))
        }
      }
    ])
  }

  function handleEditTask(id: number, title: string) {
    const task = tasks.find(item => item.id === id)
    if (task) {
      task.title = title
      const updatedTasks = tasks.map(task => ({ ...task }))
      setTasks(updatedTasks)
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
        isEditing={isTaskEditing}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})