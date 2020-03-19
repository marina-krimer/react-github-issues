import * as types from './actionTypes'

export function setCurrentPage(value) {
  return {
    type: types.SET_CURRENT_PAGE,
    payload: value,
  }
}

export function SetSort(params) {
  return {
    type: types.SET_SORT,
    payload: params,
  }
}

export function setRowCount(value) {
  return {
    type: types.SET_ROW_COUNT,
    payload: value,
  }
}
