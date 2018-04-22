import SportsHolder from '../SportsHolder';
import {SFC, BettingScoreOdds} from '../BettingScoreOdds';

export default class SFCHolder extends SportsHolder {
  constructor (obj) {
    super(obj);
    this.sfc = obj['betting_score_odds'][SFC];
    this.setHolderList();
    this.selected = [];
  }
  setHolderList () {
    this.holderList = [];
    const lotteryKey = BettingScoreOdds.getType(SFC);
    for (let key in this.sfc) {
      if (this.sfc.hasOwnProperty(key) && lotteryKey.hasOwnProperty(key)) {
        this.holderList.push({
          key: key, value: this.sfc[key], text: lotteryKey[key]
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
