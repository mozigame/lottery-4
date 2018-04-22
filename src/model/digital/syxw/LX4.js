import SYXWPlayType from '../SYXWPlayType';
import Combine from '../../common/Combine';
import Random from '../../common/Random';

export default class LX4 extends SYXWPlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.rxNum = 4;
    this.bonus1 = 154;
    this.bonus2 = 19;
    this.ballSelected = [];
    this.showShake = true;
  }
  getTopTip () {
    return '至少选{0}个号'.format(this.rxNum);
  }
  getBottomTip () {
    return '猜对任意3个中19元<br>猜对4个中154元';
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
      this.stakeCount = this.combination(size, this.rxNum) * 5;
      this.getBonusTips(size);
    } else {
      this.stakeCount = 0;
      this.bonusTips = '';
    }
  }
  getBonusTips (size) {
    this.bonusTips = this.getFormattedBonusTips(this.getMinBonus(size), this.getMaxBonus(size), this.stakeCount * this.TicketPrice);
  }
  getMinBonus (selectedCount) {
    if (this.ballCountRed - selectedCount < 5 - this.rxNum) {
      if (this.ballSelected - selectedCount === 0) {
        return this.getMaxBonus(selectedCount);
      } else {
        return this.bonus1 + 4 * 6 * this.bonus2;
      }
    }
    return (selectedCount - this.rxNum + 1) * this.bonus2;
  }
  getMaxBonus (selectedCount) {
    let count = Math.min(5, selectedCount);
    let b1 = this.combination(count, this.rxNum) * this.bonus1;
    let b2 = this.combination(count, this.rxNum - 1) * (selectedCount - count) * this.bonus2;
    return b1 + b2;
  }
  getTickets () {
    this.sortBallSelected();
    let selected = this.ballSelected;
    let combine = new Combine(selected);
    let ticketNumber = combine.startCombine(this.rxNum);
    return ticketNumber.map(value => {
      let ticket = {};
      ticket.playType = this.playType.id;
      ticket.playTypeText = this.playType.value;
      ticket.lotteryType = 'syxw';
      ticket.stakeCount = this.stakeCount;
      ticket.totalAmount = this.stakeCount * this.TicketPrice;
      ticket.betType = 1;
      ticket.betNumber = value.join(',');
      return ticket;
    });
  }
  getAutoBall () {
    this.ballSelected = Random.indexStr(this.rxNum, 1, this.ballCountRed);
  }
  getAutoTicket () {
    this.getAutoBall();
    return this.getTickets();
  }
}
