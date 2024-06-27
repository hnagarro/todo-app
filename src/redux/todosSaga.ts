import { put, takeEvery } from 'redux-saga/effects';
import { addTodoRequest, addTodoSuccess, toggleTodoRequest, toggleTodoSuccess, deleteTodoRequest, deleteTodoSuccess } from './todoSlice';
import { PayloadAction } from '@reduxjs/toolkit';

export function* handleAddTodoSaga(action: PayloadAction<string>) {
  const newTodo = { id: Date.now(), text: action.payload, completed: false };
  yield put(addTodoSuccess(newTodo));
}

export function* handleToggleTodoSaga(action: PayloadAction<number>) {
  yield put(toggleTodoSuccess(action.payload));
}

export function* handleDeleteTodoSaga(action: PayloadAction<number>) {
  yield put(deleteTodoSuccess(action.payload));
}

export default function* todosSaga() {
  yield takeEvery(addTodoRequest.type, handleAddTodoSaga);
  yield takeEvery(toggleTodoRequest.type, handleToggleTodoSaga);
  yield takeEvery(deleteTodoRequest.type, handleDeleteTodoSaga);
}
