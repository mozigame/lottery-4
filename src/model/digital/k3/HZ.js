import K3PlayType from '../K3PlayType';
import BaseItem from './BaseItem';
import Random from '../../common/Random';

export default class HZ extends K3PlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.panelType = 'hz';
    this.showShake = true;
    this.setOptionsContent();
  }
  getTopTip () {
    return '猜开奖的所有号码相加的和';
  }
  setOptionsContent () {
    this.balls = [
      new BaseItem(3, '奖金240元', '1 1 1', 42, 240),
      new BaseItem(4, '奖金80元', '4', 41, 80),
      new BaseItem(5, '奖金40元', '5', 41, 40),
      new BaseItem(6, '奖金25元', '6', 41, 25),
      new BaseItem(7, '奖金16元', '7', 41, 16),
      new BaseItem(8, '奖金12元', '8', 41, 12),
      new BaseItem(9, '奖金10元', '9', 41, 10),
      new BaseItem(10, '奖金9元', '10', 41, 9),
      new BaseItem(11, '奖金9元', '11', 41, 9),
      new BaseItem(12, '奖金10元', '12', 41, 10),
      new BaseItem(13, '奖金12元', '13', 41, 12),
      new BaseItem(14, '奖金16元', '14', 41, 16),
      new BaseItem(15, '奖金25元', '15', 41, 25),
      new BaseItem(16, '奖金40元', '16', 41, 40),
      new BaseItem(17, '奖金80元', '17', 41, 80),
      new BaseItem(18, '奖金240元', '6 6 6', 42, 240)
    ];
  }
  getAutoBall () {
    let r = Random.getInt(3, 18);
    this.balls = this.balls.map(ball => {
      ball.setSelected(r === ball.num);
      return ball;
    });
    this.stakeCount = 1;
  }
}
