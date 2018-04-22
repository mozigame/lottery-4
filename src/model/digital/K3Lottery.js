import DigitalLottery from './DigitalLottery';

export default class K3Lottery extends DigitalLottery {
  constructor (obj) {
    super(obj);
    this.lotteryType = 'k3';
  }
  setTicketPrizeColor () {
    let hz = 0;
    this.prizeResult[0].map(v => { hz += parseInt(v); });
    let th = false;
    let lh = false;
    let prize = this.prizeResult[0].map(v => parseInt(v));
    if (prize[0] === prize[1] && prize[1] === prize[2]) {
      th = true;
    }
    if (prize[0] + 1 === prize[1] && prize[1] + 1 === prize[2]) {
      lh = true;
    }

    this.result.map((value, index) => {
      this.result[index].next && this.result[index].next.map((v, i) => {
        if (this.play_type === '45' || this.play_type === '46' || this.play_type === '48') {
          if (this.prizeResult[index].indexOf(v.text) !== -1) {
            this.result[index].next[i].checked = true;
          }
        } else if (this.play_type === '41') {
          if (parseInt(this.result[index].next[i].text) === hz) {
            this.result[index].next[i].checked = true;
          }
        } else if (this.play_type === '42' && th) {
          if (this.prizeResult[index].indexOf(v.text) !== -1) {
            this.result[index].next[i].checked = true;
          }
        } else if (this.play_type === '44' && lh) {
          this.result[index].next[i].checked = true;
        } else if (this.play_type === '43' && th) {
          this.result[index].next[i].checked = true;
        }
      })
    })
  }
}
