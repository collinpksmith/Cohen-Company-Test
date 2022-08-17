import { createAction } from 'redux-actions'
import * as CONSTANTS from './constants'

export const getTasks = createAction(CONSTANTS.GET_TASK_LIST)
export const deleteTask = createAction(CONSTANTS.DELETE_TASK)
export const addTask = createAction(CONSTANTS.ADD_TASK)
export const getTask = createAction(CONSTANTS.GET_TASK)
export const updateTask = createAction(CONSTANTS.UPDATE_TASK)
export const getAllTasks = createAction(CONSTANTS.GET_ALL_TASKS)
export const setErrorMessage = createAction(CONSTANTS.SET_ERROR_MESSAGE)
