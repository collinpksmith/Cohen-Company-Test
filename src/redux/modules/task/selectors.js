import { get } from 'lodash'

export const taskStateSelector = (state) =>
  get(state, 'task')

export const taskListSelector = (state) =>
  get(state, 'task.tasks')

export const taskSelector = (state) =>
  get(state, 'task.task')

export const allTasksSelector = (state) =>
  get(state, 'task.allTasks')

export const errorMessageSelector = (state) =>
  get(state, 'task.error')
