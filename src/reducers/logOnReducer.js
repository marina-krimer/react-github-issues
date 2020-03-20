import * as types from '../actions/actionTypes'
import initialState from './logOnInitialState'


export default function logOnReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_LOGON_USER:
      return {
        ...state,
        logOnUser: payload,
        logOnRepository: initialState.logOnRepository,
        repositories: initialState.repositories,
        issues: initialState.issues,
        status: initialState.status
      }

    case types.SET_LOGON_REPOSITORY:
      return {
        ...state,
        logOnRepository: payload.logOnRepository,
        issues: initialState.issues,
        status: initialState.status
      }

    case types.SET_REPOSITORIES_SUCCESS:
      return {
        ...state,
        repositories: payload.repositories,
        logOnRepository: payload.logOnRepository,
        issues: initialState.issues,
        status: initialState.status
      }

    case types.SET_ISSUES_SUCCESS:
      return {
        ...state,
        issues: payload,
        status: initialState.status
      }

    case types.SET_ORDERED_ISSUES:
      return {
        ...state,
        issues: payload.issues,
        sort: payload.sort
      }

    case types.SET_SORT:
      return {
        ...state,
        sort: {
          type: payload.type,
          field: payload.field
        }
      }

    case types.SET_LOADING_STATE:
      return {
        ...state,
        status: {
          error: payload.error,
          loading: payload.loading
        }
      }


    default:
      return state
  }
}
