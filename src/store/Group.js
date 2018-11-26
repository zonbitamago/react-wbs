import { observable, computed, action } from "mobx";

class Group {
  @observable groups = [];
  @observable taskName = "";

  @computed get nextId() {
    return this.groups.length + 1;
  }

  constructor() {
    //サンプルデータ
    push(this.groups, 1, "task 1", true, 1, true);
    push(this.groups, 2, "group 2", false, 1, true);
    push(this.groups, 3, "group 3", false, 1, true);
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
    push(this.groups, id, this.taskName, true, id, true);
  }

  /**
   * 子要素追加処理
   * @param {Number} parentId 親要素
   * @param {Boolean} show　true:表示 false:非表示
   */
  @action.bound
  addChild(parentId, show) {
    const id = this.nextId;
    push(this.groups, id, `group ${id}`, false, parentId, show);
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
 */
const push = (groups, id, title, parent, parentId, show) => {
  groups.push({
    id: id,
    title: title,
    parent: parent,
    parentId: parentId,
    show: show
  });
};
export default Group;
