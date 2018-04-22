
const BetType = {
  DS: 1, FS: 2, DT: 3, DWFS: 6
};

export default class DigitalPlayType {
  constructor (lotteryId, playType) {
    this.FORMATTER_BONUS_TIPS_PROFIT = '若中奖：奖金 <span class="text-primary">{0}</span>元，盈利 <span class="text-primary">{1}</span>元';
    this.FORMATTER_BONUS_TIPS_PROFIT_RANGE = '若中奖：奖金 <span class="text-primary">{0}~{1}</span>元，盈利 <span class="text-primary">{2}~{3}</span>元';
    this.FORMATTER_BONUS_TIPS_LOSS = '若中奖：奖金 <span class="text-primary">{0}</span>元，亏损 <span class="text-primary">{1}</span>元';
    this.FORMATTER_BONUS_TIPS_LOSS_RANGE = '若中奖：奖金 <span class="text-primary">{0}~{1}</span>元，亏损 <span class="text-primary">{2}~{3}</span>元';
    this.lotteryId = lotteryId;
    this.playType = playType;
    this.TicketPrice = 2;
    this.ballSelected = [];
  }

  // ***** syxw Type Tip ****
  getTopTip () {
    console.log('getTopTip');
  }
  getBottomTip () {
    console.log('getBottomTip');
  }

  // **** betting panel ****
  onBallChanged () {
    console.log('onBallChanged');
  }

  initBettingPanelBallGroups () {
    console.log('initBettingPanelBallGroups');
  }

  clearSelected () {
    this.ballSelected = [];
  }

  getTicket () {
    console.log('ticket');
  }
  getAutoBall () {
    console.log('auto - ball')
  }
  getAutoTicket () {
    this.getAutoBall();
    return this.getTicket();
  }
  setBallSelected (selected) {
    this.ballSelected = selected;
    this.onBallChanged();
  }

  getTicketBetType (isDT, stakeCount) {
    if (isDT) {
      return BetType.DT;
    } else if (stakeCount === 1) {
      return BetType.DS
    } else {
      return BetType.FS
    }
  }

  getBaseTicket () {
    let ticket = {};
    this.sortBallSelected();
    ticket.betType = this.getTicketBetType(false, this.stakeCount);
    ticket.playType = this.playType.id;
    ticket.playTypeText = this.playType.value;
    ticket.totalAmount = this.stakeCount * this.TicketPrice;
    ticket.stakeCount = this.stakeCount;
    return ticket;
  }
  sortBallSelected () {
    let selected = this.ballSelected;
    // 选中号码进行排序
    if (Object.prototype.toString.call(selected[0]) === '[object Array]') {
      this.ballSelected = selected.map(value => {
        return value.sort((a, b) => a - b);
      })
    } else {
      this.ballSelected.sort((a, b) => a - b)
    }
  }

  getFormattedBonusTips (minBonus, maxBonus, ticketAmount) {
    const minWinBonus = minBonus - ticketAmount;
    if (minBonus === maxBonus) {
      if (minWinBonus >= 0) {
        return this.FORMATTER_BONUS_TIPS_PROFIT.format(minBonus, minWinBonus);
      } else {
        return this.FORMATTER_BONUS_TIPS_LOSS.format(minBonus, -minWinBonus);
      }
    } else {
      const maxWinBonus = maxBonus - ticketAmount;
      if (minWinBonus < 0 && maxWinBonus < 0) {
        return this.FORMATTER_BONUS_TIPS_LOSS_RANGE.format(minBonus, maxBonus, -maxWinBonus, -minWinBonus);
      } else {
        return this.FORMATTER_BONUS_TIPS_PROFIT_RANGE.format(minBonus, maxBonus, minWinBonus, maxWinBonus);
      }
    }
  }

  // *** 基本算法 ***
  factorial (factor) {
    let result = 1;
    if (factor > 1) {
      result = factor * this.factorial(factor - 1);
    }
    return result;
  }
  arrangement (base, choice) {
    let result = 0;
    if (base >= choice) {
      result = this.factorial(base) / this.factorial(base - choice);
    }
    return result;
  }
  combination (base, choice) {
    let lightChoice = (base - choice) > choice ? choice : (base - choice);
    return this.arrangement(base, lightChoice) / this.factorial(lightChoice);
  }
  generateBalls (count) {
    let results = [];
    for (let i = 1; i <= count; i++) {
      results.push(i < 10 ? String('0' + i) : String(i));
    }
    return results;
  }
}
