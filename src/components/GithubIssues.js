import React from 'react'
import { connect } from 'react-redux'
import Loader from './loader/Loader'
import LogOnContainer from './containers/LogOnContainer'
import IssuesTableContainer from './containers/IssuesTableContainer'
import DetailIssueContainer from './containers/DetailIssueContainer'


function GithubIssues(props) {
  const { status } = props
  return (
    <div>
      {/* поля ввода пользователя и репозитория */}
      <LogOnContainer />

      {/* загрузка сообщения "Идет загрузка данных" */}
      {status.loading ? <Loader /> : null}

      {/* загрузка таблицы обращений пользователя */}
      <IssuesTableContainer />

      {/* просмотр окна данных пользователя */}
      <DetailIssueContainer />
    </div>
  )
}

const mapStateToProps = function (store) {
  return { status: store.logOn.status }
}

export default connect(mapStateToProps)(GithubIssues)
