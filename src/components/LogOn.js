import React from 'react'
import Select from './Select'

function LogOn(props) {
    let {LogOnUser, LogOnRepository, repositories, emptySelectValue, error} = props.data
    return (
        <div className = "widget">
            <form>   
                <h6>Введите имя пользователя и название репозитория</h6>
                <form onSubmit={props.onUserSubmit}> 
                    <input className="logon_user"
                        type="text"
                        name={LogOnUser.name}
                        placeholder={LogOnUser.placeholder}
                        value={LogOnUser.value} 
                        onChange={props.onUserChange}
                        onBlur={props.onUserSubmit}
                    />
                </form>
                    <br/>
                    <Select
                        label = {''}
                        name = {LogOnRepository.name}
                        value = {LogOnRepository.value}
                        placeholder={LogOnRepository.placeholder}
                        data = {repositories}
                        onChange = {props.onRepositoriesChange}  
                        showEmptySelect = {true} 
                        emptySelectValue = {emptySelectValue}
                        valueName = {'name'}  
                        selectClass = {'logon_repos'}    
            />
                    
                    <br/><br/>
                    <p>{!(error) ? "" : error}</p> 
  
                </form>
        </div>
    )
}

export default LogOn