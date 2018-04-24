import * as types from './types';
import Http from '../Http';
import { LOTTERYIDS } from '../constants';

const state = {
  [`11`]: {groups: []},
  [`12`]: {groups: []},
  [`13`]: {groups: []},
  [`14`]: {groups: []},
  [`31`]: {groups: []},
  [`32`]: {groups: []},
  [`33`]: {groups: []},
  [`34`]: {groups: []},
  [`21`]: {groups: []},
  [`22`]: {groups: []},
  [`toTop11`]: [],
  [`toTop12`]: [],
  [`toTop13`]: [],
  [`toTop31`]: [],
  [`toTop32`]: [],
  [`toTop33`]: [],
  [`toTop21`]: [],
  lotteryType: 1,
  lotteryState: 1
};

const mutations = {
  [types.TO_THE_TOP] (state, {del, index}) {
    // 增加置顶
    let delData
    const sta = `${state.lotteryType}${state.lotteryState}`
    // console.log(del, index, state)
    let data = JSON.parse(JSON.stringify(state[sta]))
    if (del) {
      // 置顶
      delData = data.groups[index[0]].schedules.splice(index[1], 1)
      state[`toTop${sta}`] = state[`toTop${sta}`].concat({...delData[0], toTop: {del, index}})
      state[sta] = data
    } else {
      let data2 = JSON.parse(JSON.stringify(state[`toTop${sta}`]))
      delData = data2.splice(index[1], 1)
      let del2 = JSON.parse(JSON.stringify(delData[0]))
      state[`toTop${sta}`] = data2
      del2.toTop = false
      data.groups[delData[0].toTop.index[0]].schedules.splice(delData[0].toTop.index[1], 0, del2)
      state[sta] = data
    }
  },
  [types.SET_SWITCHOVER] (state, params) {
    // 切换
    state.lotteryType = params[0]
    state.lotteryState = params[1]
  },
  [types.SET_LOTTERY_1] (state, {target, params, add}) {
    // 设置数据
    if (add) {
      if (params.groups.length === 0) {
        return
      }
      let data = JSON.parse(JSON.stringify(state[`${target[0]}${target[1]}`]))
      if (data.groups[data.groups.length - 1].date_timestamp === params.groups[0].date_timestamp) {
        let list = params.groups.shift()
        data.groups[data.groups.length - 1].list.push(...list.list)
      }
      params.groups.forEach(append => {
        data.groups.push(append)
      })
      state[`${target[0]}${target[1]}`] = data;
    } else {
      state[`${target[0]}${target[1]}`] = params;
    }
  },
  [types.TO_THE_TOP_INIT] (state, {target, params}) {
    // 设置置顶数据
    state[`toTop${target[0]}${target[1]}`] = JSON.parse(JSON.stringify(params));
  }
};
const actions = {
  [types.GET_MINE_BET_DATA] ({state}, {id, offset}) {
    // 获取我的投注列表
    return new Promise((resolve, reject) => {
      Http.get(`/MyOrder/queryScheduleListInOrder`, {
        lottery_id: id === `14` ? 6 : id === `34` ? 7 : 20,
        offset: offset || 0,
        limit: 10
      }).then((data) => {
        resolve(data)
      }).catch(reject)
    })
  },
  [types.GET_GAME_LIST] ({state}, params) {
    // 获取比赛列表
    return new Promise((resolve, reject) => {
      let data = {};
      data.type = params[1] === 1 ? 2 : params[1] === 2 ? 3 : 1;
      data.lottery_id = params[0] === 1 ? LOTTERYIDS.FOOTBALL : params[0] === 3 ? LOTTERYIDS.BASKETBALL : LOTTERYIDS.SFC;
      Http.get('/Live/getScheduleList', data).then((data) => {
        resolve({data, toTheTop: state[`toTop${params[0]}${params[0]}`]})
      }).catch(reject)
    })
  }
};

export default {
  state, mutations, actions
}
