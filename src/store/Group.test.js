import Group from "./Group";
import { ROW_TYPES } from "../util/Constants";

let store;
beforeEach(() => {
  store = new Group();
});

describe("nextGroupId", () => {
  it("init", () => {
    expect(store.nextGroupId).toBe(8);
  });

  it("add groups", () => {
    store.addTask();

    expect(store.nextGroupId).toBe(9);

    store.groups = [];
    expect(store.nextGroupId).toBe(1);
  });
});

describe("addTask", function() {
  it("addTask", () => {
    store.addTaskName("task 8");
    store.addTask();

    const group = store.groups[7];
    expect(Object.keys(group).length).toBe(7);
    expect(group.id).toBe(8);
    expect(group.title).toBe("task 8");
    expect(group.parent).toBe(true);
    expect(group.parentId).toBe(8);
    expect(group.show).toBe(true);
    expect(group.type).toBe(ROW_TYPES.TASK);
    expect(group.sameGroupId).toBe(8);
  });
});

describe("addChild", function() {
  it("show", () => {
    store.addChild(1, true);

    let group = store.groups[7];
    expect(Object.keys(group).length).toBe(7);
    expect(group.id).toBe(8);
    expect(group.title).toBe("group 8");
    expect(group.parent).toBe(false);
    expect(group.parentId).toBe(1);
    expect(group.show).toBe(true);
    expect(group.type).toBe(ROW_TYPES.PLAN_TIME);
    expect(group.sameGroupId).toBe(8);

    group = store.groups[8];
    expect(Object.keys(group).length).toBe(7);
    expect(group.id).toBe(9);
    expect(group.title).toBe("");
    expect(group.parent).toBe(false);
    expect(group.parentId).toBe(1);
    expect(group.show).toBe(true);
    expect(group.type).toBe(ROW_TYPES.RESULT_TIME);
    expect(group.sameGroupId).toBe(8);

    group = store.groups[9];
    expect(Object.keys(group).length).toBe(7);
    expect(group.id).toBe(10);
    expect(group.title).toBe("");
    expect(group.parent).toBe(false);
    expect(group.parentId).toBe(1);
    expect(group.show).toBe(true);
    expect(group.type).toBe(ROW_TYPES.RESULT_RATE);
    expect(group.sameGroupId).toBe(8);
  });

  it("hide", () => {
    store.addChild(1, false);

    let group = store.groups[7];
    expect(Object.keys(group).length).toBe(7);
    expect(group.id).toBe(8);
    expect(group.title).toBe("group 8");
    expect(group.parent).toBe(false);
    expect(group.parentId).toBe(1);
    expect(group.show).toBe(false);
    expect(group.type).toBe(ROW_TYPES.PLAN_TIME);
    expect(group.sameGroupId).toBe(8);

    group = store.groups[8];
    expect(Object.keys(group).length).toBe(7);
    expect(group.id).toBe(9);
    expect(group.title).toBe("");
    expect(group.parent).toBe(false);
    expect(group.parentId).toBe(1);
    expect(group.show).toBe(false);
    expect(group.type).toBe(ROW_TYPES.RESULT_TIME);
    expect(group.sameGroupId).toBe(8);

    group = store.groups[9];
    expect(Object.keys(group).length).toBe(7);
    expect(group.id).toBe(10);
    expect(group.title).toBe("");
    expect(group.parent).toBe(false);
    expect(group.parentId).toBe(1);
    expect(group.show).toBe(false);
    expect(group.type).toBe(ROW_TYPES.RESULT_RATE);
    expect(group.sameGroupId).toBe(8);
  });
});

