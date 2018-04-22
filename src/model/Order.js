import DigitalLotteryOrder from './digital/DigitalLotteryOrder';
import SportsLotteryOrder from './sports/SportsLotteryOrder';

export default class Order {
  constructor (obj) {
    if (obj.jc_info) {
      return new SportsLotteryOrder(obj);
    } else if (obj.tickets) {
      return new DigitalLotteryOrder(obj);
    }
  }
}
