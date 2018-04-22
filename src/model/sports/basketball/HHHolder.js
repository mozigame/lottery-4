import SportsHolder from '../SportsHolder';
import {NO_CONCEDE, CONCEDE, DXF, SFC, BettingScoreOdds} from '../BettingScoreOdds';

export default class HHHolder extends SportsHolder {
  constructor (obj) {
    super(obj);
    this.dxf = obj['betting_score_odds'][DXF];
    this.noConcede = obj['betting_score_odds'][NO_CONCEDE];
    this.sfc = obj['betting_score_odds'][SFC];
    this.concede = obj['betting_score_odds'][CONCEDE];
    this.selected = [[], [], [], []];
    this.setHolderList();
  }
  setHolderList () {
    this.holderList = [[], [], [], []];
    // 胜负
    if (this.noConcede) {
      this.holderList[0].push({ key: 'v0', value: this.noConcede['v0'], text: '客胜' });
      this.holderList[0].push({ key: 'v3', value: this.noConcede['v3'], text: '主胜' });
    }
    // 让分胜负
    if (this.concede) {
      this.letPoints = this.concede.let_point;
      this.letPointsColor = this.letPoints < 0 ? 'green' : 'yellow';
      this.letPointsText = this.letPoints < 0 ? this.letPoints : '+' + this.letPoints;
      this.holderList[1].push({ key: 'v0', value: this.concede['v0'], text: '客胜' });
      this.holderList[1].push({ key: 'v3', value: this.concede['v3'], text: '主胜' });
    }
    // 胜分差
    if (this.sfc) {
      const SFCKey = BettingScoreOdds.getType(SFC);
      for (let key in this.sfc) {
        if (this.sfc.hasOwnProperty(key) && SFCKey.hasOwnProperty(key)) {
          this.holderList[2].push({ key: key, value: this.sfc[key], text: SFCKey[key] })
        }
      }
    }
    // 大小分
    if (this.dxf) {
      this.basePoint = this.dxf.base_point;
      this.holderList[3].push({ key: 'v1', value: this.dxf['v1'], text: '大于{0}'.format(this.basePoint) });
      this.holderList[3].push({ key: 'v2', value: this.dxf['v2'], text: '小于{0}'.format(this.basePoint) });
    }
  }
  onOptionSelected (selected, current) {
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
      this.selected = [[], [], [], []];
    }
  }
  getBetNumber () {
    let betAll = [];
    this.selected.map((value, key) => {
      if (value.length > 0) {
        let lottery = '70{0}'.format(key + 1);
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
