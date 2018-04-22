import {LOTTERYIDS} from '../../store/constants';

export default class SfcCalculator {
  static calBetCount (sportOrder, lottery) {
    if (sportOrder.length === 0) {
      return 0;
    }
    if (LOTTERYIDS.SFC === parseInt(lottery)) {
      return SfcCalculator.cal14SFBetCount(sportOrder)
    } else if (LOTTERYIDS.RXJ === parseInt(lottery)) {
      return SfcCalculator.calR9BetCount(sportOrder);
    }
  }
  static cal14SFBetCount (sportOrder) {
    let count = 1;
    sportOrder.map(betting => {
      count *= betting.selected.length;
    });
    return count;
  }
  static calR9BetCount (sportOrder) {
    let sure = [];
    let norm = [];
    let sureBet = 1;
    let betNum = 1;
    sportOrder.map(betting => {
      betNum = betting.selected.length;
      if (betting.isSure) {
        sure.push(betNum);
        sureBet *= betNum;
      } else {
        norm.push(betNum);
      }
    });
    let subSize = 9 - sure.length;
    let normSize = norm.length;
    let combine = new Array(subSize);
    let count = SfcCalculator.combineCount(norm, normSize, subSize, combine, subSize);
    return sureBet * count;
  }
  static combineCount (arrayList, n, m, combine, M) {
    let count = 0;
    for (let i = n; i >= m; i--) {
      combine[m - 1] = i - 1;
      if (m > 1) {
        count += SfcCalculator.combineCount(arrayList, i - 1, m - 1, combine, M);
      } else {
        let cc = 1;
        for (let j = M - 1; j >= 0; j--) {
          cc *= arrayList[combine[j]];
        }
        count += cc;
      }
    }
    return count;
  }
  static bettingType (orders) {
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].selected.length > 1) {
        return 2;
      }
    }
    return 1;
  }
}

