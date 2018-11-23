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
    this.state = {
      // groups: [
      //   { id: 1, title: "group 1", parent: true, parentId: 1, show: false },
      //   { id: 2, title: "group 2", parent: false, parentId: 1, show: false },
      //   { id: 3, title: "group 3", parent: false, parentId: 1, show: false }
      // ]
      groups: this.props.groups
    };
    this.addGroup = this.addGroup.bind(this);
    this.addChild = this.addChild.bind(this);
    this.groupRenderer = this.groupRenderer.bind(this);
    this.showhide = this.showhide.bind(this);
  }
  addGroup() {
    const groups = this.state.groups.slice();
    const id = groups.length + 1;
    groups.push({
      id: id,
      title: `group ${id}`,
      parent: true,
      parentId: id,
      show: true
    });
    this.setState({
      groups: groups
    });
  }
  addChild(parentId, show) {
    const groups = this.state.groups.slice();
    const id = groups.length + 1;
    groups.push({
      id: id,
      title: `group ${id}`,
      parent: false,
      parentId: parentId,
      show: show
    });
    this.setState({
      groups: groups
    });
  }
  groupRenderer = ({ group }) => {
    if (group.parent) {
      const showMark = group.show ? "[-]" : "[+]";
      return (
        <div className="parent">
          <div onClick={this.showhide.bind(this, group.parentId)}>
            {showMark}
            {group.title}
          </div>
          <button
            onClick={this.addChild.bind(this, group.parentId, group.show)}
          >
            addChild
          </button>
        </div>
      );
    } else {
      return <div>{group.title}</div>;
    }
  };
  showhide = parentId => {
    const groups = this.state.groups;
    const newGroups = groups.map(group => {
      if (group.parentId === parentId) {
        group.show = !group.show;
      }
      return group;
    });

    this.setState({ groups: newGroups });
  };

  render() {
    const { groups } = this.state;
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
          <button onClick={this.addGroup}>addGroup</button>
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
