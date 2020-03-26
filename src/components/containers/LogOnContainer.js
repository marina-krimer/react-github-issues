import React from 'react'
import { connect } from 'react-redux'
import LogOn from '../views/LogOn'
import store from '../../store/configureStore'
import * as actions from '../../actions/logOnActions'

class LogOnContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleUserBlur = this.handleUserBlur.bind(this)
    this.handleUserSubmit = this.handleUserSubmit.bind(this)
    this.handleRepositoriesChange = this.handleRepositoriesChange.bind(this)
  }

  onUserChange = (value) => {
    const { logOnUser } = this.props
    if (logOnUser !== value) {
      store.dispatch(actions.setLogOnUser(value))
    }
  }

  handleUserBlur = event => {
    event.preventDefault()
    const { value } = event.target
    this.onUserChange(value)
  }

  handleUserSubmit = (event) => {
    event.preventDefault()
    const value = this.refs.logOnRef.getInputValue();
    this.onUserChange(value)
  }

  handleRepositoriesChange = event => {
    event.preventDefault()
    const params = {
      logOnRepository: event.target.value,
      logOnUser: this.props.logOnUser,
      sort: this.props.sort
    }
    store.dispatch(actions.setLogOnRepository(params))
  }

  render() {
    const { logOnUser, logOnRepository, repositories, status } = this.props

    return (
      <div>
        {/* поля ввода пользователя и репозитория */}
        <LogOn
          error={status.error}
          logOnRepository={logOnRepository}
          logOnUser={logOnUser}
          onRepositoriesChange={this.handleRepositoriesChange}
          onUserBlur={this.handleUserBlur}
          onUserSubmit={this.handleUserSubmit}
          ref="logOnRef"
          repositories={repositories}
        />
      </div>
    )
  }
}

const mapStateToProps = store =>
  ({
    logOnUser: store.logOn.logOnUser,
    logOnRepository: store.logOn.logOnRepository,
    repositories: store.logOn.repositories,
    sort: store.logOn.sort,
    status: store.logOn.status
  })

export default connect(mapStateToProps)(LogOnContainer)
