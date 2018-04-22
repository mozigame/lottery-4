import K3PlayType from '../K3PlayType';
import BaseItem from './BaseItem';
import Random from '../../common/Random';
import Combine from '../../common/Combine';

export default class SBTH extends K3PlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.panelType = 'sbth';
    this.showShake = true;
    this.setOptionsContent();
  }
  getTopTip () {
    return ' ';
  }
  setOptionsContent () {
    this.balls = [
      new BaseItem(1, '', '1', 45, 40),
      new BaseItem(2, '', '2', 45, 40),
      new BaseItem(3, '', '3', 45, 40),
      new BaseItem(4, '', '4', 45, 40),
      new BaseItem(5, '', '5', 45, 40),
      new BaseItem(6, '', '6', 45, 40),
      new BaseItem('三连号通选', '', 'A,B,C', 44, 40)
    ]
  }
  onBallChanged (ball) {
    if (ball) {
      ball.setSelected(!ball.isSelected);
    }
    let total = 0;
    this.balls.map((v, index) => {
      if (index < 6) {
        v.isSelected && total++;
      }
    });
    if (total >= 3 && this.balls[6].isSelected) {
      this.stakeCount = this.combination(total, 3) + 1;
      this.bonusTips = this.getFormattedBonusTips(10, 40, this.stakeCount * 2);
    } else if (total >= 3) {
      this.stakeCount = this.combination(total, 3);
      this.bonusTips = this.getFormattedBonusTips(40, 40, this.stakeCount * 2);
    } else if (this.balls[6].isSelected) {
      this.stakeCount = 1;
      this.bonusTips = this.getFormattedBonusTips(40, 40, this.stakeCount * 2);
    } else {
      this.stakeCount = 0;
      this.bonusTips = '';
    }
  }
  getAutoBall () {
    let randomArr = Random.indexs(3, 0, 5);
    this.balls = this.balls.map((ball, index) => {
      ball.setSelected(randomArr.includes(index));
      return ball;
    });
  }
  getTickets () {
    let result = [];
    let selected = this.balls.filter((ball, i) => ball.isSelected && i < 6).map(ball => ball.num);
    if (selected.length >= 3) {
      let combine = new Combine(selected);
      let ticketNumber = combine.startCombine(3);
      result = result.concat(ticketNumber.map(number => {
        return BaseItem.getTicket(number.join(' '), this.balls[0].playType);
      }))
    }
    if (this.balls[6].isSelected) {
      result.push(BaseItem.getTicket(this.balls[6].serverNum, this.balls[6].playType));
    }
    return result;
  }
}
