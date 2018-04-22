import K3PlayType from '../K3PlayType';
import BaseItem from './BaseItem';
import Toast from '../../../common/toast';
import Combine from '../../common/Combine';
import SBTH from './SBTH';

export default class SBTHDT extends K3PlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.panelType = 'sbth_dt';
    this.showShake = false;
    this.setOptionsContent();
  }
  getTopTip () {
    return '选择3个不同号码，与开奖相同即中40元';
  }
  setOptionsContent () {
    // 0-5 6-11
    this.balls = [
      new BaseItem(1, '', '1', 45, 40),
      new BaseItem(2, '', '2', 45, 40),
      new BaseItem(3, '', '3', 45, 40),
      new BaseItem(4, '', '4', 45, 40),
      new BaseItem(5, '', '5', 45, 40),
      new BaseItem(6, '', '6', 45, 40),
      new BaseItem(1, '', '1', 45, 40),
      new BaseItem(2, '', '2', 45, 40),
      new BaseItem(3, '', '3', 45, 40),
      new BaseItem(4, '', '4', 45, 40),
      new BaseItem(5, '', '5', 45, 40),
      new BaseItem(6, '', '6', 45, 40)
    ]
  }
  onBallChanged (ball, index) {
    if (ball) {
      ball.setSelected(!ball.isSelected);
    }
    let total = 0;
    this.balls.map((v, i) => {
      if (i < 6) {
        v.isSelected && total++;
      }
    });
    if (ball && index < 6) {
      if (total <= 2) {
        this.balls[index + 6].setSelected(false);
      } else {
        Toast('胆码最多只能两个');
        ball.setSelected(!ball.isSelected);
      }
    } else {
      this.balls[index - 6].setSelected(false);
    }
    let first = 0;
    let second = 0;
    this.balls.map((v, i) => {
      i < 6 && v.isSelected && first++;
      i > 5 && v.isSelected && second++;
    });
    if (first > 0 && second > 0 && first + second > 2) {
      this.stakeCount = this.combination(second, 3 - first);
      this.bonusTips = this.getFormattedBonusTips(40, 40, this.stakeCount * 2);
    } else {
      this.stakeCount = 0;
      this.bonusTips = '';
    }
  }
  getTickets () {
    let firstBall = this.balls.filter((ball, index) => ball.isSelected && index < 6);
    let secondBall = this.balls.filter((ball, index) => ball.isSelected && index > 5);
    if (firstBall.length > 0 && secondBall.length > 0 && firstBall.length + secondBall.length > 2) {
      let preText = firstBall.map(ball => ball.num).join(' ');
      let selected = secondBall.map(ball => ball.num);
      let combine = new Combine(selected);
      let ticketNumber = combine.startCombine(3 - firstBall.length);
      return ticketNumber.map(num => {
        return BaseItem.getTicket(preText + ' ' + num.join(' '), this.balls[0].playType);
      })
    }
    return [];
  }
  getAutoTicket () {
    let play = new SBTH(this.lotteryId, this.playType);
    play.getAutoBall();
    return play.getTickets();
  }
}
