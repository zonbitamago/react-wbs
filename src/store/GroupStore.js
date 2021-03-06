import { observable, computed, action } from "mobx";
import { ROW_TYPES } from "../util/Constants";
import moment from "moment";

class GroupStore {
  @observable groups = [];
  @observable taskName = "";
  @observable items = [];
  @observable itemName = "";
  // 入力値チェック
  @observable hasItemNameError = false;
  @observable itemNameErrorMessage = "";

  @computed get nextGroupId() {
    const nowId =
      this.groups.length === 0
        ? 0
        : Math.max(...this.groups.map(group => group.id));

    return nowId + 1;
  }

  @computed get nextItemId() {
    const nowId =
      this.items.length === 0
        ? 0
        : Math.max(...this.items.map(item => item.id));

    return nowId + 1;
  }

  @computed get planTimes() {
    return this.items.reduce((sum, node) => {
      return (sum +=
        node.task === ROW_TYPES.PLAN_TIME ? Number(node.title) : 0);
    }, 0);
  }

  @computed get resultTimes() {
    return this.items.reduce((sum, node) => {
      return (sum +=
        node.task === ROW_TYPES.RESULT_TIME ? Number(node.title) : 0);
    }, 0);
  }

  constructor() {
    // サンプルデータ
    // グループ
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

    // アイテム
    pushItems(
      this.items,
      1,
      2,
      7.5,
      moment({ h: 0, m: 0, s: 0, ms: 0 }),
      moment({ h: 0, m: 0, s: 0, ms: 0 }).add(1, "day"),
      ROW_TYPES.PLAN_TIME
    );

    pushItems(
      this.items,
      2,
      3,
      6,
      moment({ h: 0, m: 0, s: 0, ms: 0 }),
      moment({ h: 0, m: 0, s: 0, ms: 0 }).add(1, "day"),
      ROW_TYPES.RESULT_TIME
    );

    pushItems(
      this.items,
      3,
      4,
      95,
      moment({ h: 0, m: 0, s: 0, ms: 0 }),
      moment({ h: 0, m: 0, s: 0, ms: 0 }).add(1, "day"),
      ROW_TYPES.RESULT_RATE
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
    const id = this.nextGroupId;
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
    let id = this.nextGroupId;
    const sameGroupId = this.nextGroupId;
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

    id = this.nextGroupId;
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

    id = this.nextGroupId;
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

  /**
   *
   * @param {Number} group 追加対象group
   * @param {String} title 画面表示文言
   * @param {Number} time ミリ秒
   */
  @action.bound
  addItems(group, time, task) {
    if (isNaN(this.itemName)) {
      return;
    }
    const id = this.nextItemId;
    const day = new Date(time);

    pushItems(
      this.items,
      id,
      group,
      this.itemName,
      moment({
        y: day.getFullYear(),
        M: day.getMonth(),
        d: day.getDate(),
        h: 0,
        m: 0,
        s: 0,
        ms: 0
      }),
      moment({
        y: day.getFullYear(),
        M: day.getMonth(),
        d: day.getDate(),
        h: 0,
        m: 0,
        s: 0,
        ms: 0
      }).add(1, "day"),
      task
    );
  }

  @action.bound
  addItemName(itemName) {
    this.itemName = itemName;
    if (isNaN(this.itemName)) {
      this.hasItemNameError = true;
      this.itemNameErrorMessage = "数値を入力してください。";
    } else {
      this.hasItemNameError = false;
      this.itemNameErrorMessage = "";
    }
  }

  @action.bound
  removeItems(id) {
    this.items = this.items.filter(node => {
      return node.id !== id;
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

const pushItems = (items, id, group, title, start_time, end_time, task) => {
  items.push({
    id: id,
    group: group,
    title: Number(title),
    start_time: start_time,
    end_time: end_time,
    task: task
  });
};

export default GroupStore;
