import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';
import Button from '../../../components/Button';

interface TodoItemProps {
  todo: { id: number; text: string; completed: boolean };
  onToggleTodo: () => void;
  onDeleteTodo: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleTodo, onDeleteTodo }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View style={[styles.todoItem, theme === 'dark' && styles.darkTodoItem]}  testID={'todo-item'}>
      <Text style={[styles.todoText, todo.completed && styles.completed, theme === 'dark' && styles.darkText]} testID={'todo-text'}>
        {todo.text}
      </Text>
      <Button
        title={todo.completed ? 'Undo' : 'Done'}
        onPress={onToggleTodo}
        testID={`todo-button-toggle-${todo?.id}`}
      />
      <Button title="Delete" onPress={onDeleteTodo}  testID={`todo-button-delete-${todo?.id}`}/>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  darkTodoItem: {
    backgroundColor: '#555',
    borderColor: '#666',
  },
  todoText: {
    flex: 1,
    marginRight: 10,
  },
  completed: {
    textDecorationLine: 'line-through',
  },
  darkText: {
    color: '#fff',
  },
});

export default TodoItem;
