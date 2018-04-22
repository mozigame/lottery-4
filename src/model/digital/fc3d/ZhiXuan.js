import FC3DPlayType from '../FC3DPlayType';
import Random from '../../common/Random';

export default class ZhiXuan extends FC3DPlayType {
  constructor (lotteryId, playType) {
    super(lotteryId, playType);
    this.showShake = true;
    this.ballSelected = [[], [], []];
    this.bonus = 1040;
  }
  getTopTip () {
    return '每位至少选1个号, 猜对即中1040元';
  }
  getBottomTip () {
    return '';
  }
  initBettingPanelBallGroups () {
    const groups = [{
      name: '百位', list: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    }, {
      name: '十位', list: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    }, {
      name: '个位', list: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
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
        selected[index].push(ball.id);
      }
    }
    const hundred = selected[0].length;
    const ten = selected[1].length;
    const individual = selected[2].length;
    this.stakeCount = hundred * ten * individual;
    if (this.stakeCount > 0) this.bonusTips = this.getFormattedBonusTips(this.bonus, this.bonus, this.stakeCount * this.TicketPrice);
    else this.bonusTips = '';
  }
  getAutoBall () {
    let results = [[], [], []];
    this.ballSelected = results.map(() => {
      return [String(Random.getInt(0, 9))];
    })
  }
  getTicket () {
    let ticket = this.getBaseTicket();
    ticket.betNumber = this.ballSelected.map(v => {
      return v.join(',');
    }).join('#');
    return ticket;
  }
  clearSelected () {
    this.ballSelected = [[], [], []];
  }
}
