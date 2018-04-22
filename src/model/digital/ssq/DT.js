import SSQPlayType from '../SSQPlayType';
import Toast from '../../../common/toast';
import Normal from './Normal';

export default class DT extends SSQPlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.maxRed = 15;
    this.minRed = 6;
    this.ballSelected = [[], [], []];
  }
  initBettingPanelBallGroups () {
    const groups = [{
      title: '胆码区-前区 至少选1个，至多选5个',
      list: this.generateBalls(this.ballCountRed)
    }, {
      title: '拖码区-前区 至少选1个 ',
      list: this.generateBalls(this.ballCountRed)
    }, {
      title: '后区 至少选1个',
      color: 'blue',
      list: this.generateBalls(this.ballCountBlue)
    }];
    return groups.map((value, index) => {
      value.list = value.list.map(v => {
        return {id: v, selected: this.ballSelected[index].indexOf(v) !== -1};
      });
      return value;
    });
  }
  onBallChanged (item, index) {
    const selected = this.ballSelected;
    if (index < 2) {
      if (item.selected) {
        selected[index].splice(selected[index].indexOf(item.id), 1);
      } else {
        if (index === 0 && selected[0].length >= this.minRed - 1) {
          Toast('最多只能选{0}个'.format(this.minRed - 1));
        } else if (index === 1 && selected[1].length >= this.maxRed) {
          Toast('最多只能选{0}个'.format(this.maxRed));
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
    } else {
      item.selected ? selected[index].splice(selected[index].indexOf(item.id), 1)
        : selected[index].push(item.id);
    }
    const sure = selected[0].length;
    const notSure = selected[1].length;
    const blue = selected[2].length;
    console.log(sure, notSure, blue);
    if (sure >= 1 && notSure >= 1 && blue >= 1 && (sure + notSure) > this.minRed) {
      this.stakeCount = this.combination(notSure, this.minRed - sure) * this.combination(blue, this.minBlue);
    } else {
      this.stakeCount = 0;
    }
  }
  getTicket () {
    let ticket = this.getBaseTicket();
    const block = this.ballSelected.map(value => value.join(','));
    ticket.betNumber = block[0] + '@' + block[1] + '#' + block[2];
    ticket.playTypeText = '胆拖';
    ticket.betType = this.getTicketBetType(true);
    return ticket;
  }
  getAutoTicket () {
    let r = new Normal(this.lotteryId, {id: this.playType.id, value: '普通'});
    let ticket = r.getAutoTicket();
    ticket.betType = this.getTicketBetType(true);
    return ticket;
  }
  clearSelected () {
    this.ballSelected = [[], [], []];
    this.stakeCount = 0;
  }
}
