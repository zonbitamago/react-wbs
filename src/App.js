import React, { Component } from "react";
import "./App.css";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import { observer } from "mobx-react";
import Modal from "react-modal";
import AddTaskModal from "./components/AddTaskModal";
import Item from "./components/Item";
import Group from "./components/Group";

Modal.setAppElement("#root");
@observer
class App extends Component {
  constructor(props) {
    super(props);

    // ITEMがRESULT_RATEの場合にrender()が動かないことに対しての、暫定対応
    this.state = { flag: true };
  }

  render() {
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
          itemRenderer={Item}
          groupRenderer={({ group }) =>
            Group(group, this.props.store.groupStore)
          }
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
