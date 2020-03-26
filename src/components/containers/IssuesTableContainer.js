import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import IssuesTable from '../views/IssuesTable'
import store from '../../store/configureStore'
import * as issueTableActions from '../../actions/issuesTableActions'
import * as modalActions from '../../actions/modalActions'
import * as logOnActions from '../../actions/logOnActions'


class IssuesTableContainer extends React.Component {
  constructor(props) {
    super(props)

    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleRowCountChange = this.handleRowCountChange.bind(this)
  }

  handleOpenModal = row => {
    store.dispatch(modalActions.setModalState({ row, showModal: true }))
  }

  handlePageChange = ({ selected }) => {
    store.dispatch(issueTableActions.setCurrentPage(selected))
  }

  handleRowCountChange = event => {
    event.preventDefault()
    store.dispatch(issueTableActions.setRowCount(event.target.value))
  }

  handleSort = sortField => {
    const { issues, sort } = this.props
    const cloneIssues = issues.concat()
    const sortType = sort.type === 'asc' ? 'desc' : 'asc'
    const orderedData = _.orderBy(cloneIssues, sortField, sortType)
    const data = { issues: orderedData, sort: { type: sortType, field: sortField } }
    store.dispatch(logOnActions.setOrderedIssues(data))
  }

  render() {
    const { logOnUser, logOnRepository, status, currentPage, issues,
      rowCount, rowCounts, sort } = this.props
    const { loading } = status
    return (
      <div>
        {/* загрузка таблицы обращений пользователя */}
        {!loading
          && logOnUser.length > 0
          && logOnRepository.length > 0
          && issues ? (
            <React.Fragment>
              <IssuesTable
                currentPage={currentPage}
                issues={issues}
                onOpenModal={this.handleOpenModal}
                onPageChange={this.handlePageChange}
                onRowCountChange={this.handleRowCountChange}
                onSort={this.handleSort}
                rowCount={rowCount}
                rowCounts={rowCounts}
                sort={sort.type}
                sortField={sort.field}
              />
            </React.Fragment>
          ) : null}
      </div>
    )
  }
}

const mapStateToProps = store =>
  ({
    logOnUser: store.logOn.logOnUser,
    logOnRepository: store.logOn.logOnRepository,
    repositories: store.logOn.repositories,
    issues: store.logOn.issues,
    status: store.logOn.status,
    sort: store.logOn.sort,
    rowCount: store.issuesTable.rowCount,
    rowCounts: store.issuesTable.rowCounts,
    currentPage: store.issuesTable.currentPage,
    modal: store.issuesTable.modal
  })


export default connect(mapStateToProps)(IssuesTableContainer)
