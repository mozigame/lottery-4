import * as types from './types';
import Http from '../Http';
import loading from '../../common/loading';
import Lottery from '../../model/common/Lottery';
import Util from '../../common/util';
import FootballPrize from '../../model/sports/football/FootballPrize';
import BasketballPrize from '../../model/sports/basketball/BasketballPrize';

const state = {
  list: [],
  detail: {
    lottery: 0,
    loading: false,
    offset: 0,
    limit: 15,
    list: []
  },
  sportsDetail: {
    lottery: 0,
    begin: 0,
    end: 0,
    list: []
  }
};
const actions = {
  [types.GET_PRIZE_LIST] (context) {
    if (state.list.length === 0) {
      loading.show();
      Http.get('/Lottery/getPrizeIssueInfo').then(data => {
        context.commit(types.GET_PRIZE_LIST, data);
        loading.hide();
      });
    }
  },
  [types.GET_PRIZE_DETAIL_LIST] (context, lottery) {
    loading.show();
    context.commit(types.PRIZE_DETAIL_LIST_RESET, lottery);
    Http.get('/Lottery/getPrizeIssueInfo', {
      lottery_id: state.detail.lottery, offset: state.detail.offset, limit: state.detail.limit
    }).then(data => {
      context.commit(types.GET_PRIZE_DETAIL_LIST, data);
      loading.hide();
    })
  },
  [types.PRIZE_DETAIL_LIST_MORE] (context) {
    context.commit(types.PRIZE_DETAIL_LIST_MORE);
    Http.get('/Lottery/getPrizeIssueInfo', {
      lottery_id: state.detail.lottery, offset: state.detail.offset, limit: state.detail.limit
    }).then(data => {
      context.commit(types.GET_PRIZE_DETAIL_LIST, data);
    })
  },
  [types.GET_PRIZE_SPORTS_DETAIL] (context, lottery) {
    loading.show();
    Http.get('/Lottery/getPrizeIssueInfo', {
      lottery_id: lottery, begin: state.sportsDetail.begin, end: state.sportsDetail.end
    }).then(data => {
      data.lottery = lottery;
      context.commit(types.GET_PRIZE_SPORTS_DETAIL, data);
      loading.hide();
    })
  }
}
const mutations = {
  [types.GET_PRIZE_LIST] (state, data) {
    state.list = data.list.map(value => {
      if (value.prize_num) {
        value.balls = Lottery.getPrizeBalls(value.prize_num)
        if (parseInt(value.lottery_id) === 2) {
          value.balls = [value.prize_num.split('#')];
        } else value.balls = Lottery.getPrizeBalls(value.prize_num);
      }
      value.week = Util.getWeekDay(value.prize_time);
      return value;
    });
  },
  [types.GET_PRIZE_DETAIL_LIST] (state, data) {
    state.detail.loading = false;
    state.detail.list = state.detail.list.concat(data.list.map(value => {
      if (parseInt(value.lottery_id) === 2) {
        value.balls = [value.prize_num.split('#')];
      } else value.prize_num && (value.balls = Lottery.getPrizeBalls(value.prize_num));
      value.week = Util.getWeekDay(value.prize_time);
      if (value.lottery_id !== 20) {
        value.issue_winnings_schema && (value.winnings = JSON.parse(value.issue_winnings_schema));
      }
      return value;
    }))
  },
  [types.PRIZE_DETAIL_LIST_RESET] (state, lottery) {
    state.detail.loading = false;
    state.detail.lottery = lottery;
    state.detail.offset = 0;
    state.detail.list = [];
  },
  [types.PRIZE_DETAIL_LIST_MORE] (state) {
    state.detail.offset = state.detail.offset + state.detail.limit;
    state.detail.loading = true;
  },
  [types.GET_PRIZE_SPORTS_DETAIL] (state, data) {
    state.sportsDetail.status = data.result.status;
    console.log(state.sportsDetail.status);
    state.sportsDetail.list = data.result.groups.map(value => {
      value.schedules = value.schedules.map(v => {
        if (Lottery.isFootBall(data.lottery)) {
          return new FootballPrize(v);
        } else if (Lottery.isBasketBall(data.lottery)) {
          return new BasketballPrize(v);
        }
      })
      return value;
    });
  },
  [types.PRIZE_SPORT_DATE_SELECT] (state, date) {
    let oneDateMint = 86400;
    state.sportsDetail.begin = Util.timeFmt(date, 'yyyy-MM-dd');
    state.sportsDetail.end = Util.timeFmt(date + oneDateMint, 'yyyy-MM-dd');
  },
  [types.PRIZE_SPORT_RESET] (state) {
    let oneDateMint = 86400;
    let now = Date.now() / 1000;
    state.sportsDetail.begin = Util.timeFmt(now - oneDateMint, 'yyyy-MM-dd');
    state.sportsDetail.end = Util.timeFmt(now + oneDateMint, 'yyyy-MM-dd');
    state.sportsDetail.list = [];
  }
}

export default {
  state, mutations, actions
}
