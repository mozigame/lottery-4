import K3PlayType from '../K3PlayType';
import BaseItem from './BaseItem';
import Toast from '../../../common/toast';
import EBTH from './EBTH';

export default class EBTHDT extends K3PlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.panelType = 'ebth_dt';
    this.showShake = false;
    this.setOptionsContent();
  }
  getTopTip () {
    return '选择2个不同号码，与开奖相同即中8元';
  }
  setOptionsContent () {
    // 0-5 6-11
    this.balls = [
      new BaseItem(1, '', '1', 48, 8),
      new BaseItem(2, '', '2', 48, 8),
      new BaseItem(3, '', '3', 48, 8),
      new BaseItem(4, '', '4', 48, 8),
      new BaseItem(5, '', '5', 48, 8),
      new BaseItem(6, '', '6', 48, 8),
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
    this.balls.map((v, i) => {
      if (i < 6) {
        v.isSelected && total++;
      }
    });
    if (ball && index < 6) {
      if (total <= 1) {
        this.balls[index + 6].setSelected(false);
      } else {
        Toast('胆码最多只能1个');
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
    if (first > 0 && second > 0 && first + second >= 2) {
      this.stakeCount = second;
      this.bonusTips = this.getFormattedBonusTips(8, 8, this.stakeCount * 2);
    } else {
      this.stakeCount = 0;
      this.bonusTips = '';
    }
  }
  getTickets () {
    let firstBall = this.balls.filter((ball, index) => ball.isSelected && index < 6);
    let secondBall = this.balls.filter((ball, index) => ball.isSelected && index > 5);
    if (firstBall.length > 0 && secondBall.length > 0 && firstBall.length + secondBall.length >= 2) {
      return secondBall.map(ball => {
        return BaseItem.getTicket(firstBall[0].num + ' ' + ball.num, ball.playType)
      })
    }
    return [];
  }
  getAutoTicket () {
    let play = new EBTH(this.lotteryId, this.playType);
    play.getAutoBall();
    return play.getTickets();
  }
}
