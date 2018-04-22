import DLTPlayType from '../DLTPlayType';
import Toast from '../../../common/toast';
import Random from '../../common/Random';

export default class Normal extends DLTPlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.showShake = true;
    this.maxRed = 20;
    this.ballSelected = [[], []];
  }
  initBettingPanelBallGroups () {
    const groups = [{
      title: '至少选5个红球',
      list: this.generateBalls(this.ballCountRed)
    }, {
      title: '至少选2个蓝球',
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
    if (item) {
      if (item.selected) {
        selected[index].splice(selected[index].indexOf(item.id), 1);
      } else {
        if (index === 0 && selected[0].length >= this.maxRed) {
          Toast('最多只能选择{0}个'.format(this.maxRed));
        } else {
          selected[index].push(item.id);
        }
      }
    }
    const first = selected[0].length;
    const second = selected[1].length;
    if (first >= this.minRed && second >= this.minBlue) {
      this.stakeCount = this.combination(first, this.minRed) * this.combination(second, this.minBlue);
    } else {
      this.stakeCount = 0;
    }
  }
  getAutoBall () {
    this.ballSelected = [Random.indexStr(this.minRed, 1, this.ballCountRed), Random.indexStr(this.minBlue, 1, this.ballCountBlue)];
  }
  getTicket () {
    let ticket = this.getBaseTicket();
    ticket.betNumber = this.ballSelected.map(value => value.join(',')).join('#');
    ticket.playTypeText = '普通';
    return ticket;
  }
  clearSelected () {
    this.ballSelected = [[], []];
    this.stakeCount = 0;
  }
}
