import DLTPlayType from '../DLTPlayType';
import Toast from '../../../common/toast';
import Normal from './Normal';

export default class DT extends DLTPlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.maxRed = 15;
    this.ballSelected = [[], [], [], []];
  }
  initBettingPanelBallGroups () {
    const groups = [{
      title: '胆码区-前区 至少选1个，至多选4个',
      list: this.generateBalls(this.ballCountRed)
    }, {
      title: '拖码区-前区 至少选2个 ',
      list: this.generateBalls(this.ballCountRed)
    }, {
      title: '胆码区-后区 至多选1个',
      color: 'blue',
      list: this.generateBalls(this.ballCountBlue)
    }, {
      title: '拖码区-后区 至少选2个',
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
    if (item.selected) {
      selected[index].splice(selected[index].indexOf(item.id), 1);
    } else {
      if (index < 2) {
        if (index === 0 && selected[0].length >= this.minRed - 1) {
          Toast('最多只能选{0}个'.format(this.minRed - 1));
        } else {
          if (selected[0].indexOf(item.id) === -1 && selected[1].indexOf(item.id) === -1) {
            selected[index].push(item.id);
          } else {
            selected[index].push(item.id);
            const other = index === 0 ? 1 : 0;
            selected[other].splice(selected[other].indexOf(item.id), 1);
          }
        }
      } else {
        if (index === 2 && selected[2].length >= 1) {
          Toast('最多只能选1个');
        } else {
          if (selected[2].indexOf(item.id) === -1 && selected[3].indexOf(item.id) === -1) {
            selected[index].push(item.id);
          } else {
            selected[index].push(item.id);
            const other = index === 2 ? 3 : 2;
            selected[other].splice(selected[other].indexOf(item.id), 1);
          }
        }
      }
    }
    const redSure = selected[0].length;
    const redNotSure = selected[1].length;
    const blueSure = selected[2].length;
    const blueNotSure = selected[3].length;
    if (redSure < this.minRed && redSure >= 1 && redNotSure >= 2 &&
      (redSure + redNotSure) > this.minRed &&
      blueSure < this.minBlue && blueSure >= 1 && blueNotSure >= 2 &&
      (blueSure + blueNotSure) > this.minBlue) {
      this.stakeCount = this.combination(redNotSure, this.minRed - redSure) * this.combination(blueNotSure, this.minBlue - blueSure);
      if (this.stakeCount > 10000) {
        Toast('单倍方案不能超过20000');
        this.stakeCount = 0;
      }
    } else {
      this.stakeCount = 0;
    }
  }
  getTicket () {
    let ticket = this.getBaseTicket();
    const block = this.ballSelected.map(value => value.join(','));
    ticket.betNumber = block[0] + '@' + block[1] + '#' + block[2] + '@' + block[3];
    ticket.playTypeText = '胆拖';
    ticket.betType = this.getTicketBetType(true);
    return ticket;
  }
  clearSelected () {
    this.ballSelected = [[], [], [], []];
    this.stakeCount = 0;
  }
  getAutoTicket () {
    let r = new Normal(this.lotteryId, {id: this.playType.id, value: '普通'});
    let ticket = r.getAutoTicket();
    ticket.betType = this.getTicketBetType(true);
    return ticket;
  }
}
