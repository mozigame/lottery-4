import * as types from './types';
import { LOTTERYIDS } from '../constants';
import BettingFactory from '../../model/BettingFactory';
import SportsBetting from '../../model/SportsBetting';
import SfcBetting from '../../model/SfcBetting';
import HomeLotteryItem from '../../model/HomeLotteryItem';
import Http from '../Http';
import loading from '../../common/loading';
import md5 from 'md5';
import BonusOptimizationUtil from '../../model/common/BonusOptimizationUtil';
import Lottery from '../../model/common/Lottery';
import SfcCalculator from '../../model/common/SfcCalculator';

const state = {
  lottery: null,
  currentLottery: {},
  filterPanelVisible: false,
  [LOTTERYIDS.SYXW]: { playType: null },
  [LOTTERYIDS.SYXW8]: { playType: null },
  [LOTTERYIDS.SYXW18]: { playType: null },
  [LOTTERYIDS.FC3D]: { playType: null },
  [LOTTERYIDS.K3]: { playType: null },
  [LOTTERYIDS.JXK3]: { playType: null },
  [LOTTERYIDS.SSQ]: { playType: null },
  [LOTTERYIDS.DLT]: { playType: null },
  [LOTTERYIDS.FOOTBALL_SPF]: { playType: {id: 601, value: '胜平负'}, mode: 2, scheme: [] },
  [LOTTERYIDS.FOOTBALL_RQSPF]: { playType: {id: 602, value: '让球胜平负'}, mode: 2, scheme: [] },
  [LOTTERYIDS.FOOTBALL_BF]: { playType: {id: 603, value: '比分'}, mode: 2, scheme: [] },
  [LOTTERYIDS.FOOTBALL_ZJQ]: { playType: {id: 604, value: '总进球'}, mode: 2, scheme: [] },
  [LOTTERYIDS.FOOTBALL_BQC]: { playType: {id: 605, value: '半全场'}, mode: 2, scheme: [] },
  [LOTTERYIDS.FOOTBALL_HH]: { playType: {id: 606, value: '混合投注'}, mode: 2, scheme: [] },
  [LOTTERYIDS.BASKETBALL_SF]: { playType: {id: 701, value: '胜负'}, mode: 2, scheme: [] },
  [LOTTERYIDS.BASKETBALL_RFSF]: { playType: {id: 702, value: '让分胜负'}, mode: 2, scheme: [] },
  [LOTTERYIDS.BASKETBALL_SFC]: { playType: {id: 703, value: '胜分差'}, mode: 2, scheme: [] },
  [LOTTERYIDS.BASKETBALL_DXF]: { playType: {id: 704, value: '大小分'}, mode: 2, scheme: [] },
  [LOTTERYIDS.BASKETBALL_HH]: { playType: {id: 705, value: '混合过关'}, mode: 2, scheme: [] },
  [LOTTERYIDS.SFC]: [],
  [LOTTERYIDS.RXJ]: [],
  sfc: {issues: [], current: {}},
  confirm: {
    bettingList: [],
    followTimes: 1,
    multiple: 1,
    id: null,
    sign: null,
    ticketPrice: 2,
    addTo: false
  },
  sportConfirm: {
    bettingList: [],
    multiple: 1,
    ticketPrice: 2,
    mode: 2,
    bonus: {min: 0, max: 0},
    stakeCount: 0,
    series: [],
    isMulti: false
  },
  optimizeList: [],
  optimize: {
    min: 0, max: 0, count: 0, money: 0, input: 0, index: 0, inputStatus: false
  },
  groupsKey: null
};
const LX_TYPE = [34, 35, 36, 37];
const actions = {
  [types.GET_CURRENT_LOTTERY] (context) {
    if (String(state.lottery) === String(state.currentLottery.lottery_id)) {
      return;
    }
    if (state.currentLottery.lottery_name) {
      state.currentLottery.onClearInterval();
    }
    loading.show();
    return Http.get('/Lottery/getCurrentIssue', {lottery_id: state.lottery}).then(data => {
      context.commit(types.CLEAR_CONFIRM_BETTING_LIST);
      context.commit(types.GET_CURRENT_LOTTERY, data);
      loading.hide();
    })
  },
  [types.CURRENT_LOTTERY_REFRESH] (context) {
    Http.get('/Lottery/getCurrentIssue', {lottery_id: state.lottery}).then(data => {
      context.commit(types.GET_CURRENT_LOTTERY, data);
    })
  },
  // 获取竟猜投注列表
  [types.GET_CURRENT_SPORT_LOTTERY] (context) {
    Http.get('/Lottery/getJcList', {lottery_id: state.lottery, play_type: state[state.lottery].mode}).then(data => {
      context.commit(types.GET_CURRENT_SPORT_LOTTERY, data);
    });
  },
  // 获取胜负彩列表
  [types.GET_CURRENT_SFC_LOTTERY] (context) {
    if ((parseInt(state.lottery) === 20 && state[state.lottery].length === 0) ||
      (parseInt(state.lottery) === 21 && state[state.lottery].length === 0)) {
      loading.show();
      Http.get('/Lottery/getCtzqList', {lottery_id: state.lottery}).then(data => {
        context.commit(types.GET_CURRENT_SFC_LOTTERY, data.result);
        loading.hide();
      })
    }
  },
  [types.DIGITAL_CONFIRM_PAYMENT] (context, result) {
    if (context.rootState.user.token) {
      loading.show();
      const mdStr = '{0}{1}{2}Ehcv2b1AvWAMSey2'.format(result.lottery_id, result.issue_id, parseInt(result.total_amount));
      return Http.post('/WebBet/preBet&lottery_id={0}&product_name=LHCP&sign={1}'.format(result.lottery_id, md5(mdStr)), result).then(data => {
        context.commit(types.DIGITAL_CONFIRM_PAYMENT, data);
        loading.hide();
      })
    }
  },
  [types.SPORTS_CONFIRM_PAYMENT] (context, result) {
    if (context.rootState.user.token) {
      loading.show();
      const mdStr = '{0}{1}{2}Ehcv2b1AvWAMSey2'.format(result.lottery_id, result.play_type, parseInt(result.total_amount));
      return Http.post('/WebBet/preBet&lottery_id={0}&product_name=LHCP&sign={1}'.format(result.lottery_id, md5(mdStr)), result).then(data => {
        context.commit(types.SPORTS_CONFIRM_PAYMENT, data);
        loading.hide();
      })
    }
  },
  [types.SFC_CONFIRM_PAYMENT] (context, result) {
    if (context.rootState.user.token) {
      loading.show();
      const mdStr = '{0}{1}{2}Ehcv2b1AvWAMSey2'.format(result.lottery_id, result.issue_no, parseInt(result.total_amount));
      return Http.post('/WebBet/preBet&lottery_id={0}&product_name=LHCP&sign={1}'.format(result.lottery_id, md5(mdStr)), result).then(data => {
        context.commit(types.SPORTS_CONFIRM_PAYMENT, data);
        loading.hide();
      })
    }
  },
  [types.CURRENT_SPORT_PLAY_TYPE_SELECT] (context, data) {
    if (state.lottery !== data.id) {
      context.commit(types.SET_CURRENT_LOTTERY, data.id);
      const obj = state[state.lottery];
      if (!obj.scheme[obj.mode === 2 ? 0 : 1]) {
        loading.show();
        Http.get('/Lottery/getJcList', {lottery_id: state.lottery, play_type: obj.mode}).then(data => {
          context.commit(types.CURRENT_SPORT_PLAY_TYPE_SELECT, data);
          loading.hide();
        });
      }
    }
  },
  [types.SPORT_MODE_SELECT] (context, mode) {
    const obj = state[state.lottery];
    if (!obj.scheme[mode === 2 ? 0 : 1]) {
      loading.show();
      Http.get('/Lottery/getJcList', {lottery_id: state.lottery, play_type: mode}).then(data => {
        context.commit(types.SPORT_MODE_SELECT, mode);
        context.commit(types.CURRENT_SPORT_PLAY_TYPE_SELECT, data);
        loading.hide();
      });
    } else {
      context.commit(types.SPORT_MODE_SELECT, mode);
    }
  }
}

