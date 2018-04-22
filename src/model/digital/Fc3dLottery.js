import DigitalLottery from './DigitalLottery';

export default class Fc3dLottery extends DigitalLottery {
  constructor (obj) {
    super(obj);
    this.lotteryType = 'fc3d';
  }
  setTicketPrizeColor () {
    // todo
  }
}
