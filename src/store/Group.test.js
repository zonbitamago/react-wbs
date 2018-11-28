import Group from "./Group";
import { ROW_TYPES } from "../util/Constants";

let store;
beforeEach(() => {
  store = new Group();
});

describe("nextId", () => {
  it("init", () => {
    expect(store.nextId).toBe(8);
  });

  it("add groups", () => {
    store.addTask();

    expect(store.nextId).toBe(9);

    store.groups = [];
    expect(store.nextId).toBe(1);
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
