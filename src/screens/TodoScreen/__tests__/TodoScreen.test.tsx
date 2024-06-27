import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TodoScreen from '../TodoScreen';

// Mock Redux store
const mockStore = configureStore([]);

describe('<TodoScreen />', () => {
  let store: any;

  // Mock initial Redux state for todos
  const initialState = {
    todos: {
      todos: [
        { id: 1, text: 'Todo 1', completed: false },
        { id: 2, text: 'Todo 2', completed: true },
      ],
    },
  };

  beforeEach(() => {
    // Initialize mock store with initial state
    store = mockStore(initialState);
  });

  it('renders TodoScreen correctly', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <TodoScreen />
      </Provider>
    );

    // Check if components are rendered correctly
    expect(getByTestId('language-switcher')).toBeDefined();
    expect(getByTestId('add_todo')).toBeDefined();
    expect(getByTestId('search_todo')).toBeDefined();
    expect(getByText('Todo 1')).toBeDefined();
    expect(getByText('Todo 2')).toBeDefined();
  });

  it('adds a new todo', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <Provider store={store}>
        <TodoScreen />
      </Provider>
    );

    const input = getByTestId('enter_todo');
    fireEvent.changeText(input, 'New Todo');
    fireEvent.press(getByTestId('add_todo'));
  });

  it('toggles a todo', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <TodoScreen />
      </Provider>
    );

    fireEvent.press(getByTestId('todo-button-toggle-1'));

    expect(store.getActions()).toContainEqual({ type: 'todos/toggleTodoRequest', payload: 1 });
  });

  it('deletes a todo', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <TodoScreen />
      </Provider>
    );

    fireEvent.press(getByTestId('todo-button-delete-1'));

    expect(store.getActions()).toContainEqual({ type: 'todos/deleteTodoRequest', payload: 1 });
  });

  it('filters todos based on search text', () => {
    const { getByPlaceholderText, getByText, queryByText, getByTestId } = render(
      <Provider store={store}>
        <TodoScreen />
      </Provider>
    );

    const input = getByTestId('search_todo');
    fireEvent.changeText(input, '2');

    expect(queryByText('Todo 1')).toBeNull(); // 'Todo 1' should not be found
    expect(getByText('Todo 2')).toBeDefined(); // 'Todo 2' should be found
  });
});
