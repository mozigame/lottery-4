export default class SportsPrize {
  constructor (obj) {
    this.guest = obj.guest;
    this.home = obj.home;
    this.prize_time = obj.prize_time;
    this.let_point = parseFloat(obj.let_point);
    this.letPointText = this.let_point > 0 ? '+' + this.let_point : this.let_point;
    this.letPointColor = this.let_point > 0 ? 'yellow' : 'green';
    this.round_no = obj.round_no;
    this.prize_num = obj.prize_num;
    this.league = obj.league;
    this.score = obj.score;
    this.setFinalScore();
  }
  setFinalScore () {
    this.finalScore = this.score.final.split(':').map(v => parseInt(v));
  }
}
