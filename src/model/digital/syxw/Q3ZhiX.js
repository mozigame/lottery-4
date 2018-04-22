import SYXWPlayType from '../SYXWPlayType';
import Random from '../../common/Random';

export default class Q3ZhiX extends SYXWPlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.rxNum = 3;
    this.rxBounds = 1170;
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
    return '按位猜对开奖前3位即中1170元';
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
      this.stakeCount = first * second * third;
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
    ticket.betNumber = this.ballSelected.map(value => {
      return value.join(',')
    }).join('#');
    return ticket;
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
    return this.getTicket();
  }
}
