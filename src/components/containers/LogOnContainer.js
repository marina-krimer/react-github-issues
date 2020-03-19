import React from 'react'
import { connect } from 'react-redux'
import LogOn from '../views/LogOn'
import * as logOnApi from '../../api/logOnApi'


class LogOnContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleUserBlur = this.handleUserBlur.bind(this)
    this.handleUserSubmit = this.handleUserSubmit.bind(this)
    this.handleRepositoriesChange = this.handleRepositoriesChange.bind(this)
  }

  // componentDidMount = () => {
  //     userApi.getUsers()
  //     store.dispatch(loadSearchLayout('users', 'User Results'))
  // }

  onUserChange = (value) => {
    logOnApi.logOnUserChanged(value)
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
    logOnApi.logOnRepositoryChanged({
      logOnRepository: event.target.value,
      logOnUser: this.props.logOnUser,
      sort: this.props.sort
    })
  }

  render() {
    const { logOnUser, logOnRepository, repositories, status } = this.props

    return (
      <div>
        {/* <UserList users={this.props.users} deleteUser={userApi.deleteUser} /> */}
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

// const mapDispatchToProps = dispatch => {
//     return {
//       setLogOnUserAction: value => dispatch(SetLogOnUser(value))
//     }
//   }


const mapStateToProps = store =>
  ({
    logOnUser: store.logOn.logOnUser,
    logOnRepository: store.logOn.logOnRepository,
    repositories: store.logOn.repositories,
    sort: store.logOn.sort,
    status: store.logOn.status
  })

export default connect(mapStateToProps)(LogOnContainer)
