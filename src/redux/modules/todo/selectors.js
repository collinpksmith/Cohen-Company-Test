import { get } from 'lodash'

export const todoStateSelector = (state) =>
  get(state, 'todo')

export const todoListSelector = (state) =>
  get(state, 'todo.todos')

export const errorMessageSelector = (state) =>
  get(state, 'todo.error')
