// import {LotteryFootballKey, LotteryBasketballKey} from '../../store/constants';
//
// class SportsBettingBase {
//   setBettingOption () {
//
//   }
// }
//
// class FootballSFCBetting {
//   constructor (obj) {
//     this.v0 = obj.v0;
//     this.v1 = obj.v1;
//     this.v3 = obj.v3;
//   }
// }

export default class SportsSchedules {
  constructor (obj) {
    this.id = obj.id;
    this.match_id = obj.match_id;
    this.home = obj.home;
    this.guest = obj.guest;
    this.league = obj.league;
    this.betting_date = obj.betting_date;
    this.end_time = obj.end_time;
    this.round_no = obj.round_no;
    this.history_fight = obj.history_fight;
    this.latest_record = obj.latest_record;
    this.average_equal_odds = obj.average_equal_odds;
    this.average_win_odds = obj.average_win_odds;
    this.average_lose_odds = obj.average_lose_odds;
    this.betting_score_odds = obj.betting_score_odds;
  }
}
