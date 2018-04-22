import DigitalPlayType from './DigitalPlayType';

export default class SYXWPlayType extends DigitalPlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.prizeBallCount = 5;
    this.ballCountRed = 11;
    this.stakeCount = 0;
    this.bonusTips = '';
  }
  clearSelected () {
    this.ballSelected = [];
    this.resetBottomTip();
  }
  resetBottomTip () {
    this.stakeCount = 0;
    this.bonusTips = '';
  }
  getBaseTicket () {
    let ticket = super.getBaseTicket();
    ticket.lotteryType = 'syxw';
    return ticket;
  }
}
