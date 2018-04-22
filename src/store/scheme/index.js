import * as types from './types';
import Http from '../Http';
import loading from '../../common/loading';
import { seriesArray, confirmOrderBetNumberHandle, confirmOrderShowTeam } from '../../common/algorithm';
import Util from '../../common/util';

const state = {
  detail: { },
  confirm: {},
  expired: false,
  paymentComplete: false
};
const actions = {
  [types.GET_SCHEME_CONFIRM] (context) {
    loading.show();
    const urlSearch = Util.urlSearch();
    Http.get('/Bet/index', Util.urlSearch()).then(data => {
      data.id = urlSearch['id'];
      data.productName = urlSearch['product_name'];
      data.sign = urlSearch['sign'];
      context.commit(types.GET_SCHEME_CONFIRM, data);
      loading.hide();
    }, function () {
      context.commit(types.SCHEME_CONFIRM_EXPIRED);
      loading.hide();
    });
  }
}

const mutations = {
  [types.GET_SCHEME_CONFIRM] (state, data) {
    data.seriesList = seriesArray(data.series);
    data.schedule_orders.map(value => {
      value.result = confirmOrderBetNumberHandle(value.bet_number);
      value.team = confirmOrderShowTeam(value, data.lottery_id);
    });
    state.confirm = data;
  },
  [types.SCHEME_CONFIRM_EXPIRED] (state) {
    state.expired = true;
  }
}

export default {
  state, mutations, actions
}
