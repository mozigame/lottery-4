import {PlayType} from '../../../store/constants';
export default class BaseItem {
  constructor (num, award, serverNum, playType, bonus) {
    this.num = num;
    this.award = award;
    this.serverNum = serverNum;
    this.bonus = bonus;
    this.playType = playType;
    this.isSelected = false;
  }
  setSelected (selected) {
    this.isSelected = selected;
  }
  static getTicket (text, playType) {
    return {
      betText: text,
      betNumber: text.split(' ').join(','),
      betType: 1,
      playTypeText: PlayType[playType],
      playType: playType,
      stakeCount: 1,
      totalAmount: 2,
      lotteryType: 'k3'
    }
  }
}
