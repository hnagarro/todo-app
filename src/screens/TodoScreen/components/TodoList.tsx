import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import TodoItem from './TodoItem';
import { ThemeContext } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

interface TodoListProps {
  todos: { id: number; text: string; completed: boolean }[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleTodo, onDeleteTodo }) => {
    const { t } = useTranslation();
    const { theme } = React.useContext(ThemeContext);
    return <>
        <Text style={[styles.title, theme === 'dark' && styles.darkText]} testID='todo-title'>{t('todo_list')}</Text>
        <FlatList
            data={todos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <TodoItem
                todo={item}
                onToggleTodo={() => onToggleTodo(item.id)}
                onDeleteTodo={() => onDeleteTodo(item.id)}
            />
            )}
            ListEmptyComponent={<Text style={[theme === 'dark' && styles.darkText]} testID='not_found'>{t('not_found')}</Text>}
        />
    </>

};

export default TodoList;


const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10
    },
    darkText: {
      color: '#fff',
    },
});