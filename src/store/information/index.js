import * as types from './types';
import Http from '../Http';
import loading from '../../common/loading';

let state = {
  thirdId: 0,
  lottery: 0,
  detail: {},
  historyRecord: {},
  latestRecord: [{list: []}, {list: []}],
  futureRecord: [],
  odds: [], // 0亚盘（让）  1欧赔 2大小盘(总分)
  changeOdds: [[], [], []],
  teams: [],
  points: [{}, {}, {}],
  scoresDetail: {},
  techDetail: [],
  players: [],
  events: []
};

const actions = {
  [types.INFORMATION_SCHEDULE_DETAIL] (context) {
    loading.show();
    return Http.get('/Live/getScheduleDetail', {lottery_id: state.lottery, third_party_schedule_id: state.thirdId}).then(data => {
      context.commit(types.INFORMATION_SCHEDULE_DETAIL, data);
      loading.hide();
    });
  },
  [types.INFORMATION_SCHEDULE_EVENT] (context) {
    Http.get('/Live/getScheduleEvent', {lottery_id: state.lottery, third_party_schedule_id: state.thirdId}).then(data => {
      context.commit(types.INFORMATION_SCHEDULE_EVENT, data);
    });
  },
  [types.INFORMATION_RECORD_HISTORY] (context) {
    Http.get('/Live/getHistoryRecord', {lottery_id: state.lottery, third_party_schedule_id: state.thirdId}).then(data => {
      context.commit(types.INFORMATION_RECORD_HISTORY, data);
    });
  },
  [types.INFORMATION_RECORD_LATEST_HOME] (context) {
    return Http.get('/Live/getRecentRecord', {
      team_id: state.detail.home_id,
      lottery_id: state.lottery,
      third_party_schedule_id: state.thirdId
    }).then(data => {
      context.commit(types.INFORMATION_RECORD_LATEST_HOME, data);
    });
  },
  [types.INFORMATION_RECORD_LATEST_GUEST] (context) {
    Http.get('/Live/getRecentRecord', {
      team_id: state.detail.guest_id,
      lottery_id: state.lottery,
      third_party_schedule_id: state.thirdId
    }).then(data => {
      context.commit(types.INFORMATION_RECORD_LATEST_GUEST, data);
    });
  },
  [types.INFORMATION_RECORD_FUTURE_HOME] (context) {
    return Http.get('/Live/getFutureRecord', {
      team_id: state.detail.home_id,
      lottery_id: state.lottery,
      third_party_schedule_id: state.thirdId
    }).then(data => {
      context.commit(types.INFORMATION_RECORD_FUTURE_HOME, data);
    });
  },
  [types.INFORMATION_RECORD_FUTURE_GUEST] (context) {
    Http.get('/Live/getFutureRecord', {
      team_id: state.detail.guest_id,
      lottery_id: state.lottery,
      third_party_schedule_id: state.thirdId
    }).then(data => {
      context.commit(types.INFORMATION_RECORD_FUTURE_GUEST, data);
    });
  },
  [types.INFORMATION_LATEST_ODDS] (context, index) {
    return Http.get('/Live/getLasterOdds', {
      type: index,
      lottery_id: state.lottery,
      third_party_schedule_id: state.thirdId
    }).then(data => {
      context.commit(types.INFORMATION_LATEST_ODDS, {index: index, data: data});
    })
  },
  [types.INFORMATION_ODDS_CHANGE] (context, params) {
    loading.show();
    Http.get('/Live/requestOddChangeListByCompany', {
      type: params['type'],
      company_id: params['id'],
      lottery_id: state.lottery,
      third_party_schedule_id: state.thirdId
    }).then(data => {
      data.type = params.type;
      context.commit(types.INFORMATION_ODDS_CHANGE, data);
      loading.hide();
    })
  },
  [types.INFORMATION_TEAM_DATA] (context, params) {
    return Http.get('/Live/requestTeamRecordStats', {
      team_id: params['id'],
      lottery_id: state.lottery,
      third_party_schedule_id: state.thirdId
    }).then(data => {
      data.index = params.index;
      data.name = params.name;
      data.src = params.src;
      context.commit(types.INFORMATION_TEAM_DATA, data);
    })
  },
  [types.INFORMATION_GAME_POINT] (context, type) {
    return Http.get('/Live/getScheduleIntergral', {
      third_party_schedule_id: state.thirdId,
      type: type
    }).then(data => {
      data.index = type;
      context.commit(types.INFORMATION_GAME_POINT, data);
    })
  },
  [types.INFORMATION_SCORE_DETAIL] (context) {
    Http.get('/Live/requestScoreDetail', {
      lottery_id: state.lottery,
      third_party_schedule_id: state.thirdId
    }).then(data => {
      context.commit(types.INFORMATION_SCORE_DETAIL, data);
    });
  },
  [types.INFORMATION_TECHNOLOGY_TOTAL] (context) {
    Http.get('/Live/requestGameTechStats', {
      lottery_id: state.lottery,
      third_party_schedule_id: state.thirdId
    }).then(data => {
      context.commit(types.INFORMATION_TECHNOLOGY_TOTAL, data);
    })
  },
  [types.INFORMATION_PLAYER_DATA] (context, params) {
    loading.show();
    Http.get('/Live/requestPlayerTechStats', {
      team_id: params['id'],
      lottery_id: state.lottery,
      third_party_schedule_id: state.thirdId
    }).then(data => {
      context.commit(types.INFORMATION_PLAYER_DATA, data);
      loading.hide();
    })
  }
}

