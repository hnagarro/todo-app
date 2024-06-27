import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodoItem from '../TodoItem';

describe('<TodoItem />', () => {
  const todo = { id: 1, text: 'Test Todo', completed: false };
  let onToggleTodoMock: jest.Mock<void, []>;
  let onDeleteTodoMock: jest.Mock<void, []>;

  beforeEach(() => {
    onToggleTodoMock = jest.fn();
    onDeleteTodoMock = jest.fn();
  });

  it('renders todo item correctly', () => {
    const { getByText } = render(
      <TodoItem todo={todo} onToggleTodo={onToggleTodoMock} onDeleteTodo={onDeleteTodoMock} />
    );

    const todoTextElement = getByText('Test Todo'); 
    expect(todoTextElement).toBeDefined();

    const undoButton = getByText('Done');
    expect(undoButton).toBeDefined();

    const deleteButton = getByText('Delete');
    expect(deleteButton).toBeDefined();
  });

  it('calls onToggleTodo when Done/Undo button is pressed', () => {
    const { getByText } = render(
      <TodoItem todo={todo} onToggleTodo={onToggleTodoMock} onDeleteTodo={onDeleteTodoMock} />
    );

    const undoButton = getByText('Done');
    fireEvent.press(undoButton);
    expect(onToggleTodoMock).toHaveBeenCalled();
  });

  it('calls onDeleteTodo when Delete button is pressed', () => {
    const { getByText } = render(
      <TodoItem todo={todo} onToggleTodo={onToggleTodoMock} onDeleteTodo={onDeleteTodoMock} />
    );

    const deleteButton = getByText('Delete');
    fireEvent.press(deleteButton);
    expect(onDeleteTodoMock).toHaveBeenCalled();
  });

  it('renders todo item with completed style when todo.completed is true', () => {
    const completedTodo = { ...todo, completed: true };
    const { getByText } = render(
      <TodoItem todo={completedTodo} onToggleTodo={onToggleTodoMock} onDeleteTodo={onDeleteTodoMock} />
    );

    const todoTextElement = getByText('Test Todo');
    expect(todoTextElement.props.style).toContainEqual(expect.objectContaining({ textDecorationLine: 'line-through' }));
  });

});
