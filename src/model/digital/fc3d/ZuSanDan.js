import FC3DPlayType from '../FC3DPlayType';
import Random from '../../common/Random';

export default class ZuSanDan extends FC3DPlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.showShake = true;
    this.ballSelected = [[], []];
    this.bonus = 346;
  }
  getTopTip () {
    return '选1个重号和单号, 猜对即中346元';
  }
  getBottomTip () {
    return '';
  }
  initBettingPanelBallGroups () {
    const groups = [{
      name: '重号', list: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    }, {
      name: '单号', list: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    }];
    return groups.map((value, index) => {
      value.list = value.list.map(v => {
        return {id: v, selected: this.ballSelected[index].indexOf(v) !== -1};
      });
      return value;
    })
  }
  onBallChanged (ball, index) {
    const selected = this.ballSelected;
    if (ball) {
      if (ball.selected) {
        selected[index].splice(selected[index].indexOf(ball.id), 1);
      } else {
        if (selected[0].indexOf(ball.id) === -1 && selected[1].indexOf(ball.id) === -1) {
          if (selected[index].length > 0) selected[index].splice(0, 1);
          selected[index].push(ball.id);
        } else {
          if (selected[index].length > 0) selected[index].splice(0, 1);
          selected[index].push(ball.id);
          const other = index === 0 ? 1 : 0;
          selected[other].splice(selected[other].indexOf(ball.id), 1);
        }
      }
    }
    const one = selected[0].length;
    const two = selected[1].length;
    if (one > 0 && two > 0) {
      this.stakeCount = 1;
      this.bonusTips = this.getFormattedBonusTips(this.bonus, this.bonus, this.stakeCount * this.TicketPrice);
    } else {
      this.stakeCount = 0;
      this.bonusTips = '';
    }
  }
  getAutoBall () {
    const arr = Random.indexs(2, 0, 9).map(v => String(v));
    this.ballSelected = [[arr[0]], [arr[1]]];
  }
  getTicket () {
    let ticket = this.getBaseTicket();
    ticket.playType = 12;
    ticket.betNumber = [this.ballSelected[0], this.ballSelected[0], this.ballSelected[1]].join(',');
    return ticket;
  }
  clearSelected () {
    this.ballSelected = [[], []];
  }
}
