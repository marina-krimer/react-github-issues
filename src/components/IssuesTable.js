
import React from 'react'
import { unstable_renderSubtreeIntoContainer } from 'react-dom'
import Select from './Select'
import '../index.css'
import _ from 'lodash'
import ReactPaginate from 'react-paginate'

import * as dateformat  from './dateformat'



function IssuesTable(props) {
    if (!(props.issues) ) {
        return (
            <div></div>
        )
    }
    else if (props.issues.length <= 0) {
        return (
            <div>Нет данных</div>
        )    
    }
    const rowCnt = (props.issues.length >= props.rowCount ? props.rowCount : props.issues.length)
    const pageCount = Math.ceil(props.issues.length / rowCnt)
    const displayData = _.chunk(props.issues, rowCnt)[props.currentPage]
    
    return(
        <div className = "widget_cnt">
            <Select
                    label = {"Количество строк в таблице: "}
                    name = {"rowCount"}
                    value = {props.rowCount}
                    placeholder={''}
                    data = {props.rowCounts}
                    onChange = {props.onRowCountChange}  
                    showEmptySelect = {false} 
                    valueName = {''}     
                    selectClass = {'.row_select'}
                    emptySelectValue = {false}
            />

            <table className="table">
                <thead>
                    <tr>
                        {/* <th>#</th> */} {/*отображение номера строки*/}
                        <th onClick={props.onSort.bind(null, 'login')}>
                            Пользователь {props.sortField === 'login' ? <small>{props.sort}</small> : null}
                        </th>
                        <th onClick={props.onSort.bind(null, 'number')}> 
                            № обращения {props.sortField === 'number' ? <small>{props.sort}</small> : null}
                        </th>
                        <th onClick={props.onSort.bind(null, 'title')}>
                            Наименование {props.sortField === 'title' ? <small>{props.sort}</small> : null}
                        </th>
                        <th onClick={props.onSort.bind(null, 'created_at')}>
                            Дата открытия {props.sortField === 'created_at' ? <small>{props.sort}</small> : null}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { 
                    displayData.map((item, idx) =>(
                         
                        <tr key={item.id}>
                            {/*{<td>{idx}</td> */}{/*отображение номера строки*/}
                            <td  onClick={props.onOpenModal.bind(null, item)}><a href='#'>{item.login}</a></td>
                            <td>{item.number}</td>
                            <td>{item.title}</td>
                            <td>{dateformat.toLocaleDateString(item.created_at)}</td>
                        </tr>
                    )
                    )
                    }
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={'предыдущая'}
                nextLabel={'следующая'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={props.onPageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName="page-item"
                forcePage={props.currentPage}
                //стили bootstrap
                pageLinkClassName="page-link" 
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                />
            
            
        </div>
    
       
    )
}

export default IssuesTable
