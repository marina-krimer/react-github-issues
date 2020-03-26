import React from 'react'
import '../../index.css'
import _ from 'lodash'
import ReactPaginate from 'react-paginate'
import Select from './Select'
import THItem from '../containers/THItem'
import TDRefItem from '../containers/TDRefItem'

import * as dateformat from '../../api/dateformat'

function IssuesTable(props) {
  const { issues, rowCount, currentPage, rowCounts, onRowCountChange, onSort,
    sortField, sort, onOpenModal, onPageChange } = props

  if (!issues) {
    return <div />
  } if (issues.length <= 0) {
    return <div>Нет данных</div>
  }

  const rowCnt = (issues.length >= Number(rowCount) ? Number(rowCount) : issues.length)
  const pageCount = Math.ceil(issues.length / rowCnt)
  const displayData = _.chunk(issues, rowCnt)[currentPage]

  return (
    <div className="widget_cnt">
      <Select
        data={rowCounts}
        emptySelectValue={false}
        label="Количество строк в таблице: "
        name="rowCount"
        onChange={onRowCountChange}
        placeholder=""
        selectClass=".row_select"
        showEmptySelect={false}
        value={rowCount}
        valueName=""
      />

      <table className="table">
        <thead>
          <tr>
            <THItem
              itemName="login"
              itemText="Пользователь"
              onSort={onSort}
              sort={sort}
              sortField={sortField}
            />
            <THItem
              itemName="number"
              itemText="№ обращения"
              onSort={onSort}
              sort={sort}
              sortField={sortField}
            />
            <THItem
              itemName="title"
              itemText="Наименование"
              onSort={onSort}
              sort={sort}
              sortField={sortField}
            />
            <THItem
              itemName="created_at"
              itemText="Дата открытия"
              onSort={onSort}
              sort={sort}
              sortField={sortField}
            />
          </tr>
        </thead>
        <tbody>
          {displayData.map((item) => (
            <tr key={item.id}>
              <TDRefItem
                hrefName="#Modal"
                item={item}
                onOpenModal={onOpenModal}
              />
              <td>{item.number}</td>
              <td>{item.title}</td>
              <td>{dateformat.toLocaleDateString(item.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        activeClassName="active"
        breakClassName="break-me"
        breakLabel="..."
        containerClassName="pagination"
        forcePage={currentPage}
        marginPagesDisplayed={2}
        nextClassName="page-item"
        nextLabel="следующая"
        nextLinkClassName="page-link"
        onPageChange={onPageChange}
        pageClassName="page-item"
        pageCount={pageCount}
        // стили bootstrap
        pageLinkClassName="page-link"
        pageRangeDisplayed={5}
        previousClassName="page-item"
        previousLabel="предыдущая"
        previousLinkClassName="page-link"
      />
    </div>
  )
}

export default IssuesTable
