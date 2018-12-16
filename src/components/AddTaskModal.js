import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    zIndex: 100
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

@observer
class AddTaskModal extends Component {
  constructor(props) {
    super(props);

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.addItem = this.addItem.bind(this);
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }
  addItem() {
    const { addItems, addItemName } = this.props.store.groupStore;
    const {
      closeModal,
      modalGroupId,
      modalTime,
      modalTask
    } = this.props.store.modalStore;

    addItems(modalGroupId, modalTime, modalTask);

    closeModal(addItemName);

    this.props.update();
  }

  render() {
    const { itemNameErrorMessage, addItemName } = this.props.store.groupStore;
    const { modalIsOpen, closeModal } = this.props.store.modalStore;
    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={() => closeModal(addItemName)}
          style={customStyles}
          contentLabel="Add Item"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Add Item</h2>
          <p className="error">{itemNameErrorMessage}</p>
          <input type="text" onChange={e => addItemName(e.target.value)} />
          <button onClick={this.addItem}>add</button>
        </Modal>
      </div>
    );
  }
}

AddTaskModal.propTypes = {
  store: PropTypes.object.isRequired
};

export default AddTaskModal;
