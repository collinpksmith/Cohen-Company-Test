import { handleActions } from 'redux-actions'
import { requestSuccess, requestFail } from 'redux/api/request'
import * as CONSTANTS from './constants'

const getInitialState = () => {
  return {
    todos: [],
    error: '',
  }
}

export default handleActions({
  [requestSuccess(CONSTANTS.GET_TODO_LIST)]: (state, { payload }) => ({
    ...state,
    todos: payload,
  }),
  [requestSuccess(CONSTANTS.ADD_TODO)]: (state, { payload }) => ({
    ...state,
    todos: payload,
  }),
  [requestFail(CONSTANTS.ADD_TODO)]: (state, { payload }) => ({
    ...state,
    error: payload.data.message,
  }),
  [requestSuccess(CONSTANTS.DELETE_TODO)]: (state, { payload }) => ({
    ...state,
    todos: payload,
  }),
  [(CONSTANTS.SET_ERROR_MESSAGE)]: (state, { payload }) => ({
    ...state,
    error: payload,
  })

}, getInitialState())
