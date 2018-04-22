import DigitalPlayType from './DigitalPlayType';

export default class DLTPlayType extends DigitalPlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.prizeBallCount = 5;
    this.ballCountRed = 35;
    this.ballCountBlue = 12;
    this.minRed = 5;
    this.minBlue = 2;
    this.stakeCount = 0;
  }
}
