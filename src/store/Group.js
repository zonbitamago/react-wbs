import { observable, computed, action } from "mobx";
import { ROW_TYPES } from "../util/Constants";
import moment from "moment";

class Group {
  @observable groups = [];
  @observable taskName = "";
  @observable items = [];

  @computed get nextId() {
    // return this.groups.length + 1;
    const nowId =
      this.groups.length === 0
        ? 0
        : Math.max(...this.groups.map(group => group.id));

    return nowId + 1;
  }

  constructor() {
    //サンプルデータ
    pushGroups(this.groups, 1, "task 1", true, 1, true, ROW_TYPES.TASK, 1);

    pushGroups(
      this.groups,
      2,
      "group 2",
      false,
      1,
      true,
      ROW_TYPES.PLAN_TIME,
      2
    );
    pushGroups(this.groups, 3, "", false, 1, true, ROW_TYPES.RESULT_TIME, 2);
    pushGroups(this.groups, 4, "", false, 1, true, ROW_TYPES.RESULT_RATE, 2);

    pushGroups(
      this.groups,
      5,
      "group 3",
      false,
      1,
      true,
      ROW_TYPES.PLAN_TIME,
      5
    );
    pushGroups(this.groups, 6, "", false, 1, true, ROW_TYPES.RESULT_TIME, 5);
    pushGroups(this.groups, 7, "", false, 1, true, ROW_TYPES.RESULT_RATE, 5);

    pushItems(
      this.items,
      1,
      2,
      "item1",
      moment({ h: 0, m: 0, s: 0, ms: 0 }),
      moment({ h: 0, m: 0, s: 0, ms: 0 }).add(1, "day")
    );
  }

  @action.bound
  addTaskName(taskName) {
    this.taskName = taskName;
  }

  /**
   * 親要素追加処理
   */
  @action.bound
  addTask() {
    const id = this.nextId;
    pushGroups(
      this.groups,
      id,
      this.taskName,
      true,
      id,
      true,
      ROW_TYPES.TASK,
      id
    );
  }

  /**
   * 子要素追加処理
   * @param {Number} parentId 親要素
   * @param {Boolean} show　true:表示 false:非表示
   */
  @action.bound
  addChild(parentId, show) {
    let id = this.nextId;
    const sameGroupId = this.nextId;
    const title = `group ${id}`;
    pushGroups(
      this.groups,
      id,
      title,
      false,
      parentId,
      show,
      ROW_TYPES.PLAN_TIME,
      sameGroupId
    );

    id = this.nextId;
    pushGroups(
      this.groups,
      id,
      "",
      false,
      parentId,
      show,
      ROW_TYPES.RESULT_TIME,
      sameGroupId
    );

    id = this.nextId;
    pushGroups(
      this.groups,
      id,
      "",
      false,
      parentId,
      show,
      ROW_TYPES.RESULT_RATE,
      sameGroupId
    );
  }

  @action.bound
  changeShowHide(parentId) {
    this.groups.forEach(group => {
      if (group.parentId === parentId) {
        group.show = !group.show;
      }
    });
  }

  @action.bound
  removeChild(sameGroupId) {
    this.groups = this.groups.filter(group => {
      return group.sameGroupId !== sameGroupId;
    });
  }

  @action.bound
  removeTask(parentId) {
    this.groups = this.groups.filter(group => {
      return group.parentId !== parentId;
    });
  }

  @action.bound
  changeTitle(id, title) {
    this.groups = this.groups.map(group => {
      if (group.id === id) {
        group.title = title;
      }
      return group;
    });
  }
}

/**
 * group配列追加処理
 *
 * 配列の中身をここで定義する。
 * @param {Array} groups Group.groups
 * @param {Number} id
 * @param {String} title 画面表示文言
 * @param {Boolean} parent
 * @param {Number} parentId
 * @param {Boolean} show true:表示 false:非表示
 * @param {String} type Constants.ROW_TYPE
 * @param {Number} sameGroupId
 */
const pushGroups = (
  groups,
  id,
  title,
  parent,
  parentId,
  show,
  type,
  sameGroupId
) => {
  groups.push({
    id: id,
    title: title,
    parent: parent,
    parentId: parentId,
    show: show,
    type: type,
    sameGroupId: sameGroupId
  });
};

const pushItems = (items, id, group, title, start_time, end_time) => {
  items.push({
    id: id,
    group: group,
    title: title,
    start_time: start_time,
    end_time: end_time
  });
};

export default Group;
