import DigitalPlayType from './DigitalPlayType';

export default class SSQPlayType extends DigitalPlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.prizeBallCount = 5;
    this.ballCountRed = 33;
    this.ballCountBlue = 16;
    this.minRed = 6;
    this.minBlue = 1;
    this.stakeCount = 0;
  }
}
