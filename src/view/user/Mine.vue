<template>
  <div class="mine">
    <v-head title="个人中心" :hide-back="true"></v-head>
    <div class="mine-top">
      <img class="portrait" v-avatar="this.mine.avatar" alt="">
      <div class="username">{{mine.username}}</div>
      <div class="vip">
        <img v-vip="vipIconUrl" alt="">
      </div>
    </div>
    <div class="info row text-center bg-white">
      <div class="col border-right">
        <p class="money">{{mine.balance | currency}}</p>
        <p class="text-sm text-light">余额</p>
      </div>
      <div class="col border-right">
        <p class="red-pack">{{mine.coupon_balance | currency}}</p>
        <p class="text-sm text-light">红包</p>
      </div>
      <div class="col">
        <p class="points">{{mine.points}}</p>
        <p class="text-sm text-light">积分</p>
      </div>
    </div>
    <router-link to="payment" tag="div" class="item border-top">
      <span class="mine-recharge-icon icon"></span>
      <span>充值</span>
      <span class="arrow-right"></span>
    </router-link>
    <router-link to="cash" tag="div" class="item border-top">
      <span class="mine-cash-icon icon"></span>
      <span>提现</span>
      <span class="arrow-right"></span>
    </router-link>
    <router-link tag="div" to="orders" class="item margin-top-10">
      <span class="mine-order-icon icon"></span>
      <span>我的订单</span>
      <span class="arrow-right"></span>
    </router-link>
    <router-link tag="div" to="user_info" class="item border-top">
      <span class="mine-info-icon icon"></span>
      <span>个人信息</span>
      <span class="arrow-right"></span>
    </router-link>

    <div class="logout-panel">
      <a href="javascript:;" @click="logout" class="btn btn-out-line">退出登录</a>
    </div>
    <!--<download-panel></download-panel>-->
    <v-dialog v-show="dialogShow" @close="onCloseDialog">
      <p class="text-md">体验完整功能</p>
      <p class="text-md margin-top-5">请下载安装老虎彩票官方APP</p>
      <div class="padding margin-top-10">
        <a target="_self" href="http://a.app.qq.com/o/simple.jsp?pkgname=co.sihe.tigerlottery" class="btn">立即下载</a>
      </div>
    </v-dialog>
    <bottom-nav active="Mine"></bottom-nav>
  </div>
</template>

<script>
  import VHead from '../../components/VHead.vue';
  import BottomNav from '../../components/BottomNav.vue';
  import DownloadPanel from '../../components/DownloadPanel.vue';
  import VDialog from '../../components/VDialog.vue';
  import { mapActions, mapState } from 'vuex';
  import { MINE_INFO, LOGOUT } from '../../store/user/types';

  export default {
    name: 'mine',
    data: () => {
      return {
        dialogShow: false
      }
    },
    computed: {
      ...mapState({
        mine: state => state.user.mine
      }),
      vipIconUrl () {
        // 但经验值最大时不会升了
        return this.mine.user_exp >= this.mine.next_level_exp ? this.mine.next_level_img : this.mine.user_level_img;
      }
    },
    methods: {
      onShowDialog () {
        this.dialogShow = true;
      },
      onCloseDialog () {
        this.dialogShow = false;
      },
      ...mapActions({
        getMineInfo: MINE_INFO,
        logout: LOGOUT
      })
    },
    components: { VHead, DownloadPanel, VDialog, BottomNav },
    created () {
      this.getMineInfo();
    }
  }
</script>

<style>
  .mine {
    position: relative; height: 100%;
  }
  .mine .mine-top {
    background: linear-gradient(to bottom, #e6403f, #ee7736);
    padding: 15px 10px 15px 70px;
    min-height: 80px;
    position: relative;
  }
  .mine .mine-top .portrait {
    width: 50px; height: 50px;
    position: absolute;
    left: 10px;
    border-radius: 50px;
  }
  .mine .mine-top .username {
    font-size: 17px; color: white;
    line-height: 30px;
  }
  .mine .mine-top .vip span{
    display: inline-block;
  }
  .mine .item {
    padding: 10px 10px 10px 40px;
    background: white;
    position: relative;
  }
  .mine .item .icon {
    position: absolute;
    left: 12px;
  }
  .mine .item .arrow-right {
    position: absolute;
    right: 10px; top: 15px;
  }
  .mine .item.border-top {
    border-top: 1px solid #ddd;
  }
  .mine .info .red-pack {
    color: #fc942c;
  }
  .mine .info .money {
    color: #e83f3f;
  }
  .mine .info .points {
    color: #5eb935;
  }
  .mine .info .border-right {
    border-right: 1px solid #ddd;
  }
  .mine .info .col {
    padding: 10px 0;
  }
  .mine .logout-panel {
    position: absolute;
    padding: 0 10px;
    width: 100%;
    bottom: 60px;
  }
  .mine .logout-panel .btn {
    border: 1px solid #e73f40;
    background: #f2f2f2;
  }
  .mine .vip img {
    width: 20px; height: 20px;
  }
</style>
