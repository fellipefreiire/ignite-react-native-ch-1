import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { Task } from './TasksList'

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit.png'
import crossIcon from '../assets/icons/cross.png'

interface ITasktask {
  task: Task
  editTask: (id: number, title: string) => void
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
}

export function TaskItem({ task, editTask, toggleTaskDone, removeTask }: ITasktask) {
  const [isEditing, setIsEditing] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState(task.title)
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsEditing(true)
  }

  function handleCancelEditing() {
    setNewTaskTitle(task.title)
    setIsEditing(false)
  }

  function handleSubmitEditing() {
    editTask(task.id, newTaskTitle)
    setIsEditing(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {
          isEditing ?
            (
              <TouchableOpacity onPress={handleCancelEditing} style={{ marginRight: 24 }}>
                <Image source={crossIcon} style={{ tintColor: 'blue' }} />
              </TouchableOpacity>
            ) :
            (
              <TouchableOpacity onPress={handleStartEditing}>
                <Image source={editIcon} style={{ tintColor: 'blue' }} />
              </TouchableOpacity>
            )
        }

        <View />

        {!isEditing && (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={() => removeTask(task.id)}
          >
            <Image source={trashIcon} style={{ tintColor: 'red' }} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})