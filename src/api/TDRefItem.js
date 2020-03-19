/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import '../index.css'


class TDRefItem extends React.Component {
  constructor(props) {
    super(props)

    this.handelOpenModal = this.handelOpenModal.bind(this)
  }

  handelOpenModal() {
    const { onOpenModal, item } = this.props
    onOpenModal(item)
  }

  render() {
    const { hrefName, item } = this.props
    const { login } = item
    return (
      <td>
        <a
          href={hrefName}
          onClick={this.handelOpenModal}
        >
          {login}
        </a>
      </td>
    )
  }
}
export default TDRefItem
