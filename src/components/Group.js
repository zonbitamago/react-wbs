import React from "react";
import Title from "./Title";

export default function Group(group, groupStore) {
  const {
    addChild,
    changeShowHide,
    removeChild,
    removeTask,
    changeTitle
  } = groupStore;

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
}
