import SYXWPlayType from '../SYXWPlayType';
import Toast from '../../../common/toast';
import RXX from './RXX';

export default class RXXDT extends SYXWPlayType {
  constructor (lotteryId, playType, rxNum, rxBounds) {
    super(lotteryId, playType);
    this.rxNum = rxNum;
    this.rxBounds = rxBounds;
    this.ballSelected = [[], []];
  }
  clearSelected () {
    this.ballSelected = [[], []];
    this.resetBottomTip();
  }
  getTopTip () {
    return '';
  }
  getBottomTip () {
    return '猜对任意{0}个即中{1}元'.format(Math.min(this.rxNum, 5), this.rxBounds);
  }
  initBettingPanelBallGroups () {
    const groups = [{
      name: '胆码',
      title: '请选择您认为必出的号码，至少选1个，至多选{0}个'.format(this.rxNum - 1),
      list: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
    }, {
      name: '托码',
      title: '选择您认为可能出的号码',
      list: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
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
        if (index === 0 && selected[0].length >= this.rxNum - 1) {
          Toast('最多只能选{0}个'.format(this.rxNum - 1));
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
    }
    const sure = selected[0].length;
    const notSure = selected[1].length;
    const choice = this.rxNum;
    if (sure < choice && sure > 0 && notSure > 0 && (sure + notSure) > choice) {
      this.stakeCount = this.combination(notSure, (choice - sure));
      this.getBonusTips(sure, notSure);
    } else {
      this.stakeCount = 0;
      this.bonusTips = '';
    }
  }
  getBonusTips (sureCount, notSureCount) {
    let bonus;
    const ticketTotalPrice = this.stakeCount * this.TicketPrice;
    if (this.rxNum < 5) {
      let selectCount = Math.min(this.prizeBallCount - sureCount, notSureCount);
      bonus = this.combination(selectCount, this.rxNum - sureCount) * this.rxBounds;
      let remainPrizeCount = this.prizeBallCount - (this.ballCountRed - notSureCount);
      let minBonus = this.rxBounds;
      if (remainPrizeCount > this.rxNum - sureCount) {
        minBonus = this.combination(remainPrizeCount, this.rxNum - sureCount) * this.rxBounds;
      }
      if (bonus >= minBonus) {
        this.bonusTips = this.getFormattedBonusTips(minBonus, bonus, ticketTotalPrice);
      } else {
        this.bonusTips = this.getFormattedBonusTips(bonus, minBonus, ticketTotalPrice);
      }
    } else if (this.rxNum === 5) {
      this.bonusTips = this.getFormattedBonusTips(this.rxBounds, this.rxBounds, ticketTotalPrice);
    } else {
      let choiceCount = this.rxNum - this.prizeBallCount;
      let prizeCount = this.prizeBallCount - sureCount;
      if (prizeCount >= 0) {
        bonus = this.combination(notSureCount - prizeCount, choiceCount) * this.rxBounds;
      } else {
        bonus = this.combination(choiceCount, this.rxNum - sureCount) * this.rxBounds;
      }
      let remainPrizeCount = this.rxNum - this.prizeBallCount - sureCount;
      let minBonus = this.rxBounds;
      if (remainPrizeCount > 0) {
        minBonus = this.combination(notSureCount - this.prizeBallCount, remainPrizeCount) * this.rxBounds;
      }
      if (bonus >= minBonus) {
        this.bonusTips = this.getFormattedBonusTips(minBonus, bonus, ticketTotalPrice);
      } else {
        this.bonusTips = this.getFormattedBonusTips(bonus, minBonus, ticketTotalPrice);
      }
    }
  }
  getTicket () {
    let ticket = this.getBaseTicket();
    ticket.betType = this.getTicketBetType(true);
    ticket.betNumber = this.ballSelected.map(value => {
      return value.join(',')
    }).join('@');
    return ticket;
  }
  getAutoTicket () {
    let rxx = new RXX(this.lotteryId, {id: this.playType.id, value: this.playType.value.replace('胆拖', '')}, this.rxNum, this.rxBounds);
    let ticket = rxx.getAutoTicket();
    ticket.betType = this.getTicketBetType(true);
    return ticket;
  }
}
