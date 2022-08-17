import { takeLatest } from 'redux-saga/effects'
import * as CONSTANTS from '../modules/todo/constants'
import apiCall from '../api/apiCall'

const doGetTodoList = apiCall({
  type: CONSTANTS.GET_TODO_LIST,
  method: 'get',
  path: 'todos',
})

const doAddTodo = apiCall({
  type: CONSTANTS.ADD_TODO,
  method: 'post',
  path: 'todos',
})

const doDeleteTodo = apiCall({
  type: CONSTANTS.DELETE_TODO,
  method: 'delete',
  path: ({ payload }) => `/todos/${payload.id}`,
})

export default function* rootSaga() {
  yield takeLatest(CONSTANTS.GET_TODO_LIST, doGetTodoList)
  yield takeLatest(CONSTANTS.ADD_TODO, doAddTodo)
  yield takeLatest(CONSTANTS.DELETE_TODO, doDeleteTodo)
}
