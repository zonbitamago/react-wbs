import React, { Component } from "react";
import "./App.css";
import Timeline from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import { observer } from "mobx-react";

let items = [
  // {
  //   id: 1,
  //   group: 1,
  //   title: 'item 1',
  //   start_time: moment(),
  //   end_time: moment().add(1, 'hour')
  // },
  // {
  //   id: 2,
  //   group: 2,
  //   title: 'item 2',
  //   start_time: moment().add(-0.5, 'hour'),
  //   end_time: moment().add(0.5, 'hour')
  // },
  // {
  //   id: 3,
  //   group: 1,
  //   title: 'item 3',
  //   start_time: moment().add(2, 'hour'),
  //   end_time: moment().add(3, 'hour')
  // }
];

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
      removeTask
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
          <div>{group.title}</div>
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
          <div>{group.title}</div>
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
    const { groups, addTask, addTaskName } = this.props.groupStore;
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
          sidebarWidth={250}
          defaultTimeStart={moment().add(-7, "day")}
          defaultTimeEnd={moment().add(7, "day")}
          minZoom={1000 * 60 * 60 * 24 * 12}
          maxZoom={1000 * 60 * 60 * 24 * 12}
        />
      </div>
    );
  }
}

export default App;
