import SYXWPlayType from '../SYXWPlayType';
import Random from '../../common/Random';

export default class Q2ZhiX extends SYXWPlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.rxNum = 2;
    this.rxBounds = 130;
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
    return '按位猜对开奖前2位即中130元';
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
      this.stakeCount = first * second;
      this.getBonusTips(first, second);
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
