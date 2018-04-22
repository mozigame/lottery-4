import K3PlayType from '../K3PlayType';
import BaseItem from './BaseItem';
import Random from '../../common/Random';
import Combine from '../../common/Combine';

export default class EBTH extends K3PlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.panelType = 'ebth';
    this.showShake = true;
    this.setOptionsContent();
  }
  getTopTip () {
    return '';
  }
  setOptionsContent () {
    this.balls = [
      new BaseItem(1, '', '1', 48, 8),
      new BaseItem(2, '', '2', 48, 8),
      new BaseItem(3, '', '3', 48, 8),
      new BaseItem(4, '', '4', 48, 8),
      new BaseItem(5, '', '5', 48, 8),
      new BaseItem(6, '', '6', 48, 8)
    ]
  }
  onBallChanged (ball, index) {
    if (ball) {
      ball.setSelected(!ball.isSelected);
    }
    let total = 0;
    this.balls.map((v) => {
      v.isSelected && total++;
    });
    if (total >= 2) {
      this.stakeCount = this.combination(total, 2);
      this.bonusTips = this.getFormattedBonusTips(8, 8, this.stakeCount * 2);
    } else {
      this.stakeCount = 0;
      this.bonusTips = '';
    }
  }
  getAutoBall () {
    let arr = Random.indexs(2, 0, 5);
    this.balls = this.balls.map((ball, index) => {
      ball.setSelected(arr.includes(index));
      return ball;
    });
  }
  getTickets () {
    let selected = this.balls.filter(ball => ball.isSelected).map(ball => ball.num);
    if (selected.length >= 2) {
      let combine = new Combine(selected);
      let ticketNumber = combine.startCombine(2);
      return ticketNumber.map(num => {
        return BaseItem.getTicket(num.join(' '), this.balls[0].playType);
      })
    } else {
      return [];
    }
  }
}
