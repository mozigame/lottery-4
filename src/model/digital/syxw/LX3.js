import SYXWPlayType from '../SYXWPlayType';
import Random from '../../common/Random';

export default class LX3 extends SYXWPlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.bonus1 = 1384;
    this.bonus2 = 214;
    this.bonus3 = 19;
    this.rxNum = 3;
    this.ballSelected = [[], [], []];
    this.showShake = true;
  }
  clearSelected () {
    this.ballSelected = [[], [], []];
    this.resetBottomTip();
  }
  getTopTip () {
    return '每位至少选1个号';
  }
  getBottomTip () {
    return '按位猜对前3位即中1384元<br>不定位猜对前3位即中214元<br>不定位猜对任意3位即中19元\n';
  }
  initBettingPanelBallGroups () {
    const groups = [{
      name: '万位', list: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
    }, {
      name: '千位', list: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
    }, {
      name: '百位', list: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
    }];
    return groups.map((value, index) => {
      value.list = value.list.map(v => {
        return {id: v, selected: this.ballSelected[index].indexOf(v) !== -1};
      });
      return value;
    })
  }
  onBallChanged (item, index) {
    let selected = this.ballSelected;
    if (item) {
      if (item.selected) {
        selected[index].splice(selected[index].indexOf(item.id), 1);
      } else {
        this.ballSelected = selected.map((value, key) => {
          if (value.indexOf(item.id) !== -1) {
            value.splice(value.indexOf(item.id), 1);
          }
          index === key ? value.push(item.id) : '';
          return value;
        })
      }
    }
    const first = selected[0].length;
    const second = selected[1].length;
    const third = selected[2].length;
    if (first > 0 && second > 0 && third > 0) {
      this.stakeCount = first * second * third * 3;
      this.getBonusTips(first, second, third);
    } else {
      this.stakeCount = 0;
      this.bonusTips = '';
    }
  }
  getBonusTips (first, second, third) {
    this.bonusTips = this.getFormattedBonusTips(this.getMinBonus(first, second, third),
      this.getMaxBonus(first, second, third), this.stakeCount * this.TicketPrice);
  }
  getMinBonus (selected1, selected2, selected3) {
    let allSelected = selected1 + selected2 + selected3;
    let remainBall = this.ballCountRed - allSelected;
    let minRedBall = remainBall < 2 ? 5 - remainBall : 3;
    let min = 500000;
    let team = 0;
    for (let i = 1; i <= selected1; i++) {
      for (let j = 1; j <= selected2; j++) {
        for (let z = 1; z <= selected3; z++) {
          if ((i + j + z) === minRedBall) {
            team = i * j * z * this.bonus3;
            min > team ? min = team : '';
          }
        }
      }
    }
    return min;
  }
  getMaxBonus (selected1, selected2, selected3) {
    let allSelected = selected1 + selected2 + selected3;
    selected1--;
    selected2--;
    selected3--;
    let redBall = allSelected < 5 ? allSelected : 5;
    let remainRedBall = redBall - 3;
    if (selected1 > 0 && selected2 > 0) {
      remainRedBall++;
    } else if (selected2 > 0 && selected3 > 0) {
      remainRedBall++;
    } else if (selected1 > 0 && selected3 > 0) {
      remainRedBall++;
    }
    return this.bonus1 + remainRedBall * this.bonus3;
  }
  getTickets () {
    this.sortBallSelected();
    let tickets = [];
    let selected = this.ballSelected;
    for (let i = 0, il = selected[0].length; i < il; i++) {
      for (let j = 0, jl = selected[1].length; j < jl; j++) {
        for (let z = 0, zl = selected[2].length; z < zl; z++) {
          let ticket = {};
          ticket.playType = this.playType.id;
          ticket.playTypeText = this.playType.value;
          ticket.lotteryType = 'syxw';
          ticket.stakeCount = 3;
          ticket.totalAmount = 3 * this.TicketPrice;
          ticket.betType = 1;
          ticket.betNumber = selected[0][i] + '#' + selected[1][j] + '#' + selected[2][z];
          tickets.push(ticket);
        }
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
