import FC3DPlayType from '../FC3DPlayType';
import Random from '../../common/Random';

export default class ZuSanFu extends FC3DPlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.showShake = true;
    this.bonus = 346;
  }
  getTopTip () {
    return '至少选2个号，猜对即中346元';
  }
  getBottomTip () {
    return '';
  }
  initBettingPanelBallGroups () {
    const groups = [{
      name: '选号', list: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    }];
    return groups.map((value) => {
      value.list = value.list.map(v => {
        return {id: v, selected: this.ballSelected.indexOf(v) !== -1};
      });
      return value;
    })
  }
  onBallChanged (ball) {
    const selected = this.ballSelected;
    if (ball) {
      if (ball.selected) {
        selected.splice(selected.indexOf(ball.id), 1);
      } else {
        selected.push(ball.id);
      }
    }
    const lg = selected.length;
    if (lg >= 2) {
      this.stakeCount = this.combination(selected.length, 2) * 2;
      this.bonusTips = this.getFormattedBonusTips(this.bonus, this.bonus, this.stakeCount * this.TicketPrice);
    } else {
      this.stakeCount = 0;
      this.bonusTips = '';
    }
  }
  getAutoBall () {
    this.ballSelected = Random.indexs(2, 0, 9).map(v => String(v));
  }
  getTicket () {
    let ticket = this.getBaseTicket();
    ticket.playType = 12;
    ticket.betNumber = this.ballSelected.join(',');
    return ticket;
  }
  clearSelected () {
    this.ballSelected = [];
  }
}
