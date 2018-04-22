import SportsHolder from '../SportsHolder';
import {CONCEDE} from '../BettingScoreOdds';

export default class RFSFHolder extends SportsHolder {
  constructor (obj) {
    super(obj);
    this.concede = obj['betting_score_odds'][CONCEDE];
    this.letPoints = this.concede.let_point;
    this.letPointsColor = this.letPoints < 0 ? 'green' : 'yellow';
    this.letPointsText = this.letPoints < 0 ? this.letPoints : '+' + this.letPoints;
    this.setHolderList();
    this.selected = [];
  }
  setHolderList () {
    this.holderList = [];
    this.holderList.push({ key: 'v0', value: this.concede['v0'], text: '客胜' });
    this.holderList.push({ key: 'v3', value: this.concede['v3'], text: '主胜' });
  }
}
