import {LOTTERYIDS} from '../store/constants';
import Util from '../common/util';
import store from '../store/index';
import { LOTTERY_LIST_REFRESH } from '../store/home/types';
import { CURRENT_LOTTERY_REFRESH } from '../store/betting/types';
import Lottery from './common/Lottery';

const playTypeGroup = [
  {name: '乐选', list: [{id: 34, value: '乐选二'}, {id: 35, value: '乐选三'}, {id: 36, value: '乐选四'}, {id: 37, value: '乐选五'}]},
  {name: '普通', list: [{id: 22, value: '任选二'}, {id: 23, value: '任选三'}, {id: 24, value: '任选四'}, {id: 25, value: '任选五'}, {id: 26, value: '任选六'}, {id: 27, value: '任选七'}, {id: 28, value: '任选八'}, {id: 30, value: '前二直选'}, {id: 31, value: '前二组选'}, {id: 32, value: '前三直选'}, {id: 33, value: '前三组选'}]},
  {name: '胆拖', list: [{id: 22, value: '任选二胆拖', sure: true}, {id: 23, value: '任选三胆拖', sure: true}, {id: 24, value: '任选四胆拖', sure: true}, {id: 25, value: '任选五胆拖', sure: true}, {id: 26, value: '任选六胆拖', sure: true}, {id: 27, value: '任选七胆拖', sure: true}, {id: 31, value: '前二组选胆拖', sure: true}, {id: 33, value: '前三组选胆拖', sure: true}]}
];

export default class HomeLotteryItem {
  constructor (obj, serverTime) {
    this.lottery_image = obj.lottery_image;
    this.lottery_name = obj.lottery_name;
    this.lottery_id = parseInt(obj.lottery_id);
    this.priority = obj.priority;
    this.slogon = obj.slogon;
    this.short_slogon = obj.short_slogon;
    this.status = obj.status;
    this.next_issue_start_time = obj.next_issue_start_time;
    this.is_plus_award = obj.is_plus_award;
    this.end_time = obj.end_time;
    this.serverTime = serverTime;
    this.no = obj.no || obj.issue_no;
    this.timerType = obj.timerType;
    this.play_type_list = obj.play_type_list;
    this.tipText = '';
    this.addTo = Lottery.isDLT(this.lottery_id);
    if (this.status === 0) {
      this.priority = 3;
      this.tipText = '暂停销售';
    } else {
      if (Lottery.isDigital(this.lottery_id)) {
        if (this.next_issue_start_time > 0) {
          this.component = Lottery.getComponent(this.lottery_id);
          this.betTip = '距离--期截止还有--';
          this.firstTime = (this.end_time - this.serverTime + Date.now() / 1000);
          this.secondTimestamp = this.next_issue_start_time - this.end_time;
          this.setTipText();
        } else {
          this.tipText = '暂无新彩期信息';
          this.betTip = '暂无新彩期信息';
        }
      } else {
        this.component = Lottery.getComponent(this.lottery_id);
        this.setTipText();
      }
    }
    this.setPlayTypeList();
  }
  setTipText () {
    switch (this.lottery_id) {
      case LOTTERYIDS.SYXW:
      case LOTTERYIDS.SYXW8:
      case LOTTERYIDS.SYXW18:
      case LOTTERYIDS.K3:
      case LOTTERYIDS.JXK3:
        this.timer = Util.timeCountdown(this.firstTime, (time) => {
          if (time > 0) {
            let fmtStr = time > 60 ? 'm分s秒' : 's秒';
            this.tipText = '截止:{0}'.format(Util.timeFmt(time, fmtStr));
            this.betTip = '距离{0}期截止还有{1}'.format(this.no, Util.timeFmt(time, fmtStr));
          } else {
            this.timer = Util.timeCountdown(this.secondTimestamp + (Date.now() / 1000), (t) => {
              if (t > 0) {
                let fmtStr = t > 3600 ? 'h时m分' : t > 60 ? 'm分s秒' : 's秒';
                this.tipText = '下一期:{0}'.format(Util.timeFmt(t, fmtStr));
                this.betTip = '本期已结束，等待下一期:{0}'.format(Util.timeFmt(t, fmtStr));
              } else {
                // 刷新
                this.betTip = this.tipText = '正在获取新彩期...';
                window.clearInterval(this.timer);
                if (this.timerType === 'bet') {
                  store.dispatch(CURRENT_LOTTERY_REFRESH, this.lottery_id);
                } else {
                  store.dispatch(LOTTERY_LIST_REFRESH, this.lottery_id);
                }
              }
            })
          }
        });
        break;
      case LOTTERYIDS.DLT:
      case LOTTERYIDS.SSQ:
      case LOTTERYIDS.FC3D:
        const hours = Math.floor((this.end_time - this.serverTime) / 3600);
        const days = Math.floor(hours / 24);
        const minute = Math.floor((this.end_time - this.serverTime - hours * 3600) / 60);
        if (days > 0) {
          this.tipText = '截止:{0}天{1}小时'.format(days, hours % 24);
        } else if (hours > 0) {
          this.tipText = '截止:{0}小时{1}分钟'.format(hours % 24, minute);
        } else if (minute > 0) {
          this.tipText = '截止:{0}分钟'.format(minute)
        }
        break;
      case LOTTERYIDS.FOOTBALL:
      case LOTTERYIDS.BASKETBALL:
      case LOTTERYIDS.SFC:
      case LOTTERYIDS.RXJ:
        this.tipText = this.short_slogon;
    }
  }
  onClearInterval () {
    this.timer && clearInterval(this.timer);
  }
  setPlayTypeList () {
    if (this.play_type_list) {
      if (this.play_type_list.length > 0) {
        let group = [];
        let lx = [34, 35, 36, 37].filter(v => this.play_type_list.includes(String(v)));
        if (lx && lx.length > 0) {
          group.push({name: playTypeGroup[0].name, list: playTypeGroup[0].list.filter(l => lx.includes(l.id))})
        }
        let rx = [22, 23, 24, 25, 26, 27, 28, 30, 31, 32, 33].filter(v => this.play_type_list.includes(String(v)));
        if (rx && rx.length > 0) {
          group.push({name: playTypeGroup[1].name, list: playTypeGroup[1].list.filter(l => rx.includes(l.id))});
          group.push({name: playTypeGroup[2].name, list: playTypeGroup[2].list.filter(l => rx.includes(l.id))});
        }
        this.playTypeGroup = group;
      } else {
        this.playTypeGroup = playTypeGroup;
      }
    } else {
      this.playTypeGroup = playTypeGroup;
    }
  }
}
