import { combineReducers } from 'redux'
import logOnReducer from './logOnReducer'
import issuesTableReducer from './issuesTableReducer'


export const rootReducer = combineReducers({
  logOn: logOnReducer,
  issuesTable: issuesTableReducer
})
