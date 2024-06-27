import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodoList from '../TodoList';


jest.mock('react-i18next', () => ({
    useTranslation: () => ({
      t: (key: any) => key,
      i18n: {
          changeLanguage: () => new Promise(() => {}),
      },
    }),
}));


describe('<TodoList />', () => {
  const todos = [
    { id: 1, text: 'Todo 1', completed: false },
    { id: 2, text: 'Todo 2', completed: true },
  ];

  const onToggleTodoMock = jest.fn();
  const onDeleteTodoMock = jest.fn();

  it('renders TodoList correctly', () => {
    const { getByText, getAllByTestId } = render(
      <TodoList todos={[]} onToggleTodo={onToggleTodoMock} onDeleteTodo={onDeleteTodoMock} />
    );

    const titleElement = getAllByTestId('todo-title');
    expect(titleElement).toBeDefined();

    const notFoundText = getAllByTestId('not_found');
    expect(notFoundText).toBeDefined();
  });

  it('calls onToggleTodo when a todo item is toggled', () => {
    const { getByTestId } = render(
      <TodoList todos={todos} onToggleTodo={onToggleTodoMock} onDeleteTodo={onDeleteTodoMock} />
    );

    const todoItems = getByTestId(`todo-button-toggle-${todos[0].id}`);

    fireEvent.press(todoItems);

    expect(onToggleTodoMock).toHaveBeenCalledWith(todos[0].id);
  });

  it('calls onDeleteTodo when a todo item is deleted', () => {
    const { getAllByTestId, getByTestId } = render(
      <TodoList todos={todos} onToggleTodo={onToggleTodoMock} onDeleteTodo={onDeleteTodoMock} />
    );
  
    const deleteButton = getByTestId(`todo-button-delete-${todos[0].id}`);
    fireEvent.press(deleteButton);
  
    expect(onDeleteTodoMock).toHaveBeenCalledWith(todos[0].id);
  });
});
