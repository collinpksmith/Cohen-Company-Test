import { createAction } from 'redux-actions'
import * as CONSTANTS from './constants'

export const getTodoList = createAction(CONSTANTS.GET_TODO_LIST)
export const addTodo = createAction(CONSTANTS.ADD_TODO)
export const deleteTodo = createAction(CONSTANTS.DELETE_TODO)
export const setErrorMessage = createAction(CONSTANTS.SET_ERROR_MESSAGE)
