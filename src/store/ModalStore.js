import { observable, action } from "mobx";
import { ROW_TYPES } from "../util/Constants";

class ModalStore {
  @observable modalIsOpen = false;
  @observable modalGroupId = "";
  @observable modalTime = 0;
  @observable modalTask = "";

  /**
   * モーダルオープン状態設定処理
   * @param {Array} groupList item追加対象リスト
   * @param {Number} groupId item追加対象groupId
   * @param {Number} time ミリ秒
   */
  @action.bound
  openModal(groupList, groupId, time) {
    const isExistRow = groupList.some(node => {
      return node.id === groupId;
    });
    if (!isExistRow) {
      return;
    }

    let rowType = "";
    groupList.forEach(node => {
      if (node.id === groupId) rowType = node.type;
    });
    if (rowType === ROW_TYPES.TASK) {
      return;
    }

    this.modalIsOpen = true;
    this.modalGroupId = groupId;
    this.modalTask = rowType;
    this.modalTime = time;
  }

  /**
   * モーダルクローズ状態設定処理
   * @param {Function} addItemNameFunc 表示用ItemName初期化処理
   */
  @action.bound
  closeModal(addItemNameFunc) {
    this.modalIsOpen = false;
    addItemNameFunc("");
  }
}

export default ModalStore;
