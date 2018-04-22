import * as types from './types';
import Http from '../Http';
import router from '../../router/index';
import loading from '../../common/loading';
import { OrderStatus } from '../constants';
import { user } from '../../common/store';
import Order from '../../model/Order';
import OrderScheme from '../../model/OrderScheme';
import Toast from '../../common/toast';

const state = {
  orders: {
    status: 0, // 当前订单列表状态 -1未开奖、0全部、1中奖、-2未中奖
    offset: 0, // 分页偏移量
    limit: 10, // 分页条数
    list: null, // 列表数据
    end: false,
    id: 0, // 当前订单ID
    detail: {}, // 订单详情
    loading: false, // 是否正在加载更多数据
    lottery_id: 0, // 彩种ID(0不区分彩种)
    scheme: {} // 方案详情
  },
  token: user.getToken(),
  mine: {}, // 个人信息页,
  userBank: {}, // 个人银行信息
  bankList: {}, // 银行列表
  withDrawCashMoney: 0, // 提现金额
  newRegisterStatus: false
};

const actions = {
  [types.GET_CAPTCHA] (context, params) {
    Http.post('/Send/msg', params); // 请求获取验证码
  },
  [types.LOGIN] (context, params) {
    Http.post('/User/login', params).then((data) => {
      context.commit(types.LOGIN, data);
    });
  },
  [types.REGISTER] (context, params) {
    Http.post('/User/register', params).then((data) => {
      context.commit(types.LOGIN, data);
    });
  },
  [types.BASE_REGISTER] (context, params) {
    return Http.post('/User/register', params).then((data) => {
      context.commit(types.BASE_LOGIN, data);
    });
  },
  [types.NEW_REGISTER] (context, params) {
    Http.post('/User/register', params).then((data) => {
      context.commit(types.NEW_REGISTER, data);
    });
  },
  [types.LOGOUT] (context) {
    Http.get('/User/logout').then(() => {
      context.commit(types.LOGOUT);
    })
  },
  [types.FORGET_PASSWORD] (context, params) {
    Http.post('/User/resetPassword', params).then(data => {
      context.commit(types.FORGET_PASSWORD, data);
    });
  },
  [types.MINE_INFO] (context) {
    loading.show();
    Http.get('/User').then(data => {
      context.commit(types.MINE_INFO, data);
      loading.hide();
    })
  },
  [types.SET_IDCARD] (context, params) {
    Http.post('/User/saveIDCard', params).then(data => {
      context.commit(types.SET_IDCARD, data);
    });
  },
  [types.SET_USER_BANKCARD] (context, params) {
    Http.post('/User/saveBankCardInfo', params).then(data => {
      context.commit(types.SET_USER_BANKCARD, data);
    });
  },
  [types.GET_USER_BANKCARD] (context) {
    loading.show();
    Http.get('/User/getUserBankCard').then(data => {
      context.commit(types.GET_USER_BANKCARD, data);
      loading.hide();
    })
  },
  [types.GET_BANKS_LIST] (context) {
    loading.show();
    Http.get('/Config/fetBankList').then(data => {
      context.commit(types.GET_BANKS_LIST, data);
      loading.hide();
    })
  },
  [types.WITH_DRAW_CASH] (context, params) {
    Http.post('/Recharge/userWithdraw', params).then(data => {
      context.commit(types.WITH_DRAW_CASH, data);
      state.withDrawCashMoney = params.money;
    });
  },
  [types.GET_ORDERS_LIST] (context, status) {
    loading.show();
    context.commit(types.ORDER_LIST_FILTER, status);
    context.commit(types.RESET_ORDERS);
    Http.get('/Order', {
      lottery_id: state.orders.lottery_id,
      order_type: state.orders.status,
      offset: state.orders.offset,
      limit: state.orders.limit
    }).then(data => {
      context.commit(types.GET_ORDERS_LIST, data);
      loading.hide();
    })
  },
  [types.ORDERS_LIST_MORE_REQUEST] (context) {
    if (!state.orders.end) {
      context.commit(types.ORDERS_LIST_MORE_REQUEST);
      Http.get('/Order', {
        lottery_id: state.orders.lottery_id,
        order_type: state.orders.status,
        offset: state.orders.offset,
        limit: state.orders.limit
      }).then(data => {
        context.commit(types.ORDERS_LIST_MORE_SUCCESS, data);
      })
    }
  },
  [types.ORDER_DETAIL_REQUEST] (context, id) {
    if (state.orders.detail.id !== String(id) || !state.orders.detail.id) {
      context.commit(types.ORDER_DETAIL_REQUEST, id);
      loading.show();
      return Http.get(`/Order/detail`, {order_id: id}).then(data => {
        context.commit(types.ORDER_DETAIL_SUCCESS, data);
        loading.hide();
      }, (data) => {
        if (data.code === 10008) {
          history.back();
        }
      });
    }
  },
  [types.ORDER_SCHEME_REQUEST] (context, id) {
    loading.show();
    if (!state.orders.detail.id) {
      context.dispatch(types.ORDER_DETAIL_REQUEST, id).then(() => {
        Http.get(`/Order/program`, {order_id: id, limit: 100000, offset: 0}).then(data => {
          context.commit(types.ORDER_SCHEME_SUCCESS, data);
          loading.hide();
        });
      });
    } else {
      Http.get(`/Order/program`, {order_id: id, limit: 100000, offset: 0}).then(data => {
        context.commit(types.ORDER_SCHEME_SUCCESS, data);
        loading.hide();
      });
    }
  },
  [types.SCHEME_CONFIRM_CHANGE_ACCOUNT] (context) {
    Http.get('/User/logout').then(() => {
      context.commit(types.SCHEME_CONFIRM_CHANGE_ACCOUNT);
    })
  }
};

