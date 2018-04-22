import SportsHolder from '../SportsHolder';
import {SCORES, BettingScoreOdds} from '../BettingScoreOdds';

export default class BFHolder extends SportsHolder {
  constructor (obj) {
    super(obj);
    this.scores = obj['betting_score_odds'][SCORES];
    this.selected = [];
    this.setHolderList();
  }
  setHolderList () {
    const scoresMap = BettingScoreOdds.getType(SCORES);
    this.holderList = scoresMap.map(value => {
      let temp = [];
      for (let key in value) {
        if (value.hasOwnProperty(key) && this.scores.hasOwnProperty(key)) {
          temp.push({
            key: key, value: this.scores[key], text: value[key]
          });
        }
      }
      return temp;
    });
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
  clearSelected () {
    this.checked = false;
    if (this.holderList && this.holderList.length > 0) {
      this.holderList = this.holderList.map(value => {
        return value.map(v => {
          v.selected = false;
          return v;
        })
      })
      this.selected = [];
    }
  }
}
