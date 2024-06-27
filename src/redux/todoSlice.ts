import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  loading: boolean;
  todos: Todo[];
}

const initialState: TodoState = {
  loading: false,
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodoRequest: (state, action: PayloadAction<string>) => {
      state.loading = true
    },
    addTodoSuccess: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      state.loading = false
    },
    toggleTodoRequest: (state, action: PayloadAction<number>) => {},
    toggleTodoSuccess: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodoRequest: (state, action: PayloadAction<number>) => {},
    deleteTodoSuccess: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const {
  addTodoRequest,
  addTodoSuccess,
  toggleTodoRequest,
  toggleTodoSuccess,
  deleteTodoRequest,
  deleteTodoSuccess,
} = todoSlice.actions;

export default todoSlice.reducer;
