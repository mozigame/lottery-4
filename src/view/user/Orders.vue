<template>
  <div class="orders">
    <v-head title="我的投注" :hide-back="true"></v-head>
    <nav class="row text-center bg-white text-sm">
      <div class="col col-25" :class="{active: orders.status === 0}" @click="changeStatus(0)"><span>全部</span></div>
      <div class="col col-25" :class="{active: orders.status === -1}" @click="changeStatus(-1)"><span>待开奖</span></div>
      <div class="col col-25" :class="{active: orders.status === 1}" @click="changeStatus(1)"><span>中奖</span></div>
      <div class="col col-25" :class="{active: orders.status === -2}" @click="changeStatus(-2)"><span>未中奖</span></div>
    </nav>
    <div class="list" v-if="orders.list && orders.list.length > 0" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="orders.loading"
         infinite-scroll-distance="10"
         infinite-scroll-immediate-check="false">
      <div class="item item-avatar item-right-icon" v-for="item in orders.list" @click="goOrderDetail(item)">
        <img :src="item.lottery_image" alt="ball">
        <div class="main">
          <span>{{item.lottery_name}}</span>
          <span class="text-primary margin-left-15" v-if="item.plus_award_amount > 0">加奖 {{item.plus_award_amount | currency}}</span>
          <span class="pull-right active" v-if="item.winnings_bonus > 0">中奖 {{item.winnings_bonus | currency}}</span>
          <span class="pull-right text-light" v-else>{{item.statusText}}</span>
        </div>
        <div class="desc">
          <span>{{item.buying_time | dateFormat('yyyy-MM-dd hh:mm:ss')}}</span>
          <span class="pull-right">{{item.type===0?'自投':'追号'}}：{{item.total_amount | currency}}</span>
        </div>
        <span class="arrow-right"></span>
      </div>
      <infinite-scroll-loading :show="orders.loading"></infinite-scroll-loading>
    </div>
    <div v-else-if="orders.list && orders.list.length === 0">
      <no-order></no-order>
    </div>
    <bottom-nav active="Orders"></bottom-nav>
  </div>
</template>

<script>
  import VHead from '../../components/VHead';
  import BottomNav from '../../components/BottomNav.vue';
  import NoOrder from '../../components/NoOrders';
  import { GET_ORDERS_LIST, ORDERS_LIST_MORE_REQUEST } from '../../store/user/types';
  import { mapState, mapActions } from 'vuex';
  import InfiniteScrollLoading from '../../components/InfiniteScrollLoading.vue';
  import Lottery from '../../model/common/Lottery';
  import Toast from '../../common/toast';

  export default {
    name: 'orders',
    methods: {
      goOrderDetail (order) {
        const id = order.lottery_id;
        if (Lottery.isFootBall(id) || Lottery.isBasketBall(id) || Lottery.isSYXW(id) ||
          Lottery.isDLT(id) || Lottery.isSSQ(id) || Lottery.isSFCOrRXJ(id) || Lottery.isK3(id) ||
          Lottery.isFC3D(id)) {
          this.$router.push({
            name: 'OrderDetail',
            params: { id: order.id }
          })
        } else {
          Toast('该功能暂未开发!');
        }
      },
      changeStatus (status) {
        if (status !== this.orders.status) {
          this.getOrdersList(status)
        }
      },
      loadMore () {
        this.getLoadMore(this.orders.status);
      },
      ...mapActions({
        getOrdersList: GET_ORDERS_LIST,
        getLoadMore: ORDERS_LIST_MORE_REQUEST
      })
    },
    computed: mapState({
      orders: state => state.user.orders
    }),
    components: { VHead, NoOrder, InfiniteScrollLoading, BottomNav },
    created () {
      this.getOrdersList(this.orders.status);
    }
  }
</script>

<style>
  @import "../../style/main.css";
  .orders nav .col{
    height: 37px;
    line-height: 35px;
    border-bottom: 2px solid #dddddd;
    color: #666666;
  }
  .orders .margin-left-15 {
    margin-left: 15px;
  }
  .orders nav .col.active {
    color: #e73f40;
    border-color: #e73f40;
  }
  .orders .list {
    padding-bottom: 50px;
  }
  .orders .list .item {
    padding: 10px;
    position: relative;
    background: white;
    border-bottom: 1px solid #dddddd;
    min-height: 60px;
  }
  .orders .list .item.item-avatar {
    padding-left: 60px;
  }
  .orders .list .item.item-avatar img {
    position: absolute;
    left: 10px; top: 10px;
    width: 40px; height: 40px;
  }
  .orders .list .item.item-right-icon {
    padding-right: 30px;
  }
  .orders .list .item.item-right-icon .arrow-right {
    position: absolute;
    right: 10px; top: 24px;
  }
  .orders .list .item .main {
    color: #333333;
    font-size: 13px;
    height: 25px;
    line-height: 25px;
  }
  .orders .list .item .main .active {
    color: #e73f40;
  }
  .orders .list .item .desc {
    color: #999999;
    font-size: 10px;
  }
  .orders .no-order {
    margin-top: 100px;
  }
</style>
