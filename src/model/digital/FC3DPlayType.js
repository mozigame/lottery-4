import DigitalPlayType from './DigitalPlayType';

export default class FC3DPlayType extends DigitalPlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.stakeCount = 0;
  }
  clearSelected () {
    this.ballSelected = [];
  }
  resetBottomTip () {
    this.stakeCount = 0;
  }
  getBaseTicket () {
    let ticket = super.getBaseTicket();
    ticket.lotteryType = 'fc3d';
    return ticket;
  }
}
