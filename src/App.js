import React, { Component } from "react";
import "./App.css";
import Timeline from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import { observer } from "mobx-react";
import Title from "./Title";

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.groupRenderer = this.groupRenderer.bind(this);
  }
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
    const { groups, addTask, addTaskName, items } = this.props.groupStore;
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
        Rendered by react!
        <Timeline
          groups={newGroups}
          items={items}
          groupRenderer={this.groupRenderer}
          sidebarContent="Tasks"
          sidebarWidth={300}
          defaultTimeStart={moment().add(-7, "day")}
          defaultTimeEnd={moment().add(7, "day")}
          minZoom={1000 * 60 * 60 * 24 * 12}
          maxZoom={1000 * 60 * 60 * 24 * 12}
          onCanvasClick={(groupId, time, e) => {
            console.log(groupId, time, e);
          }}
        />
      </div>
    );
  }
}

export default App;
