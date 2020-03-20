/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import ReactDOM from 'react-dom'
import '../App.css'

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

export default Modal
