/* eslint-disable camelcase */
import React from 'react'
import '../../index.css'
import * as dateformat from '../../api/dateformat'

function DetailIssueView(props) {
  const { issue, onClose } = props
  // eslint-disable-next-line camelcase
  const { avatar_url, login, html_url, number, title, created_at } = issue
  return (
    <div>
      <form className="modal-form">
        <div className="modal-s">
          <img
            align="left"
            alt={login}
            className="modal-img"
            src={avatar_url}
          />
          <h5>
            <b>{login}</b>
            {' '}
          </h5>
          <p>
            <b>
              <a href={html_url}>{html_url}</a>
            </b>
          </p>
        </div>
        <div className="modal-s">
          <p>
            обращение №:
            {' '}
            <b>{number}</b>
          </p>
          <p>
            наименование:
            {' '}
            <b>{title}</b>
          </p>
          <p>
            от:
            {' '}
            <b>{dateformat.toLocaleDateString(created_at)}</b>
          </p>
        </div>
        <button onClick={onClose} type="button">
          Закрыть
        </button>
      </form>
    </div>
  )
}

export default DetailIssueView
