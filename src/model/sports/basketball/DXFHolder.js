import SportsHolder from '../SportsHolder';
import {DXF, BettingScoreOdds} from '../BettingScoreOdds';

export default class DXFHolder extends SportsHolder {
  constructor (obj) {
    super(obj);
    // this.dxf = obj['betting_score_odds'][DXF];
    this.dxf = {
      base_point: 200, v1: 1.68, v2: 1.80
    }
    this.basePoint = this.dxf.base_point;
    this.setHolderList();
    this.selected = [];
  }
  setHolderList () {
    this.holderList = [];
    const lotteryKey = BettingScoreOdds.getType(DXF);
    for (let key in this.dxf) {
      if (this.dxf.hasOwnProperty(key) && lotteryKey.hasOwnProperty(key)) {
        this.holderList.push({
          key: key, value: this.dxf[key], text: lotteryKey[key]
        })
      }
    }
  }
}
