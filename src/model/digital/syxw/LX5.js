import LX4 from './LX4';

export default class LX5 extends LX4 {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.rxNum = 5;
    this.bonus1 = 1080;
    this.bonus2 = 90;
    this.ballSelected = [];
  }
  getTopTip () {
    return '至少选{0}个号'.format(this.rxNum);
  }
  getBottomTip () {
    return '猜对任意4个中90元<br>猜对5个中1080元';
  }
  onBallChanged (item) {
    const selected = this.ballSelected;
    if (item) {
      item.selected ? selected.splice(selected.indexOf(item.id), 1)
        : selected.push(item.id);
    }
    const size = this.ballSelected.length;
    if (size >= this.rxNum) {
      this.stakeCount = this.combination(size, this.rxNum) * 7;
      this.getBonusTips(size);
    } else {
      this.stakeCount = 0;
      this.bonusTips = '';
    }
  }
}
