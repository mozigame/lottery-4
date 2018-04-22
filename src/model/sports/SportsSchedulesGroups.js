import SportsShedules from './SportsSchedules';

export default class SportsSchedulesGroups {
  constructor (obj, lotteryId) {
    this.id = obj.id;
    this.name = obj.name;
    this.schedules = obj.list.map(value => {
      value.lottery_id = lotteryId;
      return new SportsShedules(value);
    });
  }
}
