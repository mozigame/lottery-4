import * as types from './types';
import Http from '../Http';
import loading from '../../common/loading';
import Toast from '../../common/toast';
import router from '../../router/index';
import { pageJump } from '../../common/store';
import {CLEAR_CONFIRM_BETTING_LIST} from '../betting/types';

let state = {
  rechargeList: [],
  rechargeTypeId: 0,
  rechargeObject: {},
  rechargeResult: {},
  confirm: {}, // 赢球大师的订单确认页
  order: {},  // 老虎彩票的订单确认页
  orderId: undefined
}

const actions = {
  [types.RECHARGE_LIST] (context) {
    loading.show();
    Http.get('/Recharge/getPlatformList').then(data => {
      context.commit(types.RECHARGE_LIST, data);
      loading.hide();
    }, loading.hide)
  },
  [types.RECHARGE] (context, params) {
    Http.post('/Recharge/userRecharge', params).then(data => {
      context.commit(types.RECHARGE, data);
    })
  },
  [types.RECHARGE_INFO] (context, params) {
    Http.get('/Recharge/getRechargeInfo', params).then(data => {
      context.commit(types.RECHARGE_INFO, data);
    });
    // context.commit(types.RECHARGE_INFO, { status: 1 });
  },
  [types.PAYMENT_CONFIRM] (context, params) {
    if (context.rootState.user.token) {
      loading.show();
      Http.post('/Bet/submitConfirm', {...params}).then(data => {
        data.params = params;
        context.commit(types.PAYMENT_CONFIRM, data);
        loading.hide();
      }, (error) => {
        if (error.data && error.data.lack_money > 0) {
          router.push({ name: 'Payment', query: {lack: error.data.lack_money} });
        }
        loading.hide();
      });
    } else {
      params['redirect'] = router.currentRoute.path;
      router.push({ name: 'Login', query: params });
    }
  },
  [types.PAYMENT_ORDER] (context, params) {
    loading.show();
    Http.post('/Bet/submitConfirm', params).then(data => {
      context.commit(types.PAYMENT_ORDER, data);
      loading.hide();
    }, (error) => {
      if (error.data && error.data.lack_money > 0) {
        router.push({ name: 'Payment', query: {lack: error.data.lack_money} });
      }
      loading.hide();
    });
  },
  [types.PAYMENT] (context, params) {
    loading.show();
    return Http.post('/Bet/submitPay', params).then(data => {
      context.commit(types.PAYMENT, data);
      loading.hide();
    }, loading.hide)
  },
  [types.PAYMENT_ORDER_COMPLETE] (context, params) {
    loading.show();
    return Http.post('/Bet/submitPay', params).then(data => {
      context.commit(types.PAYMENT_ORDER_COMPLETE, data);
      context.commit(CLEAR_CONFIRM_BETTING_LIST);
      loading.hide();
    }, loading.hide)
  }
}

const mutations = {
  [types.RECHARGE_LIST] (state, list) {
    state.rechargeTypeId = list && list[0] && list[0].id;
    state.rechargeList = list || [];
  },
  [types.RECHARGE] (state, data) {
    window.location.href = data.target_url;
  },
  [types.RECHARGE_INFO] (state, data) {
    if (data.status === 2) {
      Toast('充值失败');
    } else if (data.status === 1) {
      Toast('充值成功')
      data.success = true;
      state.rechargeResult = data;
      router.replace(pageJump.fromGet('Payment') || {name: 'Mine'});
    } else if (data.status === 0) {
      Toast('充值未到账');
      router.replace(pageJump.fromGet('Payment') || {name: 'Mine'});
    }
  },
  [types.PAYMENT_CONFIRM] (state, data) {
    data.currentRedPack = data.coupon_list && data.coupon_list[0] &&
      data.coupon_list[0].list && data.coupon_list[0].list[0];
    state.confirm = data;
    router.push({ name: 'PaymentConfirm' });
  },
  [types.PAYMENT_ORDER] (state, data) {
    data.currentRedPack = data.coupon_list && data.coupon_list[0] &&
      data.coupon_list[0].list && data.coupon_list[0].list[0];
    state.order = data;
  },
  [types.PAYMENT] (state, data) {
    state.orderId = data.order_id;
    state.confirm = {};
    router.replace({ name: 'PaymentComplete' });
  },
  [types.PAYMENT_ORDER_COMPLETE] (state, data) {
    state.orderId = data.order_id;
    state.order = {};
    // router.replace({name: 'OrderDetail', params: {id: state.orderId}})
    router.replace({ name: 'PaymentComplete' });
  },
  [types.SELECT_CURRENT_RED_PACK] (state, redPack) {
    if (state.confirm.currentRedPack.id === redPack.id) {
      state.confirm.currentRedPack = {};
    } else {
      state.confirm.currentRedPack = redPack;
    }
  },
  [types.SELECT_ORDER_RED_PACK] (state, redPack) {
    if (state.order.currentRedPack.id === redPack.id) {
      state.order.currentRedPack = {};
    } else {
      state.order.currentRedPack = redPack;
    }
  },
  [types.CHANGE_RECHARGE_TYPE] (state, id) {
    state.rechargeTypeId = id;
  }
}

export default {
  state, actions, mutations
}
