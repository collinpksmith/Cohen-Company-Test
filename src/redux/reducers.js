import { combineReducers } from 'redux'
import todo from './modules/todo/reducers'
import task from './modules/task/reducers'

export default combineReducers({
  todo,
  task,
})