const mutations = {
  [types.GET_CURRENT_LOTTERY] (state, data) {
    data.issue.timerType = 'bet';
    state.currentLottery = new HomeLotteryItem(data.issue, data.server_time);
  },
  [types.CURRENT_PLAY_TYPE_SELECT] (state, data) {
    // state[state.lottery].playType = data;
    // 先判断是否不存在玩法，或者当前玩法没有变化
    if (!state[state.lottery].playType || state[state.lottery].playType.id !== data.id ||
      (state[state.lottery].playType.id === data.id && state[state.lottery].playType.sure !== data.sure)) {
      state[state.lottery] = new BettingFactory(state.lottery, data);
    }
  },
  [types.CURRENT_SPORT_PLAY_TYPE_SELECT] (state, data) {
    const obj = state[state.lottery];
    let schemes = [...obj.scheme];
    schemes[obj.mode === 2 ? 0 : 1] = new SportsBetting(data, obj.mode);
    obj.scheme = schemes;
  },
  [types.GET_CURRENT_SPORT_LOTTERY] (state, data) {
    // x
    console.log(data);
  },
  [types.SPORT_MODE_SELECT] (state, data) {
    state[state.lottery].mode = data;
  },
  [types.SET_CURRENT_LOTTERY] (state, lottery) {
    state.lottery = lottery;
  },
  [types.CLEAR_BETTING_SELECTED] () {
    state[state.lottery].clearSelected();
  },
  [types.CONFIRM_BET] () {
    if (LX_TYPE.indexOf(state[state.lottery].playType.id) !== -1) {
      state.confirm.bettingList = state.confirm.bettingList.concat(state[state.lottery].getTickets());
    } else if (Lottery.isK3(state.lottery)) {
      state.confirm.bettingList = state.confirm.bettingList.concat(state[state.lottery].getTickets());
    } else {
      state.confirm.bettingList.push(state[state.lottery].getTicket());
    }
  },
  [types.CONFIRM_DELETE_TICKET] (state, key) {
    state.confirm.bettingList.splice(key, 1);
  },
  [types.CONFIRM_CLEAR_TICKETS] (state) {
    state.confirm.bettingList = [];
  },
  [types.FOLLOW_TIMES_CHANGE] (state, times) {
    state.confirm.followTimes = times;
  },
  [types.MULTIPLE_CHANGE] (state, multiple) {
    state.confirm.multiple = multiple;
  },
  [types.RANDOM_SELECTED_BALL] (state) {
    state[state.lottery].getAutoBall();
    state[state.lottery].onBallChanged();
  },
  [types.CONFIRM_RANDOM_TICKET] (state) {
    let ticket = state[state.lottery].getAutoTicket();
    if (LX_TYPE.indexOf(state[state.lottery].playType.id) !== -1) {
      state.confirm.bettingList = state.confirm.bettingList.concat(ticket);
    } else if (Lottery.isK3(state.lottery)) {
      state.confirm.bettingList = state.confirm.bettingList.concat(ticket);
    } else {
      ticket.stakeCount = 1;
      ticket.totalAmount = state[state.lottery].TicketPrice;
      ticket.betType = 1;
      state.confirm.bettingList.push(ticket);
    }
    state[state.lottery].clearSelected();
  },
  [types.CLEAR_CONFIRM_BETTING_LIST] () {
    state.confirm.bettingList = [];
    state.confirm.followTimes = 1;
    state.confirm.totalAmount = 0;
    state.confirm.multiple = 1;
  },
  [types.RECOMMEND_ISSUE_SET] (state, issue) {
    state[state.lottery].setBallSelected(issue.ballSelected);
  },
  [types.DIGITAL_CONFIRM_PAYMENT] (state, data) {
    state.confirm.id = data.id;
    state.confirm.sign = data.sign;
  },
  [types.SPORTS_CONFIRM_PAYMENT] (state, data) {
    state.sportConfirm.id = data.id;
    state.sportConfirm.sign = data.sign;
  },
  [types.SPORTS_OPTION_SELECTED] () {
    const obj = state[state.lottery];
    obj.scheme[obj.mode === 2 ? 0 : 1].setBottomTip();
  },
  [types.CLEAR_SPORT_BETTING_SELECTED] () {
    const obj = state[state.lottery];
    obj.scheme[obj.mode === 2 ? 0 : 1].clearSelected();
  },
  [types.SPORTS_CONFIRM_BET] () {
    const obj = state[state.lottery];
    state.sportConfirm.bettingList = obj.scheme[obj.mode === 2 ? 0 : 1].getBettingList();
    state.sportConfirm.mode = obj.mode;
    state.sportConfirm.multiple = 1;
    state.sportConfirm.series = [];
    state.sportConfirm.isMulti = false;
  },
  [types.SPORTS_CONFIRM_DELETE_TICKET] (state, key) {
    state.sportConfirm.bettingList.splice(key, 1);
  },
  [types.SPORTS_CONFIRM_CLEAR_TICKETS] (state) {
    state.sportConfirm.bettingList = [];
  },
  [types.SPORTS_MULTIPLE_CHANGE] (state, multiple) {
    state.sportConfirm.multiple = multiple;
  },
  [types.SPORTS_BONUS_CHANGE] (state, result) {
    state.sportConfirm.bonus.min = result.min;
    state.sportConfirm.bonus.max = result.max;
    state.sportConfirm.stakeCount = result.count;
  },
  [types.SPORTS_FILTER_PANEL_CHANGE] (state, status) {
    const obj = state[state.lottery];
    if (obj.scheme[obj.mode === 2 ? 0 : 1].groups.length > 0) {
      state.filterPanelVisible = status;
    }
  },
  [types.SPORTS_CONFIRM_OPTIMIZE] (state, list) {
    state.optimizeList = list;
    state.groupsKey = BonusOptimizationUtil.getGroupScoreKeys(state.sportConfirm.bettingList, state.lottery);
  },
  [types.SPORTS_OPTIMIZE_STAKE_CHANGE] (state, obj) {
    // state.optimizeList[obj.index][0].stake = obj.stake;
    state.optimizeList = state.optimizeList.map((value, key) => {
      if (key === obj.index) {
        value[0].stake = obj.stake;
      }
      return value;
    })
  },
  [types.SPORTS_OPTIMIZE_ITEM_MONEY] (state) {
    state.optimizeList = state.optimizeList.map(value => {
      let result = 2;
      value.map(v => { result *= parseFloat(v.odds) });
      value[0].money = result;
      return value;
    })
    state.optimizeList = state.optimizeList.sort((a, b) => {
      return a[0].money - b[0].money;
    })
  },
  [types.SPORTS_OPTIMIZE_ITEM_CHECKED] (state, obj) {
    state.optimizeList[obj.index][0].checked = obj.checked;
  },
  [types.SPORTS_OPTIMIZE_CALCULATE] (state) {
    let count = 0;
    let min = 0;
    state.optimizeList.map((value) => {
      if (value[0].checked) {
        let money = value[0].money * value[0].stake;
        min === 0 ? min = money : '';
        count += value[0].stake;
        if (min > money) { min = money; }
      }
    });
    let max = BonusOptimizationUtil.getMaxBonus(state.groupsKey, state.optimizeList.filter(v => v[0].checked));
    state.optimize = {
      count: count, max: max, min: min, money: count * 2, input: count * 2, index: state.optimize.index
    }
  },
  [types.SPORTS_OPTIMIZE_INPUT_VALUE] (state, value) {
    state.optimize.input = value;
  },
  [types.SPORTS_OPTIMIZE_REDISTRIBUTION] (state, value) {
    state.optimize.index = value;
  },
  [types.SPORTS_OPTIMIZE_STAKE_DISTRIBUTION] (state) {
    state.optimizeList = BonusOptimizationUtil.optimize(state.optimize.input,
      state.optimize.index, state.optimizeList);
  },
  [types.SPORTS_CONFIRM_SERIES_SET] (state, obj) {
    state.sportConfirm.series = obj.series;
    state.sportConfirm.isMulti = obj.isMulti;
  },
  [types.SPORTS_CONFIRM_SERIES_CLEAR] () {
    state.sportConfirm.series = [];
    state.sportConfirm.isMulti = false;
  },
  [types.GET_CURRENT_SFC_LOTTERY] (state, data) {
    state[state.lottery] = data.issues.map(issue => {
      return new SfcBetting(issue, state.lottery);
    });
    state.sfc.issues = data.issues.map((v, i) => {
      return {key: i, value: v.no};
    });
    state.sfc.current = state.sfc.issues[0];
  },
  [types.SFC_CHANGE_ISSUE] (state, data) {
    state.sfc.current = data;
  },
  [types.SFC_OPTION_SELECTED] (state) {
    state[state.lottery][state.sfc.current.key].setBottomTip();
  },
  [types.SFC_BETTING_CONFIRM] (state) {
    state.sportConfirm.bettingList = state[state.lottery][state.sfc.current.key].getBettingList();
    state.sportConfirm.multiple = 1;
    state.sportConfirm.bettingList = state.sportConfirm.bettingList.map(betting => {
      betting.isSure = false;
      return betting;
    });
    state.sportConfirm.stakeCount = SfcCalculator.calBetCount(state.sportConfirm.bettingList, state.lottery);
  },
  [types.SFC_CALCULATOR_STACK] (state) {
    state.sportConfirm.stakeCount = SfcCalculator.calBetCount(state.sportConfirm.bettingList, state.lottery);
  }
}

export default {
  state, mutations, actions
}