describe("changeShowHide", function() {
  it("show", () => {
    store.addTask();
    store.addChild(8, false);

    store.changeShowHide(8);

    //初期値確認
    for (let i = 0; i < 7; i++) {
      expect(store.groups[i].parentId).toBe(1);
      expect(store.groups[i].show).toBe(true);
    }

    //以下が表示/非表示切り替え対象
    expect(store.groups[7].parent).toBe(true);
    expect(store.groups[7].parentId).toBe(8);
    expect(store.groups[7].show).toBe(false);
    expect(store.groups[7].type).toBe(ROW_TYPES.TASK);

    expect(store.groups[8].parent).toBe(false);
    expect(store.groups[8].parentId).toBe(8);
    expect(store.groups[8].show).toBe(true);
    expect(store.groups[8].type).toBe(ROW_TYPES.PLAN_TIME);

    expect(store.groups[9].parent).toBe(false);
    expect(store.groups[9].parentId).toBe(8);
    expect(store.groups[9].show).toBe(true);
    expect(store.groups[9].type).toBe(ROW_TYPES.RESULT_TIME);

    expect(store.groups[10].parent).toBe(false);
    expect(store.groups[10].parentId).toBe(8);
    expect(store.groups[10].show).toBe(true);
    expect(store.groups[10].type).toBe(ROW_TYPES.RESULT_RATE);
  });

  it("hide", () => {
    store.addTask();
    store.addChild(8, true);

    store.changeShowHide(8);

    //初期値確認
    for (let i = 0; i < 7; i++) {
      expect(store.groups[i].parentId).toBe(1);
      expect(store.groups[i].show).toBe(true);
    }

    //以下が表示/非表示切り替え対象
    expect(store.groups[7].parent).toBe(true);
    expect(store.groups[7].parentId).toBe(8);
    expect(store.groups[7].show).toBe(false);
    expect(store.groups[7].type).toBe(ROW_TYPES.TASK);

    expect(store.groups[8].parent).toBe(false);
    expect(store.groups[8].parentId).toBe(8);
    expect(store.groups[8].show).toBe(false);
    expect(store.groups[8].type).toBe(ROW_TYPES.PLAN_TIME);

    expect(store.groups[9].parent).toBe(false);
    expect(store.groups[9].parentId).toBe(8);
    expect(store.groups[9].show).toBe(false);
    expect(store.groups[9].type).toBe(ROW_TYPES.RESULT_TIME);

    expect(store.groups[10].parent).toBe(false);
    expect(store.groups[10].parentId).toBe(8);
    expect(store.groups[10].show).toBe(false);
    expect(store.groups[10].type).toBe(ROW_TYPES.RESULT_RATE);
  });
});

describe("addTaskName", function() {
  it("addTaskName", () => {
    expect(store.taskName).toBe("");

    store.addTaskName("a");
    expect(store.taskName).toBe("a");

    store.addTaskName("b");
    expect(store.taskName).toBe("b");
  });
});

describe("removeChild", function() {
  it("removeChild", () => {
    store.removeChild(2);

    expect(store.groups.length).toBe(4);
    expect(store.groups[1].id).toBe(5);
  });
});

describe("removeTask", function() {
  it("removeTask", () => {
    store.addTaskName("test");
    store.addTask();
    store.removeTask(1);

    const group = store.groups[0];
    expect(store.groups.length).toBe(1);
    expect(group.title).toBe("test");
  });
});

describe("changeTitle", function() {
  it("changeTitle", () => {
    expect(store.groups[0].title).toBe("task 1");
    expect(store.groups[1].title).toBe("group 2");

    store.changeTitle(1, "changed Title");
    expect(store.groups[0].title).toBe("changed Title");
    expect(store.groups[1].title).toBe("group 2");
  });
});

describe("nextItemId", function() {
  it("init", () => {
    expect(store.nextItemId).toBe(2);
  });
});

describe("addItems", function() {
  it("addItem", () => {
    expect(store.items.length).toBe(1);

    store.addItemName(6.5);
    store.addItems(3, 1544064300000);
    expect(store.items.length).toBe(2);
    const item = store.items[1];
    expect(item.title).toBe(6.5);
    expect(item.start_time.format()).toBe("2018-12-06T00:00:00+09:00");
    expect(item.end_time.format()).toBe("2018-12-07T00:00:00+09:00");
  });
});

describe("addItemName", function() {
  it("addItemName", () => {
    expect(store.itemName).toBe("");

    store.addItemName(7.5);
    expect(store.itemName).toBe(7.5);
    expect(store.hasItemNameError).toBe(false);
    expect(store.itemNameErrorMessage).toBe("");

    store.addItemName("a");
    expect(store.itemName).toBe("a");
    expect(store.hasItemNameError).toBe(true);
    expect(store.itemNameErrorMessage).toBe("数値を入力してください。");

    store.addItemName("");
    expect(store.itemName).toBe("");
    expect(store.hasItemNameError).toBe(false);
    expect(store.itemNameErrorMessage).toBe("");
  });
});
