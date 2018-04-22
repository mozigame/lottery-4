import K3PlayType from '../K3PlayType';
import BaseItem from './BaseItem';
import Random from '../../common/Random';

export default class STH extends K3PlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.panelType = 'sth';
    this.showShake = true;
    this.setOptionsContent();
  }
  getTopTip () {
    return '猜豹子号（三个号相同）';
  }
  setOptionsContent () {
    this.balls = [
      new BaseItem(111, '奖金240元', '1 1 1', 42, 240),
      new BaseItem(222, '奖金240元', '2 2 2', 42, 240),
      new BaseItem(333, '奖金240元', '3 3 3', 42, 240),
      new BaseItem(444, '奖金240元', '4 4 4', 42, 240),
      new BaseItem(555, '奖金240元', '5 5 5', 42, 240),
      new BaseItem(666, '奖金240元', '6 6 6', 42, 240),
      new BaseItem('三同号通选', '任意一个豹子开出，即中40元', 'A A A', 43, 40)
    ]
  }
  getAutoBall () {
    let r = Random.getInt(0, 6);
    this.balls = this.balls.map((ball, index) => {
      ball.setSelected(r === index);
      return ball;
    });
    this.stakeCount = 1;
  }
}