const mutations = {
  [types.LOGIN] (state, data) {
    user.setToken(data.user_token);
    state.token = data.user_token;
    const redirect = router.currentRoute.query.redirect || '/mine';
    let query = router.currentRoute.query;
    delete query.redirect;
    router.replace({ path: redirect, query: query });
  },
  [types.BASE_LOGIN] (state, data) {
    user.setToken(data.user_token);
    state.token = data.user_token;
  },
  [types.NEW_REGISTER] (state) {
    state.newRegisterStatus = true;
  },
  [types.FORGET_PASSWORD] () {
    user.clearToken();
    state.token = '';
    router.replace({ name: 'Login', query: router.currentRoute.query });
  },
  [types.MINE_INFO] (state, mine) {
    state.mine = mine;
  },
  [types.GET_USER_BANKCARD] (state, userBank) {
    state.userBank = userBank;
  },
  [types.SET_IDCARD] (state) {
    Toast('验证成功!');
    router.replace({ name: 'UserInfo' });
  },
  [types.SET_USER_BANKCARD] (state) {
    Toast('验证成功!');
    router.replace({ name: 'UserInfo' });
  },
  [types.GET_BANKS_LIST] (state, bankList) {
    state.bankList = bankList;
  },
  [types.WITH_DRAW_CASH] (state) {
    router.replace({ name: 'CashDetail' });
  },
  [types.LOGOUT] (state) {
    state.token = '';
    user.clearToken();
    router.replace({name: 'Login'});
  },
  [types.CLEAR_TOKEN] (state) {
    user.clearToken();
    state.token = '';
    router.push({
      name: 'Login',
      query: { redirect: router.currentRoute.path }
    });
  },
  [types.GET_ORDERS_LIST] (state, orders) {
    orders.map(value => {
      value.statusText = OrderStatus[value.status];
    })
    state.orders.list = orders;
  },
  [types.ORDER_LIST_FILTER] (state, status) {
    state.orders.status = status;
  },
  [types.RESET_ORDERS] (state) {
    state.orders.list = null;
    state.orders.offset = 0;
    state.orders.end = false;
  },
  [types.ORDERS_LIST_MORE_REQUEST] (state) {
    state.orders.loading = true;
    state.orders.offset += state.orders.limit;
  },
  [types.ORDERS_LIST_MORE_SUCCESS] (state, list) {
    if (list && list.length > 0) {
      list.map(value => {
        value.statusText = OrderStatus[value.status];
      })
      state.orders.list = state.orders.list.concat(list);
    } else {
      state.orders.end = true;
    }
    state.orders.loading = false;
  },
  [types.ORDER_DETAIL_REQUEST] (state, id) {
    state.orders.id = id;
  },
  [types.ORDER_DETAIL_SUCCESS] (state, detail) {
    state.orders.detail = new Order(detail);
  },
  [types.ORDER_SCHEME_SUCCESS] (state, scheme) {
    state.orders.scheme = new OrderScheme(scheme, state.orders.detail.prize_num);
  },
  [types.SCHEME_CONFIRM_CHANGE_ACCOUNT] (state) {
    state.token = '';
    user.clearToken();
    let params = router.currentRoute.query;
    params['redirect'] = router.currentRoute.path;
    router.push({name: 'Login', query: params});
  }
}

export default {
  state, mutations, actions
}
