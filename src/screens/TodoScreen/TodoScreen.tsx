import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { toggleTodoRequest, deleteTodoRequest, addTodoRequest } from '../../redux/todoSlice';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../context/ThemeContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

const TodoScreen = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [text, setText] = useState('');
  const [searchText, setSearchText] = useState('');
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodoRequest(text));
      setText('');
    }
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodoRequest(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodoRequest(id));
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkBackground]}>
      <LanguageSwitcher/>
      <Header />
      <AddTodo
        text={text}
        onChangeText={setText}
        onAddTodo={handleAddTodo}
      />
      <View style={[styles.searchContainer, theme === 'dark' && styles.darkLightBackground]}>
        <View style={styles.serachInnerWrapper}>
          <TextInput
            style={[styles.input, theme === 'dark' && styles.darkInput]}
            placeholder={t('search_placeholder')}
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={theme === 'dark' ? "#fff" : "#000"} 
            testID='search_todo'
          />
        </View>
        <TodoList
          todos={filteredTodos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  darkBackground: {
    backgroundColor: '#333',
  },
  darkLightBackground: {
    backgroundColor: '#545454',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    flex: 1,
    color: '#000',
  },
  darkInput: {
    backgroundColor: '#444',
    color: '#fff',
    borderColor: '#555',
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "#ddd",
    padding: 10,
  },
  serachInnerWrapper: {
    flexDirection: 'row',
    marginBottom: 10
  }
});

export default TodoScreen;
