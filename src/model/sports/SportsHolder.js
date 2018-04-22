import Util from '../../common/util';
export default class SportsHolder {
  constructor (obj) {
    this.lotteryId = obj.lotteryId;
    this.lotteryType = obj.lotteryType;
    this.id = obj.id;
    this.home = obj.home;
    this.guest = obj.guest;
    this.league = obj.league;
    this.round_no = obj.round_no;
    this.third_party_schedule_id = obj.third_party_schedule_id;
    this.history_fight = obj.history_fight;
    this.latest_record = obj.latest_record;
    this.betting_win_percent = obj.betting_win_percent;
    this.betting_equal_percent = obj.betting_equal_percent;
    this.average_equal_odds = obj.average_equal_odds;
    this.average_win_odds = obj.average_win_odds;
    this.average_lose_odds = obj.average_lose_odds;
    this.detail_url = obj.detail_url;
    this.home_rank = obj.home_rank;
    this.guest_rank = obj.guest_rank;
    this.end_time = obj.end_time;
    this.mode = obj.mode;
    this.isSure = false;
    this.match_round_id = Util.timeFmt(new Date(obj.name).getTime() / 1000, 'yyyyMMdd') + '-' + obj.round_no;
  }
  setHolderList () {
    console.log('holder list');
  }
  onOptionSelected (item) {
    const index = this.selected.indexOf(item);
    index !== -1 ? this.selected.splice(index, 1) : this.selected.push(item);
    this.setIsChecked();
  }
  setIsChecked () {
    this.checked = this.selected.length > 0;
  }
  clearSelected () {
    this.checked = false;
    if (this.holderList && this.holderList.length > 0) {
      this.holderList = this.holderList.map(value => {
        value.selected = false;
        return value;
      });
      this.selected = [];
    }
  }
  getBetNumber () {
    let bets = [];
    this.selected.map(value => {
      bets.push(value.key.substr(1));
    });
    return '{0}:{1}'.format(this.lotteryId, bets.join(','));
  }
}
