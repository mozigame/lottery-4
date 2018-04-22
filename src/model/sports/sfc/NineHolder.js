import SportsHolder from '../SportsHolder';

export default class NineHolder extends SportsHolder {
  constructor (obj) {
    super(obj);
    this.round_id = obj.round_id;
    this.setHolderList();
    this.selected = [];
  }
  setHolderList () {
    this.holderList = [];
    this.holderList.push({ key: 'v3', text: 3 })
    this.holderList.push({ key: 'v1', text: 1 })
    this.holderList.push({ key: 'v0', text: 0 })
  }
}
