import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import DetailIssueView from '../views/DetailIssueView'
import * as issuesTableApi from '../../api/issuesTableApi'

Modal.setAppElement('#modal-root')

const ModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}


class DetailIssueContainer extends React.Component {
  constructor(props) {
    super(props)

    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleCloseModal = () => {
    issuesTableApi.setShowModal(false)
  }


  render() {
    const { row, showModal } = this.props.modal
    return (
      <div>
        {/* просмотр окна данных пользователя */}
        {showModal ? (
          <Modal
            contentLabel="Пользователь"
            isOpen={showModal}
            onRequestClose={this.handleCloseModal}
            style={ModalStyles}
          >
            <DetailIssueView issue={row} onClose={this.handleCloseModal} />
          </Modal>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = store =>
  ({ modal: store.issuesTable.modal })


export default connect(mapStateToProps)(DetailIssueContainer)
