import SportsLotteryJcInfo from './SportsLotteryJcInfo';
import LotteryOrder from '../LotteryOrder';
import { SeriesType } from '../../store/constants';

export default class SportsLotteryOrder extends LotteryOrder {
  constructor (obj) {
    super(obj);
    this.jc_info = obj.jc_info;
    this.series = obj.series;
    this.handleJcInfo();
    this.setContentTitle();
  }
  handleJcInfo () {
    this.jc_info = this.jc_info.map(jc => {
      return new SportsLotteryJcInfo(jc, this.lottery_id);
    })
  }
  // 设置表格title
  setContentTitle () {
    let seriesArr = this.series.split(',').map(value => {
      return SeriesType[value];
    })
    let seriesStr = seriesArr.join(',');
    // 串数统计
    this.contextTitle = '投注内容：' + this.stackCount + '注, ' + this.jc_info.length + '场, ' +
      seriesStr + `, ${this.multiple}倍`;
    if (String(this.lottery_id) === '20' || String(this.lottery_id) === '21') {
      this.issueNoShow = true;
    }
  }
}
