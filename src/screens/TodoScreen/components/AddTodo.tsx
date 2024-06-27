import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../context/ThemeContext';
import Button from '../../../components/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';

interface AddTodoProps {
  text: string;
  onChangeText: (text: string) => void;
  onAddTodo: () => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ text, onChangeText, onAddTodo }) => {
  const { t } = useTranslation();
  const { theme } = React.useContext(ThemeContext);
  const loading = useSelector((state: RootState)=> state.todos.loading)
  return (
    <View style={styles.addTodoContainer} >
      <TextInput
        style={[styles.input, theme === 'dark' && styles.darkInput]}
        placeholder={t('enter_todo')}
        value={text}
        onChangeText={onChangeText}
        placeholderTextColor={theme === 'dark' ? "#fff" : "#000"} 
        testID='enter_todo'
      />
      <Button title={t('add_todo')} testID='add_todo' onPress={onAddTodo} disabled={loading}/>
    </View>
  );
};

const styles = StyleSheet.create({
  addTodoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    flex: 1,
    color: '#000',
  },
  darkInput: {
    backgroundColor: '#444',
    color: '#fff',
    borderColor: '#555',
  },
});

export default AddTodo;
