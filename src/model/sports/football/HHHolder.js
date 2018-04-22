import SportsHolder from '../SportsHolder';
import {HALF, NO_CONCEDE, CONCEDE, BALLS, SCORES, BettingScoreOdds} from '../BettingScoreOdds';

export default class HHHolder extends SportsHolder {
  constructor (obj) {
    super(obj);
    this.half = obj['betting_score_odds'][HALF];
    this.noConcede = obj['betting_score_odds'][NO_CONCEDE];
    this.balls = obj['betting_score_odds'][BALLS];
    this.concede = obj['betting_score_odds'][CONCEDE];
    this.scores = obj['betting_score_odds'][SCORES];
    this.selected = [[], [], [], [], []];
    this.letPoints = this.concede.let_point;
    this.letPointsColor = this.letPoints < 0 ? 'green' : 'yellow';
    this.letPointsText = this.letPoints < 0 ? this.letPoints : '+' + this.letPoints;
    this.setHolderList();
  }
  setHolderList () {
    this.holderList = [[], [], [], [], []];
    const noConcedeMap = BettingScoreOdds.getType(NO_CONCEDE);
    const concedeMap = BettingScoreOdds.getType(CONCEDE);
    const scoresMap = BettingScoreOdds.getType(SCORES);
    const ballsMap = BettingScoreOdds.getType(BALLS);
    const halfMap = BettingScoreOdds.getType(HALF);
    // 胜平负
    for (let key in this.noConcede) {
      if (this.noConcede.hasOwnProperty(key) && noConcedeMap.hasOwnProperty(key)) {
        this.holderList[0].push({ key: key, value: this.noConcede[key], text: noConcedeMap[key].replace('主', '') })
      }
    }
    this.holderList[0].reverse();
    // 让球胜平负
    for (let key in this.concede) {
      if (this.concede.hasOwnProperty(key) && concedeMap.hasOwnProperty(key)) {
        this.holderList[1].push({ key: key, value: this.concede[key], text: concedeMap[key].replace('主', '') })
      }
    }
    this.holderList[1].reverse();
    // 比分
    scoresMap.map(value => {
      for (let key in value) {
        if (value.hasOwnProperty(key) && this.scores.hasOwnProperty(key)) {
          this.holderList[2].push({key: key, value: this.scores[key], text: value[key]});
        }
      }
    });
    // 总进球
    for (let key in this.balls) {
      if (this.balls.hasOwnProperty(key) && ballsMap.hasOwnProperty(key)) {
        this.holderList[3].push({ key: key, value: this.balls[key], text: ballsMap[key] })
      }
    }
    // 半全场
    for (let key in this.half) {
      if (this.half.hasOwnProperty(key) && halfMap.hasOwnProperty(key)) {
        this.holderList[4].push({ key: key, value: this.half[key], text: halfMap[key] })
      }
    }
    this.holderList[4].reverse();
  }
  onOptionSelected (selected, current) {
    // let total = 0;
    // this.holderList = this.holderList.map((value, key) => {
    //   if (key === index) {
    //     value.map(v => {
    //       if (v.key === item.key) {
    //         v.selected = !v.selected;
    //       }
    //       return v;
    //     })
    //     // 选中的
    //     if (item.selected) {
    //       this.selected[index].push(item);
    //     } else {
    //       this.selected[index].splice(this.selected[index].indexOf(item), 1);
    //     }
    //   }
    //   total += this.selected[key].length;
    //   return value;
    // });
    if (Array.isArray(selected)) {
      this.selected = selected.map(value => [...value]);
    } else {
      const index = this.selected[current].indexOf(selected);
      index !== -1 ? this.selected[current].splice(index, 1)
        : this.selected[current].push(selected);
    }
    this.setIsChecked();
  }
  setIsChecked () {
    let total = 0;
    this.selected.map(value => (total += value.length));
    // this.checked = total > (this.mode === 2 ? 1 : 0);
    this.checked = total > 0;
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
      this.selected = [[], [], [], [], []];
    }
  }
  getBetNumber () {
    let betAll = [];
    this.selected.map((value, key) => {
      if (value.length > 0) {
        let lottery = '60{0}'.format(key + 1);
        let bets = [];
        value.map(v => {
          bets.push(v.key.substr(1));
        })
        betAll.push('{0}:{1}'.format(lottery, bets.join(',')))
      }
    });
    return betAll.join('|')
  }
}
