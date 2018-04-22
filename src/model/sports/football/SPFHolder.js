import SportsHolder from '../SportsHolder';
import {NO_CONCEDE, BettingScoreOdds} from '../BettingScoreOdds';

export default class SPFHolder extends SportsHolder {
  constructor (obj) {
    super(obj);
    this.noConcede = obj['betting_score_odds'][NO_CONCEDE];
    this.setHolderList();
    this.selected = [];
  }
  setHolderList () {
    this.holderList = [];
    const lotteryKey = BettingScoreOdds.getType(NO_CONCEDE);
    for (let key in this.noConcede) {
      if (this.noConcede.hasOwnProperty(key) && lotteryKey.hasOwnProperty(key)) {
        this.holderList.push({
          key: key, value: this.noConcede[key], text: lotteryKey[key]
        })
      }
    }
    this.holderList.reverse();
  }
}
