import { takeLatest } from 'redux-saga/effects'
import * as CONSTANTS from '../modules/task/constants'
import apiCall from '../api/apiCall'

const doGetTaskList = apiCall({
  type: CONSTANTS.GET_TASK_LIST,
  method: 'get',
  path: ({ payload }) => `task/${payload.id}`,
})

const doDeleteTask = apiCall({
  type: CONSTANTS.DELETE_TASK,
  method: 'delete',
  path: ({ payload }) => `task/${payload.id}/${payload.task_id}`
})

const doAddTask = apiCall({
  type: CONSTANTS.ADD_TASK,
  method: 'post',
  path: ({ payload }) => `task/${payload.id}`,
})

const doGetTask = apiCall({
  type: CONSTANTS.GET_TASK,
  method: 'get',
  path: ({ payload }) => `tasks/${payload.task_id}`,
})

const doUpdateTask = apiCall({
  type: CONSTANTS.UPDATE_TASK,
  method: 'put',
  path: ({ payload }) => `task/${payload.id}/${payload.task_id}`,
})

const doGetAllTasks = apiCall({
  type: CONSTANTS.GET_ALL_TASKS,
  method: 'get',
  path: 'task'
})

export default function* rootSaga() {
  yield takeLatest(CONSTANTS.GET_TASK_LIST, doGetTaskList)
  yield takeLatest(CONSTANTS.DELETE_TASK, doDeleteTask)
  yield takeLatest(CONSTANTS.ADD_TASK, doAddTask)
  yield takeLatest(CONSTANTS.GET_TASK, doGetTask)
  yield takeLatest(CONSTANTS.UPDATE_TASK, doUpdateTask)
  yield takeLatest(CONSTANTS.GET_ALL_TASKS, doGetAllTasks)
}
