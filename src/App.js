import React, { Component } from "react";
import "./App.css";
import Timeline from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import { observer } from "mobx-react";
import Title from "./Title";
import Modal from "react-modal";
import { ROW_TYPES } from "./util/Constants";

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

Modal.setAppElement("#root");
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalGroupId: "",
      modalTime: 0
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.itemRenderer = this.itemRenderer.bind(this);
    this.groupRenderer = this.groupRenderer.bind(this);
    this.addItems = this.addItems.bind(this);
  }

  openModal(groupId, time) {
    const group = this.props.groupStore.groups.filter(node => {
      return node.id === groupId;
    });

    const task = group[0].type;

    if (task === ROW_TYPES.TASK) {
      return;
    }

    this.setState({
      modalIsOpen: true,
      modalGroupId: groupId,
      modalTime: time,
      modalTask: task
    });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    const { addItemName } = this.props.groupStore;
    this.setState({ modalIsOpen: false });
    // 初期値リセット
    addItemName("");
  }
  addItems() {
    const { addItems } = this.props.groupStore;
    addItems(
      this.state.modalGroupId,
      this.state.modalTime,
      this.state.modalTask
    );

    this.closeModal();
  }

  itemRenderer = ({ item, itemContext, getItemProps, getResizeProps }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    return (
      <div {...getItemProps({ className: `item-${item.task}` })}>
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ""}

        <div
          className="rct-item-content"
          style={{ maxHeight: `${itemContext.dimensions.height}` }}
        >
          {itemContext.title}
        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ""}
      </div>
    );
  };

  groupRenderer = ({ group }) => {
    const {
      addChild,
      changeShowHide,
      removeChild,
      removeTask,
      changeTitle
    } = this.props.groupStore;
    if (group.parent) {
      const showMark = group.show ? "-" : "+";
      return (
        <div className="parent">
          <div
            className="btn_circle"
            onClick={changeShowHide.bind(this, group.parentId)}
          >
            {showMark}
          </div>
          <Title id={group.id} title={group.title} changeTitle={changeTitle} />
          <div>
            <button onClick={addChild.bind(this, group.parentId, group.show)}>
              addChild
            </button>
            <button onClick={removeTask.bind(this, group.parentId)}>
              removeTask
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="child">
          <Title id={group.id} title={group.title} changeTitle={changeTitle} />
          <div>
            <button onClick={removeChild.bind(this, group.sameGroupId)}>
              removeChild
            </button>
          </div>
        </div>
      );
    }
  };

  render() {
    const {
      groups,
      addTask,
      addTaskName,
      items,
      addItemName,
      planTimes,
      resultTimes,
      itemNameErrorMessage
    } = this.props.groupStore;
    const newGroups = groups
      .filter(group => {
        return group.parent || group.show;
      })
      .sort((a, b) => {
        return a.parentId - b.parentId;
      });

    return (
      <div className="App">
        <div>
          <input type="text" onChange={e => addTaskName(e.target.value)} />
          <button onClick={addTask}>addTask</button>
        </div>
        <p>PLAN_TIMES: {planTimes}h</p>
        <p>RESULT_TIMES: {resultTimes}h</p>
        <Timeline
          groups={newGroups}
          items={items}
          itemRenderer={this.itemRenderer}
          groupRenderer={this.groupRenderer}
          sidebarContent="Tasks"
          sidebarWidth={300}
          defaultTimeStart={moment().add(-7, "day")}
          defaultTimeEnd={moment().add(7, "day")}
          minZoom={1000 * 60 * 60 * 24 * 12}
          maxZoom={1000 * 60 * 60 * 24 * 12}
          onCanvasClick={(groupId, time, e) => {
            this.openModal(groupId, time);
          }}
          horizontalLineClassNamesForGroup={group => [`row-${group.type}`]}
        />
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add Item"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Add Item</h2>
          <p class="error">{itemNameErrorMessage}</p>
          <input type="text" onChange={e => addItemName(e.target.value)} />
          <button onClick={this.addItems}>add</button>
        </Modal>
      </div>
    );
  }
}

export default App;
