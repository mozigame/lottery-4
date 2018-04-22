import {PlayType} from '../store/constants';
import Lottery from './common/Lottery';

export default class HomeLotteryIssue {
  constructor (obj) {
    this.lottery_id = parseInt(obj.lottery_id);
    this.lottery_name = obj.lottery_name;
    this.play_type = obj.play_type;
    this.slogon = obj.slogon;
    this.bet_type = obj.bet_type;
    this.bet_number = obj.bet_number;
    this.component = Lottery.getComponent(this.lottery_id);
    this.betNum = this.handleBalls();
  }
  handleBalls () {
    const block = '#';
    const sep = ',';
    let result = [this.bet_number];
    if (this.bet_number.indexOf(block) !== -1) {
      result = this.bet_number.split(block);
    }
    if (Lottery.isSYXW(this.lottery_id)) {
      result = [result.join(',')];
    }
    return result.map(value => {
      return value.split(sep);
    })
  }
  getIssue () {
    const block = '#';
    const sep = ',';
    let result, ballSelected;
    if (this.bet_number.indexOf(block) !== -1) {
      result = this.bet_number.split(block);
      ballSelected = result.map(value => value.split(sep));
    } else {
      ballSelected = this.bet_number.split(sep);
    }
    if (Lottery.isSYXW(this.lottery_id)) {
      let playType = {id: parseInt(this.play_type), value: PlayType[this.play_type]};
      return {playType: playType, ballSelected: ballSelected};
    } else {
      return {ballSelected: ballSelected, playType: {id: 1, value: '普通投注'}};
    }
  }
}
