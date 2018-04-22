import {LOTTERYIDS} from '../store/constants';
import Lottery from './common/Lottery';
import SPFHolder from './sports/football/SPFHolder';
import RQSPFHolder from './sports/football/RQSPFHolder';
import BFHolder from './sports/football/BFHolder';
import ZJQHolder from './sports/football/ZJQHolder';
import BQCHolder from './sports/football/BQCHolder';
import HHHolder from './sports/football/HHHolder';
import SFHolder from './sports/basketball/SFHolder';
import RFSFHolder from './sports/basketball/RFSFHolder';
import SFCHolder from './sports/basketball/SFCHolder';
import DXFHolder from './sports/basketball/DXFHolder';
import BHHHolder from './sports/basketball/HHHolder';
const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
export default class SportsBetting {
  constructor (obj, mode) {
    this.lotteryId = parseInt(obj.lottery_id);
    this.mode = mode;
    this.groups = obj.groups;
    this.groups = this.groups.map(value => {
      value.weekdayText = weeks[new Date(value.name).getDay()];
      value.schedules = value.schedules.map(v => {
        v.lotteryId = this.lotteryId;
        v.mode = this.mode;
        v.name = value.name;
        if (Lottery.isFootBall(this.lotteryId)) {
          v.lotteryType = 'football';
        } else if (Lottery.isBasketBall(this.lotteryId)) {
          v.lotteryType = 'basketball';
        }
        return this.setCurrentHolderFactory(v);
      })
      return value;
    });
    this.setBottomTip();
  }
  setBottomTip () {
    let total = 0;
    this.groups.map(value => {
      value.schedules.map(v => {
        v.checked && total++;
      });
    });
    if (total) {
      this.bottomTip = '已选{0}场'.format(total);
    } else {
      this.bottomTip = this.mode === 2 ? '至少选择两场比赛' : '至少选择一场比赛';
    }
    if (total > 15) {
      this.bottomTip = '不能超过15场';
    }
    this.total = total;
  }
  clearSelected () {
    this.groups = this.groups.map(value => {
      value.schedules = value.schedules.map(v => {
        v.clearSelected();
        return v;
      });
      return value;
    })
    this.setBottomTip();
  }
  getBettingList () {
    let list = [];
    this.groups.map(value => value.schedules.map(v => {
      v.isSure = false;
      if (v.checked) {
        list.push(v);
      }
    }))
    return list;
  }
  setCurrentHolderFactory (item) {
    switch (this.lotteryId) {
      case LOTTERYIDS.FOOTBALL_SPF:
        return new SPFHolder(item);
      case LOTTERYIDS.FOOTBALL_RQSPF:
        return new RQSPFHolder(item);
      case LOTTERYIDS.FOOTBALL_BF:
        return new BFHolder(item);
      case LOTTERYIDS.FOOTBALL_ZJQ:
        return new ZJQHolder(item);
      case LOTTERYIDS.FOOTBALL_BQC:
        return new BQCHolder(item);
      case LOTTERYIDS.FOOTBALL_HH:
        return new HHHolder(item);
      case LOTTERYIDS.BASKETBALL_SF:
        return new SFHolder(item);
      case LOTTERYIDS.BASKETBALL_RFSF:
        return new RFSFHolder(item);
      case LOTTERYIDS.BASKETBALL_SFC:
        return new SFCHolder(item);
      case LOTTERYIDS.BASKETBALL_DXF:
        return new DXFHolder(item);
      case LOTTERYIDS.BASKETBALL_HH:
        return new BHHHolder(item);
    }
  }
}
