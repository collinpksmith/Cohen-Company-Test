import { handleActions } from 'redux-actions'
import { requestSuccess, requestFail } from 'redux/api/request'
import * as CONSTANTS from './constants'

const getInitialState = () => {
  return {
    tasks: [],
    task: {},
    allTasks: [],
    error: '',
  }
}

export default handleActions({
  [requestSuccess(CONSTANTS.GET_TASK_LIST)]: (state, { payload }) => ({
    ...state,
    tasks: payload,
  }),
  [requestSuccess(CONSTANTS.DELETE_TASK)]: (state, { payload }) => ({
    ...state,
    tasks: payload,
  }),
  [requestSuccess(CONSTANTS.ADD_TASK)]: (state, { payload }) => ({
    ...state,
    tasks: payload,
  }),
  [requestFail(CONSTANTS.ADD_TASK)]: (state, { payload }) => ({
    ...state,
    error: payload.data.message,
  }),
  [requestSuccess(CONSTANTS.GET_TASK)]: (state, { payload }) => ({
    ...state,
    task: payload,
  }),
  [requestSuccess(CONSTANTS.UPDATE_TASK)]: (state, { payload }) => ({
    ...state,
    tasks: payload,
  }),
  [requestSuccess(CONSTANTS.GET_ALL_TASKS)]: (state, { payload }) => ({
    ...state,
    allTasks: payload,
  }),
  [(CONSTANTS.SET_ERROR_MESSAGE)]: (state, { payload }) => ({
    ...state,
    error: payload,
  })

}, getInitialState())
