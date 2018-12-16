import Modal from "./Modal";
import { ROW_TYPES } from "../util/Constants";

let store;
beforeEach(() => {
  store = new Modal();
});

describe("init", function() {
  it("init", () => {
    expect(store.modalIsOpen).toBe(false);
    expect(store.modalGroupId).toBe("");
    expect(store.modalTime).toBe(0);
    expect(store.modalTask).toBe("");
  });
});

describe("openModal", function() {
  it("modalOpen", () => {
    const groupList = [
      { id: 1, type: ROW_TYPES.TASK },
      { id: 2, type: ROW_TYPES.PLAN_TIME },
      { id: 3, type: ROW_TYPES.RESULT_TIME },
      { id: 4, type: ROW_TYPES.RESULT_RATE }
    ];
    const groupId = 2;
    const time = 1544064300000;
    store.openModal(groupList, groupId, time);
    expect(store.modalIsOpen).toBe(true);
    expect(store.modalGroupId).toBe(groupId);
    expect(store.modalTask).toBe(ROW_TYPES.PLAN_TIME);
    expect(store.modalTime).toBe(time);
  });

  it("task row can not open", () => {
    const groupList = [
      { id: 1, type: ROW_TYPES.TASK },
      { id: 2, type: ROW_TYPES.PLAN_TIME },
      { id: 3, type: ROW_TYPES.RESULT_TIME },
      { id: 4, type: ROW_TYPES.RESULT_RATE }
    ];

    const groupId = 1;
    const time = 1544064300000;
    store.openModal(groupList, groupId, time);
    expect(store.modalIsOpen).toBe(false);
    expect(store.modalGroupId).toBe("");
    expect(store.modalTask).toBe("");
    expect(store.modalTime).toBe(0);
  });

  it("no included id can not open", () => {
    const groupList = [
      { id: 1, type: ROW_TYPES.TASK },
      { id: 2, type: ROW_TYPES.PLAN_TIME },
      { id: 3, type: ROW_TYPES.RESULT_TIME },
      { id: 4, type: ROW_TYPES.RESULT_RATE }
    ];

    const groupId = 5;
    const time = 1544064300000;
    store.openModal(groupList, groupId, time);
    expect(store.modalIsOpen).toBe(false);
    expect(store.modalGroupId).toBe("");
    expect(store.modalTask).toBe("");
    expect(store.modalTime).toBe(0);
  });
});

describe("closeModal", function() {
  it("open to close", () => {
    store.modalIsOpen = true;
    let name = "test";
    const addItemName = itemName => {
      name = itemName;
    };

    store.closeModal(addItemName);
    expect(store.modalIsOpen).toBe(false);
    expect(name).toBe("");
  });

  it("close to close", () => {
    store.modalIsOpen = false;
    let name = "test";
    const addItemName = itemName => {
      name = itemName;
    };

    store.closeModal(addItemName);
    expect(store.modalIsOpen).toBe(false);
    expect(name).toBe("");
  });
});
