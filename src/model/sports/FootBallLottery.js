import SportsLottery from './SportsLottery';
import { LotteryFootballKey } from '../../store/constants';

export default class FootBallLottery extends SportsLottery {
  constructor (obj) {
    super(obj);
    this.homeFirst = true;
    this.showCheck = true;
  }
  analyseBettingOrder () {
    this.analyseBettingOrderByLottery(LotteryFootballKey);
  }
  analyseBettingResult () {
    this.analyseBettingResultByLottery(LotteryFootballKey);
  }
}
