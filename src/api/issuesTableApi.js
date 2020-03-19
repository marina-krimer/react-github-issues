import store from '../store/configureStore'
import * as issueTableActions from '../actions/issuesTableActions'
import * as modalActions from '../actions/modalActions'
import * as logOnActions from '../actions/logOnActions'

export const setModalState = (modal) => {
  store.dispatch(modalActions.setModalState(modal))
}

export const setShowModal = (value) => {
  store.dispatch(modalActions.setShowModal(value))
}

export const setCurrentPage = (value) => {
  store.dispatch(issueTableActions.setCurrentPage(value))
}

export const setRowCount = (value) => {
  store.dispatch(issueTableActions.setRowCount(value))
}

// data: { issues: orderedData, sort: {type: sortType, field: sortField}
export const setOrderedIssues = (data) => {
  store.dispatch(logOnActions.setOrderedIssues(data))
}
