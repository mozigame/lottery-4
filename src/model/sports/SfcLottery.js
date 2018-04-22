import SportsLottery from './SportsLottery';

export default class SfcLottery extends SportsLottery {
  constructor (obj) {
    super(obj);
    this.homeFirst = true;
    this.round_no = `第${obj.round_no}场`;
  }
  analyseBettingOrder () {
    const comma = ',';
    const verticalLine = '|';
    let bettingArr;
    let betNum = this.betting_order['betting_num'];
    if (betNum.indexOf(comma) !== -1) {   // 判断betting_num
      bettingArr = betNum.split(comma).map(value => {
        return { text: value };
      })
    } else if (betNum.indexOf(verticalLine) !== -1) {
      bettingArr = betNum.split(verticalLine).map(value => {
        return { text: value };
      })
    } else {
      bettingArr = [{ text: betNum }];
    }
    this.betting = bettingArr;
  }
  analyseBettingResult () {
    let finalArr = this.finalArr;
    if (finalArr) {
      this.result = [];
      this.result[0] = {
        text: finalArr[0] > finalArr[1] ? 3
          : finalArr[0] === finalArr[1] ? 1 : 0
      }
    }
  }
}
