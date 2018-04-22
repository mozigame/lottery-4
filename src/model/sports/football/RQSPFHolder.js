import SportsHolder from '../SportsHolder';
import {CONCEDE, BettingScoreOdds} from '../BettingScoreOdds';

export default class RQSPFHolder extends SportsHolder {
  constructor (obj) {
    super(obj);
    this.concede = obj['betting_score_odds'][CONCEDE];
    this.letPoints = this.concede.let_point;
    this.letPointsColor = this.letPoints < 0 ? 'green' : 'yellow';
    this.letPointsText = this.letPoints < 0 ? this.letPoints : '+' + this.letPoints;
    this.selected = [];
    this.setHolderList();
  }
  setHolderList () {
    this.holderList = [];
    const lotteryKey = BettingScoreOdds.getType(CONCEDE);
    for (let key in this.concede) {
      if (this.concede.hasOwnProperty(key) && lotteryKey.hasOwnProperty(key)) {
        this.holderList.push({
          key: key, value: this.concede[key], text: lotteryKey[key]
        })
      }
    }
    this.holderList.reverse();
  }
}
