import * as types from './actionTypes'

export function setLogOnUser(value) {
  return {
    type: types.SET_LOGON_USER,
    payload: value
  }
}

export function setLogOnRepository(params) {
  return {
    type: types.SET_LOGON_REPOSITORY,
    payload: params
  }
}

export function setRepositoriesSuccess(data) {
  return {
    type: types.SET_REPOSITORIES_SUCCESS,
    payload: data
  }
}

export function setIssuesSuccess(issues = false) {
  return {
    type: types.SET_ISSUES_SUCCESS,
    payload: issues
  }
}

export function setOrderedIssues(data) {
  return {
    type: types.SET_ORDERED_ISSUES,
    payload: data
  }
}

export function SetLoadingState(params) {
  return {
    type: types.SET_LOADING_STATE,
    payload: params
  }
}
