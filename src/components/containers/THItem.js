import React from 'react'
import '../../index.css'


class THItem extends React.Component {
  constructor(props) {
    super(props)

    this.handleSort = this.handleSort.bind(this)
  }

  handleSort() {
    const { itemName, onSort } = this.props
    onSort(itemName)
  }

  render() {
    const { itemName, itemText, sort, sortField } = this.props
    return (
      <th onClick={this.handleSort}>
        {itemText}
        {' '}
        {sortField === itemName ? <small>{sort}</small> : null}
      </th>
    )
  }
}

export default THItem
