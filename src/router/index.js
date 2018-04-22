import Vue from 'vue'
import Router from 'vue-router'
import Login from '../view/user/Login';
import Register from '../view/user/Register';
import Orders from '../view/user/Orders';
import OrderDetail from '../view/user/OrderDetail';
import OrderDetailScheme from '../view/user/OrderDetailScheme';
import Mine from '../view/user/Mine.vue';
import ForgotPassword from '../view/user/ForgotPassword.vue';
import UserInfo from '../view/user/UserInfo.vue';
import IDCard from '../view/user/IDCard.vue';
import BankCard from '../view/user/BankCard.vue';
import Cash from '../view/user/Cash.vue';
import CashDetail from '../view/user/CashDetail.vue';

import Football from '../view/scheme/Football.vue';
import FootballConfirm from '../view/scheme/FootballConfirm';

import PaymentConfirm from '../view/paymennt/PaymentConfirm.vue';
import PaymentComplete from '../view/paymennt/PayComplete.vue';
import Payment from '../view/paymennt/Payment.vue';
import PaymentOrder from '../view/paymennt/PaymentOrder.vue';

// import Hello from '../components/Hello.vue';

import NewRegister from '../view/user/NewRegister.vue';

import FootballBetting from '../view/betting/FootballBetting.vue';
import BasketballBetting from '../view/betting/BasketballBetting.vue';
import SportsConfirm from '../view/betting/SportsConfirm.vue';
import SportsOptimize from '../view/betting/SportsOptimize.vue';
import FootballInformation from '../view/information/FootballInformation.vue';
import BasketballInformation from '../view/information/BasketballInformation.vue';

import Home from '../view/home/Home.vue';
import More from '../view/home/More.vue';
import SYXWBetting from '../view/betting/SYXWBetting.vue';
import SSQBetting from '../view/betting/SSQBetting.vue';
import K3Betting from '../view/betting/K3Betting.vue';
import FC3DBetting from '../view/betting/FC3DBetting.vue';
import SFCBetting from '../view/betting/SFCBetting.vue';
import DigitalConfirm from '../view/betting/DigitalConfirm.vue';
import SFCConfirm from '../view/betting/SFCConfirm.vue';
import WebPage from '../view/WebPage.vue';

import PromotionElevenPickFive from '../view/promotion/ElevenPickFive.vue';
import PromotionTest from '../view/promotion/Test.vue';

import PrizeList from '../view/prize/List.vue';
import PrizeDetail from '../view/prize/Detail.vue';
import PrizeSportsDetail from '../view/prize/SportsDetail.vue';
import { pageJump, user } from '../common/store';
// 比分模块st
import Score from '../view/score/score.vue'
// 比分模块end

Vue.use(Router)
const ScoreRouter = [
  {
    path: '/Score',
    name: 'Score',
    component: Score
  }
]// 新增比分模块

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/more',
      name: 'More',
      component: More
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    }, {
      path: '/forgot_password',
      name: 'ForgotPassword',
      component: ForgotPassword
    }, {
      path: '/user_info',
      name: 'UserInfo',
      component: UserInfo
    }, {
      path: '/id_card',
      name: 'IDCard',
      component: IDCard
    }, {
      path: '/bank_card',
      name: 'BankCard',
      component: BankCard
    }, {
      path: '/cash',
      name: 'Cash',
      component: Cash
    }, {
      path: '/cash_detail',
      name: 'CashDetail',
      component: CashDetail
    }, {
      path: '/mine',
      name: 'Mine',
      component: Mine,
      meta: {requireAuth: true}
    }, {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      meta: {requireAuth: true}
    }, {
      path: '/orders/:id',
      name: 'OrderDetail',
      component: OrderDetail,
      meta: {requireAuth: true}
    }, {
      path: '/orders/:id/scheme',
      name: 'OrderScheme',
      component: OrderDetailScheme,
      meta: {requireAuth: true}
    }, {
      path: '/scheme/football',
      name: 'Football',
      component: Football
    }, {
      path: '/scheme/football/confirm',
      name: 'FootballConfirm',
      component: FootballConfirm
    }, {
      path: '/payment/confirm',
      name: 'PaymentConfirm',
      component: PaymentConfirm,
      meta: {requireAuth: true}
    }, {
      path: '/payment/order',
      name: 'PaymentOrder',
      component: PaymentOrder,
      meta: {requireAuth: true}
    }, {
      path: '/payment/complete',
      name: 'PaymentComplete',
      component: PaymentComplete,
      meta: {requireAuth: true}
    }, {
      path: '/payment',
      name: 'Payment',
      component: Payment,
      beforeEnter (to, from, next) {
        from.name && pageJump.fromSet('Payment', from);
        next();
      }
    }, {
      path: '/information/football/:id',
      name: 'FootballInformation',
      component: FootballInformation
    }, {
      path: '/information/basketball/:id',
      name: 'BasketballInformation',
      component: BasketballInformation
    }, {
      path: '/xincai_register',
      name: 'NewRegister',
      component: NewRegister,
      meta: {title: '新彩票'}
    }, {
      path: '/betting/football',
      name: 'FootballBetting',
      component: FootballBetting
    }, {
      path: '/betting/basketball',
      name: 'BasketballBetting',
      component: BasketballBetting
    }, {
      path: '/betting/syxw/:id',
      name: 'SYXWBetting',
      component: SYXWBetting
    }, {
      path: '/betting/k3/:id',
      name: 'K3Betting',
      component: K3Betting
    }, {
      path: '/betting/sfc/:id',
      name: 'SFCBetting',
      component: SFCBetting
    }, {
      path: '/betting/fc3d/:id',
      name: 'FC3DBetting',
      component: FC3DBetting
    }, {
      path: '/betting/confirm',
      name: 'DigitalConfirm',
      component: DigitalConfirm
    }, {
      path: '/betting/sports_confirm',
      name: 'SportsConfirm',
      component: SportsConfirm
    }, {
      path: '/betting/sfc_confirm',
      name: 'SFCConfirm',
      component: SFCConfirm
    }, {
      path: '/betting/sports_optimize',
      name: 'SportsOptimize',
      component: SportsOptimize
    }, {
      path: '/betting/digital/:id',
      name: 'SSQBetting',
      component: SSQBetting
    }, {
      path: '/web',
      name: 'WebPage',
      component: WebPage
    }, {
      path: '/prize/list',
      name: 'PrizeList',
      component: PrizeList
    }, {
      path: '/prize/detail/:lottery',
      name: 'PrizeDetail',
      component: PrizeDetail
    }, {
      path: '/prize/sports_detail/:lottery',
      name: 'PrizeSportsDetail',
      component: PrizeSportsDetail
    }, {
      path: '/promotion/elevenPickFive',
      name: 'PromotionElevenPickFive',
      component: PromotionElevenPickFive
    }, {
      path: '/promotion/test',
      name: 'PromotionTest',
      component: PromotionTest
    }, ...ScoreRouter
  ]
});

// 全局导航钩子
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = '老虎彩票';
  }
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    if (user.getToken()) {
      next();
    } else {
      next({path: '/login', query: {redirect: to.fullPath}})
      // 将跳转的路由path作为参数，登录成功后跳转到该路由
    }
  } else {
    next();
  }
});

export default router;
