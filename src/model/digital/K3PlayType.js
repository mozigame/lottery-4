import DigitalPlayType from './DigitalPlayType';
import BaseItem from './k3/BaseItem';

export default class K3PlayType extends DigitalPlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.prizeBallCount = 3;
    this.stakeCount = 0;
    this.bonusTips = '';
  }
  onBallChanged (ball) {
    if (ball) {
      if (ball.isSelected) this.stakeCount--;
      else this.stakeCount++;
      ball.setSelected(!ball.isSelected);
    }
    let maxBonus = 0;
    let minBonus = 999999999;
    this.balls.map(v => {
      if (v.isSelected) {
        maxBonus = v.bonus > maxBonus ? v.bonus : maxBonus;
        minBonus = v.bonus < minBonus ? v.bonus : minBonus;
      }
    });
    if (this.stakeCount > 0) {
      this.bonusTips = this.getFormattedBonusTips(minBonus, maxBonus, 2 * this.stakeCount);
    } else {
      this.bonusTips = '';
    }
  }
  clearSelected () {
    this.balls = this.balls.map(ball => {
      ball.setSelected(false);
      return ball;
    });
    this.stakeCount = 0;
    this.bonusTips = '';
  }
  getTickets () {
    return this.balls.filter(ball => ball.isSelected).map(ball => {
      return BaseItem.getTicket(ball.serverNum, ball.playType);
    });
  }
  getAutoTicket () {
    this.getAutoBall();
    return this.getTickets();
  }
}
