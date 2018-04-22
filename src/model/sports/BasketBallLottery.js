import SportsLottery from './SportsLottery';
import { LotteryBasketballKey } from '../../store/constants';

export default class BasketBallLottery extends SportsLottery {
  constructor (obj) {
    super(obj);
    this.homeFirst = false;
    this.showCheck = true;
    this.setScoreText();
  }
  setScoreText () {
    let finalArr = this.finalArr;
    if (finalArr) {
      let tempArr = [finalArr[1], finalArr[0]]
      this.scoreText = tempArr.join(':');
    }
  }
  analyseBettingOrder () {
    this.analyseBettingOrderByLottery(LotteryBasketballKey);
  }
  analyseBettingResult () {
    this.analyseBettingResultByLottery(LotteryBasketballKey);
  }
}
