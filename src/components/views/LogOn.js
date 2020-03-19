import React from 'react'
import Select from './Select'
import * as consts from '../../constants'
import PropTypes from 'prop-types'

class LogOn extends React.Component {
  getInputValue = () => this.refs.logOnRef.value

  render() {
    const { logOnUser, logOnRepository, repositories, error, onUserBlur,
      onUserSubmit, onRepositoriesChange } = this.props
    return (
      <div className="widget">
        <h6>Введите имя пользователя и<br />название репозитория</h6>
        <form onSubmit={onUserSubmit}>
          <input
            className="logon_user"
            defaultValue={logOnUser}
            name="logOnUser"
            onBlur={onUserBlur}
            placeholder="Имя пользователя"
            ref="logOnRef"
            type="text"
          />
        </form>
        <br />
        <Select
          data={repositories}
          emptySelectValue={consts.EMPTY_SELECT_VALUE}
          label=""
          name="logOnRepository"
          onChange={onRepositoriesChange}
          placeholder="Название репозитория"
          selectClass="logon_repos"
          showEmptySelect
          value={logOnRepository}
          valueName="name"
        />
        <br />
        <br />
        <p>{!error ? '' : error}</p>
      </div>
    )
  }
}

LogOn.propTypes = {
  logOnUser: PropTypes.string.isRequired,
  logOnRepository: PropTypes.string.isRequired
}

export default LogOn
