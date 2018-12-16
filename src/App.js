import React, { Component } from "react";
import "./App.css";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import { observer } from "mobx-react";
import Title from "./components/Title";
import Modal from "react-modal";
import AddTaskModal from "./components/AddTaskModal";

Modal.setAppElement("#root");
@observer
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { flag: true };

    this.itemRenderer = this.itemRenderer.bind(this);
    this.groupRenderer = this.groupRenderer.bind(this);
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
    } = this.props.store.groupStore;
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
    console.log("render");

    const {
      groups,
      addTask,
      addTaskName,
      items,
      planTimes,
      resultTimes
    } = this.props.store.groupStore;

    const { openModal } = this.props.store.modalStore;
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
            openModal(groups, groupId, time);
          }}
          horizontalLineClassNamesForGroup={group => [`row-${group.type}`]}
        />
        <AddTaskModal
          store={this.props.store}
          update={() =>
            this.setState({
              flag: !this.state.flag
            })
          }
        />
      </div>
    );
  }
}

export default App;
