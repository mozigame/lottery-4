import FourteenHolder from './sports/sfc/FourteenHolder';
import NineHolder from './sports/sfc/NineHolder';
import {LOTTERYIDS} from '../store/constants';

export default class SfcBetting {
  constructor (obj, lotteryId) {
    this.lotteryId = parseInt(lotteryId);
    this.no = obj.no;
    this.end_time = obj.end_time;
    this.sfc_issue_status = obj.sfc_issue_status;
    this.start_time = obj.start_time;
    this.schedules = obj.schedules;
    this.bottomTip = this.lotteryId === 20 ? '至少选择14场比赛' : '至少选择9场比赛';
    this.confirmStatus = false;
    this.sales = Date.now() - this.start_time * 1000 >= 0;
    this.setSchedules();
  }
  setSchedules () {
    this.schedules = this.schedules.map((schedule) => {
      schedule.end_time = this.end_time;
      schedule.lotteryId = this.lotteryId;
      schedule.lotteryType = 'sfc';
      switch (this.lotteryId) {
        case LOTTERYIDS.SFC:
          return new FourteenHolder(schedule);
        case LOTTERYIDS.RXJ:
          return new NineHolder(schedule);
      }
    })
  }
  setBottomTip () {
    let total = 0;
    this.schedules.map(schedule => {
      schedule.checked && total++;
    });
    if (total) {
      this.bottomTip = '已选{0}场'.format(total);
      if (this.sales) {
        this.confirmStatus = this.lotteryId === 20 ? total >= 14 : total >= 9;
      }
    } else {
      this.bottomTip = this.lotteryId === 20 ? '至少选择14场比赛' : '至少选择9场比赛';
    }
  }
  clear () {
    this.schedules = this.schedules.map(schedule => {
      schedule.clearSelected();
      return schedule;
    });
    this.setBottomTip();
  }
  getBettingList () {
    console.log(this.schedules.filter(schedule => schedule.checked))
    return this.schedules.filter(schedule => schedule.checked);
  }
}
