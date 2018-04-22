import SportsHolder from '../SportsHolder';
import {NO_CONCEDE} from '../BettingScoreOdds';

export default class SFHolder extends SportsHolder {
  constructor (obj) {
    super(obj);
    this.noConcede = obj['betting_score_odds'][NO_CONCEDE];
    this.setHolderList();
    this.selected = [];
  }
  setHolderList () {
    this.holderList = [];
    this.holderList.push({ key: 'v0', value: this.noConcede['v0'], text: '客胜' });
    this.holderList.push({ key: 'v3', value: this.noConcede['v3'], text: '主胜' });
  }
}
