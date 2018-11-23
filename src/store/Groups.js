import { observable } from "mobx";

class Groups {
  @observable groups = [
    { id: 1, title: "group 1", parent: true, parentId: 1, show: false },
    { id: 2, title: "group 2", parent: false, parentId: 1, show: false },
    { id: 3, title: "group 3", parent: false, parentId: 1, show: false }
  ];
}

export default Groups;
