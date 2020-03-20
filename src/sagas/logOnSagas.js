import { call, put, select, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions/logOnActions'
import * as consts from '../constants'
import _ from 'lodash'

export function* mainWatchSaga() {
  yield takeEvery('*', logger)
  yield takeEvery("SET_LOGON_USER", fetchUserRepositories)
  yield takeEvery("SET_LOGON_REPOSITORY", fetchIssues)
}

function* logger(action) {
  const state = yield select()
  console.log('action', action)
  console.log('state after', state)
}

function* fetchUserRepositories(action) {
  const userName = action.payload
  if (userName.length > 0) {
    try {
      const params = { loading: true, error: '' }
      yield put(actions.SetLoadingState(params))
      const response = yield call(() => {
        return fetch(`https://api.github.com/users/${userName}/repos`)
          .then(res => res.json())
      })
      yield put(actions.setRepositoriesSuccess({
        repositories: response,
        logOnRepository: consts.EMPTY_SELECT_VALUE
      }))
    }
    catch (error) {
      yield put(actions.SetLoadingState({ loading: false, error: `Ошибка: ${error}` }))
    }
  }
}

const mapIssues = (response, sort) => {
  const data = response.map((item) => ({
    id: item.id,
    number: item.number,
    title: item.title,
    created_at: item.created_at,
    login: item.user.login,
    avatar_url: item.user.avatar_url,
    html_url: item.user.html_url
  }))
  return _.orderBy(data, sort.field, sort.type)
}

function* fetchIssues(action) {
  const { logOnRepository } = action.payload
  const logOnUser = yield select(state => state.logOn.logOnUser)
  const sort = yield select(state => state.logOn.sort)
  if (
    logOnUser.length > 0
    && logOnRepository.length > 0
    && logOnRepository !== consts.EMPTY_SELECT_VALUE
  ) {
    try {
      const params = { loading: true, error: '' }
      yield put(actions.SetLoadingState(params))

      const response = yield call(() => {
        return fetch(`https://api.github.com/repos/${logOnUser}/${logOnRepository}/issues`)
          .then(res => res.json())
      })
      const data = mapIssues(response, sort)
      yield put(actions.setIssuesSuccess(data))
    }
    catch (error) {
      yield put(actions.SetLoadingState({ loading: false, error: `Ошибка: ${error}` }))
    }
  }
}

