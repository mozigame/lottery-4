import DigitalLotteryTicket from './DigitalLotteryTicket';
import LotteryOrder from '../LotteryOrder';

export default class DigitalLotteryOrder extends LotteryOrder {
  constructor (obj) {
    super(obj);
    this.prize_num = obj.prize_num;
    this.tickets = obj.tickets;
    this.play_type = obj.play_type;
    this.issueNoShow = true;
    // 追号订单
    if (obj.type === 1) {
      this.current_follow_times = +obj.current_follow_times + 1;
      this.follow_times = obj.follow_times;
    }
    // 目前大乐透有追加投注
    if (obj.tickets[0] && obj.tickets[0].play_type === '2') {
      this.stackCount = obj.total_amount / obj.multiple / 3;
    }
    this.handleTickets();
  }
  handleTickets () {
    this.tickets = this.tickets.map(ticket => {
      return new DigitalLotteryTicket(ticket, this.lottery_id, this.prize_num);
    });
    if (this.prize_num) {
      this.prizeResult = this.tickets[0].prizeResult;
    }
  }
}
