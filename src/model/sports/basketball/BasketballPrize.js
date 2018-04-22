import SportsPrize from '../SportsPrize';

export default class BasketballPrize extends SportsPrize {
  constructor (obj) {
    super(obj);
    this.finalScore.reverse();
    this.finalScoreText = this.finalScore.join(':');
    this.isBasketball = true;
    this.base_point = obj.base_point;
    this.setSf();
    this.setSfc();
    this.setBasePoint();
  }
  setSf () {
    let text = this.finalScore[0] > this.finalScore[1] ? '主负' : '主胜';
    let color = this.finalScore[0] > this.finalScore[1] ? 'green' : 'yellow';
    this.sf = {
      text: text, color: color
    }
  }
  setSfc () {
    let scores = ['1-5', '6-10', '11-15', '16-20', '21-25', '26+'];
    let guestScore = this.finalScore[0];
    let homeScore = this.finalScore[1];
    let gap = guestScore - homeScore;
    if (gap > 0) {
      let i = Math.floor((gap - 1) / 5);
      this.sfc = '客胜{0}'.format(scores[i > 5 ? 5 : i]);
    } else {
      let i = Math.floor((-gap - 1) / 5);
      this.sfc = '主胜{0}'.format(scores[i > 5 ? 5 : i]);
    }
  }
  setBasePoint () {
    this.basePointText = (this.finalScore[0] + this.finalScore[1]) > this.base_point
      ? '大分' : '小分';
  }
}
