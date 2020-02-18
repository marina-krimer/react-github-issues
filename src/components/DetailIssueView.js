import React from "react"
import '../index.css'
import * as dateformat  from './dateformat'

function DetailIssueView(props) {
    let {avatar_url, login, html_url, number, title, created_at} = props.issue
    return ( 
        <div>
            <form className="modal-form">
                <form className="modal-s">
                <img className='modal-img' align="left" src={avatar_url} alt={login} />
                <h5><b>{login}</b> </h5>
                <p><b><a href={html_url}>{html_url}</a></b></p> 
                </form>
                <form className="modal-s">
                <p>обращение №: <b>{number}</b></p>
                <p>наименование: <b>{title}</b></p>
                <p>от: <b>{dateformat.toLocaleDateString(created_at)}</b></p>
                </form>
                <button onClick={props.onClose}>Закрыть</button>
            </form>
        </div>
    )
}

export default DetailIssueView