import BasketBallLottery from './BasketBallLottery';
import FootBallLottery from './FootBallLottery';
import SfcLottery from './SfcLottery';

function selectClassByLotteryId (lotteryId) {
  let Obj;
  switch (String(lotteryId)) {
    case '601':
    case '602':
    case '603':
    case '604':
    case '605':
    case '606':
      Obj = FootBallLottery;
      break;
    case '701':
    case '702':
    case '703':
    case '704':
    case '705':
      Obj = BasketBallLottery;
      break;
    case '21':
    case '20':
      Obj = SfcLottery;
      break;
  }
  return Obj;
}

export default class SportsLotteryJcInfo {
  constructor (jc, lotteryId) {
    let Obj = selectClassByLotteryId(lotteryId);
    let jcObj = new Obj(jc);
    jcObj.analyseBettingOrder();
    jcObj.analyseBettingResult();
    jcObj.setBettingChecked();
    return jcObj;
  }
}
