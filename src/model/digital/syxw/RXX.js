import SYXWPlayType from '../SYXWPlayType';
import Random from '../../common/Random';

export default class RXX extends SYXWPlayType {
  constructor (lotteryId, playType, rxNum, rxBounds) {
    super(lotteryId, playType);
    this.rxNum = rxNum;
    this.rxBounds = rxBounds;
    this.ballSelected = [];
    this.showShake = true;
  }
  getTopTip () {
    return '至少选{0}个号'.format(this.rxNum);
  }
  getBottomTip () {
    return '猜对任意{0}个即中{1}元'.format(Math.min(this.rxNum, 5), this.rxBounds);
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
    const size = this.ballSelected.length;
    if (size >= this.rxNum) {
      this.stakeCount = this.combination(size, this.rxNum);
      this.getBonusTips(size);
    } else {
      this.stakeCount = 0;
      this.bonusTips = '';
    }
  }
  getBonusTips (size) {
    let bonus;
    if (this.rxNum < 5) {
      bonus = this.combination(Math.min(size, this.prizeBallCount), this.rxNum) * this.rxBounds;
      let prizeCount = this.prizeBallCount - (this.ballCountRed - size);
      let minBonus = this.rxBounds;
      if (prizeCount > this.rxNum) {
        minBonus = this.combination(prizeCount, this.rxNum) * this.rxBounds;
      }
      if (bonus >= minBonus) {
        this.bonusTips = this.getFormattedBonusTips(minBonus, bonus, this.stakeCount * this.TicketPrice);
      } else {
        this.bonusTips = this.getFormattedBonusTips(bonus, minBonus, this.stakeCount * this.TicketPrice);
      }
    } else if (this.rxNum === 5) {
      this.bonusTips = this.getFormattedBonusTips(this.rxBounds, this.rxBounds, this.stakeCount * this.TicketPrice);
    } else {
      bonus = this.combination(size - this.prizeBallCount, this.rxNum - this.prizeBallCount) * this.rxBounds;
      this.bonusTips = this.getFormattedBonusTips(bonus, bonus, this.stakeCount * this.TicketPrice);
    }
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
