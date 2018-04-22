import { PlayType } from '../../store/constants';
/**
 *  双色球和大乐透, 直接当作基类
 */
export default class DigitalLottery {
  constructor (obj) {
    this.bet_number = obj.bet_number;
    this.play_type = obj.play_type;
    this.multiple = obj.multiple;
    this.printout_time = obj.printout_time;
    this.series = obj.series;
    this.ticket_amount = obj.ticket_amount;
    this.ticket_winnings = obj.ticket_winnings;
    this.ticket_status = obj.ticket_status;
    this.ticket_winnings_status = obj.ticket_winnings_status;
    this.setPlayTypeText();
  }
  analyseBettingResult () {
    let betNumber = this.bet_number || '';
    let result = {};
    let results = [];
    let hasBlock = betNumber.indexOf('#') !== -1;
    result.block = hasBlock ? betNumber.split('#') : [betNumber];
    result.block.map(value => {
      let hasFixed = value.indexOf('@') !== -1;
      let obj = {};
      if (hasFixed) {
        let temp = value.split('@');
        obj.pre = temp[0].split(',').map(v => {
          return { text: v };
        });
        obj.next = temp[1].split(',').map(v => {
          return { text: v };
        });
      } else {
        obj.next = value.split(',').map(v => {
          return { text: v };
        });
      }
      results.push(obj);
    });
    this.result = results;
  }
  setPlayTypeText () {
    this.playTypeText = PlayType[this.play_type];
  }
  analysePrizeNum (prize) {
    if (prize) {
      let hasBlock = prize.indexOf('#') !== -1;
      let result = {};
      let results = [];
      result.block = hasBlock ? prize.split('#') : [prize];
      result.block.map(value => {
        let obj;
        obj = value.split(',');
        results.push(obj);
      });
      this.prizeResult = results;
    }
  }
  setTicketPrizeColor () {
    this.result.map((value, index) => {
      this.result[index].pre && this.result[index].pre.map((v, i) => {
        if (this.prizeResult[index].indexOf(v.text) !== -1) {
          this.result[index].pre[i].checked = true;
        }
      })
      this.result[index].next && this.result[index].next.map((v, i) => {
        if (this.prizeResult[index].indexOf(v.text) !== -1) {
          this.result[index].next[i].checked = true;
        }
      })
    })
  }
}
