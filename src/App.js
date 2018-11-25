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
    const { addChild, changeShowHide } = this.props.groupStore;
    if (group.parent) {
      const showMark = group.show ? "[-]" : "[+]";
      return (
        <div className="parent">
          <div onClick={changeShowHide.bind(this, group.parentId)}>
            {showMark}
            {group.title}
          </div>
          <button onClick={addChild.bind(this, group.parentId, group.show)}>
            addChild
          </button>
        </div>
      );
    } else {
      return <div>{group.title}</div>;
    }
  };

  render() {
    const { groups, addGroup } = this.props.groupStore;
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
          <button onClick={addGroup}>addGroup</button>
        </div>
        Rendered by react!
        <Timeline
          groups={newGroups}
          items={items}
          groupRenderer={this.groupRenderer}
          sidebarContent="SideBar"
          defaultTimeStart={moment().add(-12, "hour")}
          defaultTimeEnd={moment().add(12, "hour")}
        />
      </div>
    );
  }
}

export default App;
