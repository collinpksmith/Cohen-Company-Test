import { all } from 'redux-saga/effects'
import todo from './todo'
import task from './task'

export default function* rootSaga() {
  yield all([
    todo(),
    task()
  ])
}
