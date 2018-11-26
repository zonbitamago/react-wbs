import Group from "./Group";

let store;
beforeEach(() => {
  store = new Group();
});

describe("nextId", () => {
  it("init", () => {
    expect(store.nextId).toBe(4);
  });

  it("add groups", () => {
    store.groups.push({});

    expect(store.nextId).toBe(5);
  });
});

describe("addTask", function() {
  it("addTask", () => {
    store.addTaskName("task 4");
    store.addTask();
    const group = store.groups[3];
    expect(group.id).toBe(4);
    expect(group.title).toBe("task 4");
    expect(group.parent).toBe(true);
    expect(group.parentId).toBe(4);
    expect(group.show).toBe(true);
  });
});

describe("addChild", function() {
  it("show", () => {
    store.addChild(3, true);
    const group = store.groups[3];
    expect(group.id).toBe(4);
    expect(group.title).toBe("group 4");
    expect(group.parent).toBe(false);
    expect(group.parentId).toBe(3);
    expect(group.show).toBe(true);
  });

  it("hide", () => {
    store.addChild(2, false);
    const group = store.groups[3];
    expect(group.id).toBe(4);
    expect(group.title).toBe("group 4");
    expect(group.parent).toBe(false);
    expect(group.parentId).toBe(2);
    expect(group.show).toBe(false);
  });
});

describe("changeShowHide", function() {
  it("show", () => {
    store.addTask();
    store.addChild(4, false);

    store.changeShowHide(4);

    expect(store.groups[0].parentId).toBe(1);
    expect(store.groups[0].show).toBe(true);

    expect(store.groups[1].parentId).toBe(1);
    expect(store.groups[1].show).toBe(true);

    expect(store.groups[2].parentId).toBe(1);
    expect(store.groups[2].show).toBe(true);

    //以下2つが表示/非表示切り替え対象
    expect(store.groups[3].parentId).toBe(4);
    expect(store.groups[3].show).toBe(false);

    expect(store.groups[4].parentId).toBe(4);
    expect(store.groups[4].show).toBe(true);
  });

  it("hide", () => {
    store.addTask();
    store.addChild(4, true);

    store.changeShowHide(4);

    expect(store.groups[0].parentId).toBe(1);
    expect(store.groups[0].show).toBe(true);

    expect(store.groups[1].parentId).toBe(1);
    expect(store.groups[1].show).toBe(true);

    expect(store.groups[2].parentId).toBe(1);
    expect(store.groups[2].show).toBe(true);

    //以下2つが表示/非表示切り替え対象
    expect(store.groups[3].parentId).toBe(4);
    expect(store.groups[3].show).toBe(false);

    expect(store.groups[4].parentId).toBe(4);
    expect(store.groups[4].show).toBe(false);
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