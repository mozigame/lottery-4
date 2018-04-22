import { OrderStatus } from '../store/constants';
import Util from '../common/util';

export default class LotteryOrder {
  constructor (obj) {
    this.lottery_id = String(obj.lottery_id);
    this.issue_no = obj.issue_no;
    this.lottery_name = obj.lottery_name;
    this.status = obj.status;
    this.sku = obj.sku;
    this.id = obj.id;
    this.buying_time = obj.buying_time;
    this.lottery_image = obj.lottery_image;
    this.multiple = obj.multiple;
    this.stackCount = obj.total_amount / obj.multiple / 2;
    this.failure_amount = obj.failure_amount;
    this.total_amount = obj.total_amount;
    this.winnings_bonus = obj.winnings_bonus;
    this.plus_award_amount = obj.plus_award_amount;
    this.official_prize_time = obj.official_prize_time;
    this.handleStatus();
  }
  handleStatus () {
    this.statusText = OrderStatus[this.status];
    this.statusIcon = this.status === 5 ? 'win-icon'
      : this.status === 4 ? 'no-win-icon'
      : this.status === 8 ? 'refund-icon' : '';
    if (this.lottery_id === '1' || this.lottery_id === '3') {
      if (this.official_prize_time > 0 && (this.status === 7 || this.status === 3)) {
        const DayTime = 86400000;
        const currentStr = Util.timeFmt(Date.now() / 1000, 'yyyy-MM-dd');
        const timestamp = this.official_prize_time * 1000 - (new Date(currentStr)).getTime();
        if (timestamp > 2 * DayTime) {
          this.statusIconText = Util.timeFmt(this.official_prize_time, 'M/d') + ' 开奖';
          this.statusIcon = 'prize-time-icon';
        } else if (timestamp > DayTime) {
          this.statusIconText = '明日开奖';
          this.statusIcon = 'prize-time-icon';
        } else if (timestamp > 0) {
          this.statusIconText = '今日开奖';
          this.statusIcon = 'prize-time-icon';
        }
      }
    }
  }
}
