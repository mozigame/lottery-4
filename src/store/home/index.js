import * as types from './types';
import Http from '../Http';
import loading from '../../common/loading';
import HomeLotteryItem from '../../model/HomeLotteryItem';
import HomeLotteryIssue from '../../model/HomeLotteryIssue';

let state = {
  banners: [],
  issue: {},
  lotteries: [],
  information: []
}

const actions = {
  [types.GET_BANNER] (context) {
    if (state.banners.length === 0) {
      Http.get('/Home/getBanner').then(data => {
        context.commit(types.GET_BANNER, data);
      })
    }
  },
  [types.GET_LOTTERY_LIST] (context) {
    if (state.lotteries.length === 0) {
      loading.show();
      return Http.get('/Lottery/getLotteryList').then(data => {
        context.commit(types.GET_LOTTERY_LIST, data);
        loading.hide();
      })
    }
  },
  [types.LOTTERY_LIST_REFRESH] (context) {
    Http.get('/Lottery/getLotteryList').then(data => {
      context.commit(types.GET_LOTTERY_LIST, data);
    })
  },
  [types.GET_RECOMMEND_ISSUE] (context) {
    if (!state.issue.lottery_id) {
      Http.get('/Home/getRecommentIssue').then(data => {
        context.commit(types.GET_RECOMMEND_ISSUE, data);
      })
    }
  },
  [types.GET_INFORMATION_LIST] (context) {
    if (state.information.length === 0) {
      Http.get('/News/getRecommendList').then(data => {
        context.commit(types.GET_INFORMATION_LIST, data);
      })
    }
  },
  [types.RECOMMEND_ISSUE_REFRESH] (context) {
    Http.get('/Home/getRecommentIssue').then(data => {
      context.commit(types.GET_RECOMMEND_ISSUE, data);
    })
  }
}

const mutations = {
  [types.GET_BANNER] (state, banners) {
    state.banners = banners;
  },
  [types.GET_LOTTERY_LIST] (state, data) {
    if (state.lotteries) {
      // 取消定时器
      state.lotteries.map(value => value.onClearInterval())
    }
    state.lotteries = data.list.map(value => {
      return new HomeLotteryItem(value, data.server_time);
    });
  },
  [types.GET_RECOMMEND_ISSUE] (state, issue) {
    state.issue = new HomeLotteryIssue(issue);
  },
  [types.GET_INFORMATION_LIST] (state, data) {
    state.information = data.list;
  }
}

export default {
  state, mutations, actions
}
