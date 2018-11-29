import { observable, computed, action } from "mobx";
import { ROW_TYPES } from "../util/Constants";

class Group {
  @observable groups = [];
  @observable taskName = "";

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
    push(this.groups, 1, "task 1", true, 1, true, ROW_TYPES.TASK, 1);

    push(this.groups, 2, "group 2", false, 1, true, ROW_TYPES.PLAN_TIME, 2);
    push(this.groups, 3, "", false, 1, true, ROW_TYPES.RESULT_TIME, 2);
    push(this.groups, 4, "", false, 1, true, ROW_TYPES.RESULT_RATE, 2);

    push(this.groups, 5, "group 3", false, 1, true, ROW_TYPES.PLAN_TIME, 5);
    push(this.groups, 6, "", false, 1, true, ROW_TYPES.RESULT_TIME, 5);
    push(this.groups, 7, "", false, 1, true, ROW_TYPES.RESULT_RATE, 5);
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
    push(this.groups, id, this.taskName, true, id, true, ROW_TYPES.TASK, id);
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
    push(
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
    push(
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
    push(
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
const push = (groups, id, title, parent, parentId, show, type, sameGroupId) => {
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

export default Group;
