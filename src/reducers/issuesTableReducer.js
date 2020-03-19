import * as types from '../actions/actionTypes'
import initialState from './issuesTableInitialState'

export default function issuesTableReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_ROW_COUNT:
      return { ...state, rowCount: payload }

    case types.SET_CURRENT_PAGE:
      return { ...state, currentPage: payload }

    case types.SET_MODAL_STATE:
      return { ...state, modal: payload }

    case types.SET_ROW:
      return { ...state, modal: { row: payload } }

    case types.SET_SHOW_MODAL:
      return { ...state, modal: { showModal: payload } }

    default:
      return state
  }
}
