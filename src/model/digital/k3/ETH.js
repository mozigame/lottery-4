import K3PlayType from '../K3PlayType';
import BaseItem from './BaseItem';
import Random from '../../common/Random';

export default class ETH extends K3PlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.panelType = 'eth';
    this.showShake = true;
    this.setOptionsContent();
  }
  getTopTip () {
    return '猜对子号（2个号相同）';
  }
  setOptionsContent () {
    // 0-5 6-11 12-17
    this.balls = [
      new BaseItem(11, '', '1 1', 46, 80),
      new BaseItem(22, '', '2 2', 46, 80),
      new BaseItem(33, '', '3 3', 46, 80),
      new BaseItem(44, '', '4 4', 46, 80),
      new BaseItem(55, '', '5 5', 46, 80),
      new BaseItem(66, '', '6 6', 46, 80),
      new BaseItem(1, '', '1', 46, 80),
      new BaseItem(2, '', '2', 46, 80),
      new BaseItem(3, '', '3', 46, 80),
      new BaseItem(4, '', '4', 46, 80),
      new BaseItem(5, '', '5', 46, 80),
      new BaseItem(6, '', '6', 46, 80),
      new BaseItem('11*', '', '1 1 *', 47, 15),
      new BaseItem('22*', '', '2 2 *', 47, 15),
      new BaseItem('33*', '', '3 3 *', 47, 15),
      new BaseItem('44*', '', '4 4 *', 47, 15),
      new BaseItem('55*', '', '5 5 *', 47, 15),
      new BaseItem('66*', '', '6 6 *', 47, 15)
    ]
  }
  onBallChanged (ball, index) {
    if (ball) {
      if (index <= 5) {
        ball.setSelected(!ball.isSelected);
        this.balls[index + 6].setSelected(false);
      } else if (index <= 11) {
        ball.setSelected(!ball.isSelected);
        this.balls[index - 6].setSelected(false);
      } else {
        ball.setSelected(!ball.isSelected);
      }
    }
    let first = 0;
    let second = 0;
    let three = 0;
    this.balls.map((v, i) => {
      if (i <= 5 && v.isSelected) first++;
      else if (i <= 11 && v.isSelected) second++;
      else if (v.isSelected) three++;
    });
    if (first > 0 && second > 0) {
      this.stakeCount = first * second + three;
      this.bonusTips = this.getFormattedBonusTips(three > 0 ? 15 : 80, 80, this.stakeCount * 2);
    } else if (three > 0) {
      this.stakeCount = three;
      this.bonusTips = this.getFormattedBonusTips(15, 15, this.stakeCount * 2);
    } else {
      this.stakeCount = 0;
      this.bonusTips = '';
    }
  }
  getAutoBall () {
    let r1 = Random.getInt(0, 5);
    let r2 = Random.getInt(6, 11);
    if (r2 - r1 === 6) {
      r1 = (r1 + 1) % 5;
    }
    this.balls = this.balls.map((ball, index) => {
      ball.setSelected(r1 === index || index === r2);
      return ball;
    });
    this.stakeCount = 1;
  }
  getTickets () {
    let result = [];
    let firstBalls = this.balls.filter((ball, index) => index < 6 && ball.isSelected);
    let secondBalls = this.balls.filter((ball, index) => index > 5 && index < 12 && ball.isSelected);
    let threeBalls = this.balls.filter((ball, index) => index > 11 && ball.isSelected);
    if (firstBalls.length > 0 && secondBalls.length > 0) {
      firstBalls.map(first => {
        secondBalls.map(second => {
          result.push(BaseItem.getTicket(first.serverNum + ' ' + second.serverNum, first.playType))
        })
      })
    }
    if (threeBalls.length > 0) {
      result = result.concat(threeBalls.map(ball => {
        return BaseItem.getTicket(ball.serverNum, ball.playType);
      }))
    }
    return result;
  }
}
