import SYXWPlayType from '../SYXWPlayType';
import Random from '../../common/Random';

export default class Q3ZuX extends SYXWPlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.rxNum = 3;
    this.rxBounds = 195;
    this.ballSelected = [];
    this.showShake = true;
  }
  getTopTip () {
    return '至少选3个号';
  }
  getBottomTip () {
    return '猜对前3个开奖号即中195元';
  }
  initBettingPanelBallGroups () {
    const groups = [{
      name: '选号', list: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
    }];
    return groups.map(value => {
      value.list = value.list.map(v => {
        return {id: v, selected: this.ballSelected.indexOf(v) !== -1};
      });
      return value;
    })
  }
  onBallChanged (item) {
    const selected = this.ballSelected;
    if (item) {
      item.selected ? selected.splice(selected.indexOf(item.id), 1)
        : selected.push(item.id);
    }
    const size = selected.length;
    if (size >= this.rxNum) {
      this.stakeCount = this.combination(size, this.rxNum);
      this.getBonusTips();
    } else {
      this.stakeCount = 0;
      this.bonusTips = '';
    }
  }
  getBonusTips () {
    this.bonusTips = this.getFormattedBonusTips(this.rxBounds, this.rxBounds, this.stakeCount * this.TicketPrice);
  }
  getTicket () {
    let ticket = this.getBaseTicket();
    ticket.betNumber = this.ballSelected.join(',');
    return ticket;
  }
  getAutoBall () {
    this.ballSelected = Random.indexStr(this.rxNum, 1, this.ballCountRed);
  }
  getAutoTicket () {
    this.getAutoBall();
    return this.getTicket();
  }
}
