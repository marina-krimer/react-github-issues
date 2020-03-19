import * as types from './actionTypes'

export function setRow(row) {
  return {
    type: types.SET_ROW,
    payload: row
  }
}

export function setShowModal(value) {
  return {
    type: types.SET_SHOW_MODAL,
    payload: value
  }
}

export function setModalState(modal) {
  return {
    type: types.SET_MODAL_STATE,
    payload: modal
  }
}
