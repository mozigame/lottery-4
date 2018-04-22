import SportsHolder from '../SportsHolder';
import {HALF, BettingScoreOdds} from '../BettingScoreOdds';

export default class BFHolder extends SportsHolder {
  constructor (obj) {
    super(obj);
    this.half = obj['betting_score_odds'][HALF];
    this.selected = [];
    this.setHolderList();
  }
  setHolderList () {
    this.holderList = [];
    const lotteryKey = BettingScoreOdds.getType(HALF);
    for (let key in this.half) {
      if (this.half.hasOwnProperty(key) && lotteryKey.hasOwnProperty(key)) {
        this.holderList.push({
          key: key, value: this.half[key], text: lotteryKey[key]
        })
      }
    }
    this.holderList.reverse();
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
