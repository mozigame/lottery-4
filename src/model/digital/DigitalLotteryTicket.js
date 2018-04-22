import DigitalLottery from './DigitalLottery';
import SyxwLottery from './SyxwLottery';
import Fc3dLottery from './Fc3dLottery';
import K3Lottery from './K3Lottery';

function selectClassByLotteryId (lotteryId) {
  let Obj;
  switch (String(lotteryId)) {
    case '1':
    case '3':
      Obj = DigitalLottery;
      break;
    case '2':
      Obj = Fc3dLottery;
      break;
    case '5':
    case '19':
      Obj = K3Lottery;
      break;
    case '8':
    case '9':
    case '10':
    case '11':
    case '12':
    case '13':
    case '14':
    case '15':
    case '16':
    case '17':
    case '18':
    case '4':
      Obj = SyxwLottery;
      break;
    default:
      Obj = DigitalLottery;
  }
  return Obj;
}

export default class DigitalLotteryTicket {
  constructor (ticket, lotteryId, prizeNum) {
    let Obj = selectClassByLotteryId(lotteryId);
    let ticketObj = new Obj(ticket);
    ticketObj.analyseBettingResult();
    prizeNum && ticketObj.analysePrizeNum(prizeNum);
    ticketObj.prizeResult && ticketObj.setTicketPrizeColor();
    return ticketObj;
  }
}
