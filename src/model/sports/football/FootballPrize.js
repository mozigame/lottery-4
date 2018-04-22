import SportsPrize from '../SportsPrize';

export default class FootballPrize extends SportsPrize {
  constructor (obj) {
    super(obj);
    this.setHalfScore();
    this.isFootball = true;
    this.spf = this.setSpf();
    this.rqspf = this.setRqspf();
    this.zjq = this.finalScore[0] + this.finalScore[1];
    this.bqc = this.setBqc() + this.spf.text;
  }
  setHalfScore () {
    this.halfScore = this.score.half.split(':').map(v => parseInt(v));
  }
  setSpf (letPoint) {
    let homeScore = this.finalScore[0];
    let guestScore = this.finalScore[1];
    if (letPoint) {
      homeScore += letPoint;
    }
    let text = homeScore > guestScore ? '胜' : homeScore < guestScore ? '负' : '平';
    let color = homeScore > guestScore ? 'yellow' : homeScore < guestScore ? 'green' : 'blue';
    return {text: text, color: color};
  }
  setRqspf () {
    return this.setSpf(this.let_point);
  }
  setBqc () {
    let homeScore = this.halfScore[0];
    let guestScore = this.halfScore[2];
    return homeScore > guestScore ? '胜' : homeScore < guestScore ? '负' : '平';
  }
}
