import SYXWPlayType from '../SYXWPlayType';
import Random from '../../common/Random';

export default class LX2 extends SYXWPlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.bonus1 = 201;
    this.bonus2 = 71;
    this.bonus3 = 6;
    this.rxNum = 2;
    this.ballSelected = [[], []];
    this.showShake = true;
  }
  clearSelected () {
    this.ballSelected = [[], []];
    this.resetBottomTip();
  }
  getTopTip () {
    return '每位至少选1个号';
  }
  getBottomTip () {
    return '按位猜对前2位即中201元<br>不定位猜对前2位即中71元<br>不定位猜对任意2位即中6元';
  }
  initBettingPanelBallGroups () {
    const groups = [{
      name: '万位', list: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
    }, {
      name: '千位', list: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
    }];
    return groups.map((value, index) => {
      value.list = value.list.map(v => {
        return {id: v, selected: this.ballSelected[index].indexOf(v) !== -1};
      });
      return value;
    })
  }
  onBallChanged (item, index) {
    const selected = this.ballSelected;
    if (item) {
      if (item.selected) {
        selected[index].splice(selected[index].indexOf(item.id), 1);
      } else {
        if (selected[0].indexOf(item.id) === -1 && selected[1].indexOf(item.id) === -1) {
          selected[index].push(item.id);
        } else {
          selected[index].push(item.id);
          const other = index === 0 ? 1 : 0;
          selected[other].splice(selected[other].indexOf(item.id), 1);
        }
      }
    }
    const first = selected[0].length;
    const second = selected[1].length;
    if (first > 0 && second > 0) {
      this.stakeCount = first * second * 3;
      this.getBonusTips(first, second);
    } else {
      this.stakeCount = 0;
      this.bonusTips = '';
    }
  }
  getBonusTips (first, second) {
    this.bonusTips = this.getFormattedBonusTips(this.getMinBonus(first, second), this.getMaxBonus(first, second), this.stakeCount * this.TicketPrice);
  }
  getMinBonus (selected1, selected2) {
    let allSelected = selected1 + selected2;
    let remainBall = this.ballCountRed - allSelected;
    let minRedBall = remainBall < 3 ? 5 - remainBall : 2;
    let min = 500000;
    let team = 0;
    for (let i = 1; i <= selected1; i++) {
      for (let j = 1; j <= selected2; j++) {
        if ((i + j) === minRedBall) {
          team = i * j * this.bonus3;
          min > team ? min = team : '';
        }
      }
    }
    return min;
  }
  getMaxBonus (selected1, selected2) {
    let allSelected = selected1 + selected2;
    selected1--;
    selected2--;
    let redBall = allSelected < 5 ? allSelected : 5;
    let remainRedBall = redBall - 2;
    if (selected1 === 0 || selected2 === 0) {
      return this.bonus1 + remainRedBall * this.bonus3;
    } else {
      return this.bonus1 + remainRedBall * this.bonus3 + 2 * this.bonus3;
    }
  }
  getTickets () {
    this.sortBallSelected();
    let tickets = [];
    let selected = this.ballSelected;
    for (let i = 0, il = selected[0].length; i < il; i++) {
      for (let j = 0, jl = selected[1].length; j < jl; j++) {
        let ticket = {};
        ticket.playType = this.playType.id;
        ticket.playTypeText = this.playType.value;
        ticket.stakeCount = 3;
        ticket.lotteryType = 'syxw';
        ticket.totalAmount = 3 * this.TicketPrice;
        ticket.betType = 1;
        ticket.betNumber = selected[0][i] + '#' + selected[1][j];
        tickets.push(ticket);
      }
    }
    return tickets;
  }
  getAutoBall () {
    let random = Random.indexStr(this.rxNum, 1, this.ballCountRed);
    let result = [];
    for (let i = 0; i < this.rxNum; i++) {
      result[i] = [random[i]];
    }
    this.ballSelected = result;
  }
  getAutoTicket () {
    this.getAutoBall();
    return this.getTickets();
  }
}