const mutations = {
  [types.INFORMATION_SET_THIRD_ID] (state, obj) {
    state.thirdId = obj.id;
    state.lottery = obj.lottery;
  },
  [types.INFORMATION_SCHEDULE_EVENT] (state, data) {
    console.log(data);
    state.events = data.list;
  },
  [types.INFORMATION_SCHEDULE_DETAIL] (state, data) {
    state.detail = data;
  },
  [types.INFORMATION_RECORD_HISTORY] (state, data) {
    data.team_id = state.detail.home_id;
    state.historyRecord = data;
  },
  [types.INFORMATION_RECORD_LATEST_HOME] (state, data) {
    data.name = state.detail.home;
    state.latestRecord.splice(0, 1, data);
  },
  [types.INFORMATION_RECORD_LATEST_GUEST] (state, data) {
    data.name = state.detail.guest;
    state.latestRecord.splice(1, 1, data);
  },
  [types.INFORMATION_RECORD_FUTURE_HOME] (state, data) {
    data.name = state.detail.home;
    state.futureRecord.splice(0, 1, data);
  },
  [types.INFORMATION_RECORD_FUTURE_GUEST] (state, data) {
    data.name = state.detail.guest;
    state.futureRecord.splice(1, 1, data);
  },
  [types.INFORMATION_LATEST_ODDS] (state, data) {
    data.data.list = data.data.list.map(value => {
      value.collapse = true;
      return value;
    })
    state.odds.splice(data.index, 1, data.data.list);
  },
  [types.INFORMATION_SWITCH_ODDS_COLLAPSE] (state, obj) {
    state.odds = state.odds.map((value, index) => {
      if (index === parseInt(obj.type)) {
        value = value.map((v, k) => {
          v.collapse = k === obj.index ? !v.collapse : true;
          return v;
        });
      }
      return value;
    })
  },
  [types.INFORMATION_ODDS_CHANGE] (state, data) {
    // console.log('type', data.type);
    // if (data.list.length > 5) {
    //   state.changeOdds.splice(data.type, 1, data.list.slice(0, 5));
    // } else {
    //
    // }
    state.changeOdds.splice(data.type, 1, data.list);
  },
  [types.INFORMATION_TEAM_DATA] (state, data) {
    state.teams.splice(data.index, 1, data);
  },
  [types.INFORMATION_GAME_POINT] (state, data) {
    state.points.splice(data.index, 1, data);
  },
  [types.INFORMATION_SCORE_DETAIL] (state, data) {
    state.scoresDetail = data;
  },
  [types.INFORMATION_TECHNOLOGY_TOTAL] (state, data) {
    state.techDetail = data;
  },
  [types.INFORMATION_PLAYER_DATA] (state, data) {
    state.players = data;
  }
}

export default {
  state, mutations, actions
}
