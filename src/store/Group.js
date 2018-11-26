import { observable, computed, action } from "mobx";
import { ROW_TYPES } from "../util/Constants";

class Group {
  @observable groups = [];
  @observable taskName = "";

  @computed get nextId() {
    return this.groups.length + 1;
  }

  constructor() {
    //サンプルデータ
    push(this.groups, 1, "task 1", true, 1, true, ROW_TYPES.TASK);

    push(this.groups, 2, "group 2", false, 1, true, ROW_TYPES.PLAN_TIME);
    push(this.groups, 3, "", false, 1, true, ROW_TYPES.RESULT_TIME);
    push(this.groups, 4, "", false, 1, true, ROW_TYPES.RESULT_RATE);

    push(this.groups, 5, "group 3", false, 1, true, ROW_TYPES.PLAN_TIME);
    push(this.groups, 6, "", false, 1, true, ROW_TYPES.RESULT_TIME);
    push(this.groups, 7, "", false, 1, true, ROW_TYPES.RESULT_RATE);
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
    push(this.groups, id, this.taskName, true, id, true, ROW_TYPES.TASK);
  }

  /**
   * 子要素追加処理
   * @param {Number} parentId 親要素
   * @param {Boolean} show　true:表示 false:非表示
   */
  @action.bound
  addChild(parentId, show) {
    let id = this.nextId;
    const title = `group ${id}`;
    push(this.groups, id, title, false, parentId, show, ROW_TYPES.PLAN_TIME);

    id = this.nextId;
    push(this.groups, id, "", false, parentId, show, ROW_TYPES.RESULT_TIME);

    id = this.nextId;
    push(this.groups, id, "", false, parentId, show, ROW_TYPES.RESULT_RATE);
  }

  @action.bound
  changeShowHide(parentId) {
    this.groups.forEach(group => {
      if (group.parentId === parentId) {
        group.show = !group.show;
      }
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
 */
const push = (groups, id, title, parent, parentId, show, type) => {
  groups.push({
    id: id,
    title: title,
    parent: parent,
    parentId: parentId,
    show: show,
    type: type
  });
};
export default Group;
