/**
 * Created by weishuwen on 2017/3/30.
 */
import Vuex from 'vuex';
import Vue from 'vue';
import user from './user/index';
import scheme from './scheme/index';
import payment from './payment/index';
import betting from './betting/index';
import home from './home/index';
import prize from './prize/index';
import score from './score/index';
import information from './information/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user, scheme, payment, betting, home, prize, information, score
  }
})
