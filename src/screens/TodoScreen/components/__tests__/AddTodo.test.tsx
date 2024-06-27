import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ThemeContext } from '../../../../context/ThemeContext';
import AddTodo from '../AddTodo';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: any) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

const mockStore = configureStore([]);
const initialState = {
  todos: { loading: false },
};

describe('AddTodo Component', () => {
  let store:any;
  const mockOnChangeText = jest.fn();
  const mockOnAddTodo = jest.fn();

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should render correctly with dark theme', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: ()=>{} }}>
          <AddTodo text="" onChangeText={mockOnChangeText} onAddTodo={mockOnAddTodo} />
        </ThemeContext.Provider>
      </Provider>
    );

    const input = getByPlaceholderText('enter_todo');

    expect(input.props.placeholderTextColor).toBe('#fff');
    expect(input.props.style).toContainEqual({ backgroundColor: '#444', color: '#fff', borderColor: '#555' });
  });

  it('should disable button when loading is true', () => {
    store = mockStore({
      todos: { loading: true },
    });

    const { getByText, toJSON, getByTestId } = render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light', toggleTheme: ()=>{} }}>
          <AddTodo text="new todo" onChangeText={mockOnChangeText} onAddTodo={mockOnAddTodo} />
        </ThemeContext.Provider>
      </Provider>
    );

    const button = getByTestId('add_todo');
    expect(toJSON()).toMatchSnapshot('button snapshot')
  });
});
