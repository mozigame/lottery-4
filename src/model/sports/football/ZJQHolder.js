import SportsHolder from '../SportsHolder';
import {BALLS, BettingScoreOdds} from '../BettingScoreOdds';

export default class ZJQHolder extends SportsHolder {
  constructor (obj) {
    super(obj);
    this.balls = obj['betting_score_odds'][BALLS];
    this.selected = [];
    this.setHolderList();
  }
  setHolderList () {
    this.holderList = [];
    const ballsMap = BettingScoreOdds.getType(BALLS);
    for (let key in this.balls) {
      if (this.balls.hasOwnProperty(key) && ballsMap.hasOwnProperty(key)) {
        this.holderList.push({
          key: key, value: this.balls[key], text: ballsMap[key]
        })
      }
    }
  }
  onOptionSelected (selected) {
    if (Array.isArray(selected)) {
      this.selected = [...selected];
    } else {
      const index = this.selected.indexOf(selected);
      index !== -1 ? this.selected.splice(index, 1) : this.selected.push(selected);
    }
    this.setIsChecked();
  }
}
