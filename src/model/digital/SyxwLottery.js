import DigitalLottery from './DigitalLottery';
/**
 * 十一选五
 */
export default class SyxwLottery extends DigitalLottery {
  constructor (obj) {
    super(obj);
    this.lotteryType = 'syxw';
  }
  setTicketPrizeColor () {
    // @增加十一选五的选择状态
    // this.prizeResult, this.result
    const rxx = ['21', '22', '23', '24', '25', '26', '27', '28']; // 任选
    const type = String(this.play_type);
    if (rxx.indexOf(type) !== -1) {
      this.result.map((value, index) => {
        value.pre && value.pre.map((v, i) => {
          if (this.prizeResult[0].indexOf(v.text) !== -1) {
            this.result[index].pre[i].checked = true;
          }
        });
        value.next && value.next.map((v, i) => {
          if (this.prizeResult[0].indexOf(v.text) !== -1) {
            this.result[index].next[i].checked = true;
          }
        })
      })
    }
  }
}
