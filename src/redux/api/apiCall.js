import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import { requestFail, requestPending, requestSuccess } from './request'

export default ({
  type,
  method, // one of 'get', 'post', 'put', 'delete'
  path,
  success,
  fail,
  payloadOnSuccess,
  payloadOnFail
}) => function* (action) {
  const {
    body,
    params,
    success: successCallback,
    fail: failCallback
  } = (action.payload || {})

  axios.defaults.baseURL = 'http://localhost:3000'

  let headers = {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  }

  try {
    yield put({
      type: requestPending(type)
    })

    const res = yield call(axios.request, {
      url: typeof path === 'function' ? path(action) : path,
      method: method.toLowerCase(),
      headers: Object.assign({}, headers),
      data: body,
      params
    })

    success && success(res, action)
    successCallback && successCallback(res)

    yield put({
      type: requestSuccess(type),
      payload: payloadOnSuccess ? payloadOnSuccess(res.data, action) : res.data
    })
  } catch (err) {
    const errRes = get(err, 'response', err)

    if (errRes.data && (errRes.data.code === 401 && errRes.data.message === 'Please authenticate')) {
      yield put({
        type: 'IS_UNAUTHORIZED',
      })
    }

    fail && fail(errRes)
    failCallback && failCallback(errRes)

    yield put({
      type: requestFail(type),
      payload: payloadOnFail ? payloadOnFail(errRes, action) : errRes
    })
  }
}
