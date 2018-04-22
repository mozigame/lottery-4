<template>
  <div class="order-detail">

    <div class="head">
      <span class="back-icon" @click="goOrders"></span>
      <div>投注详情</div>
      <span class="right">
        <slot name="right"></slot>
      </span>
    </div>
    <!--<v-head title="投注详情"></v-head>-->

    <div class="top" v-cloak>
      <img :src="detail.lottery_image">
      <div class="text-md">
        {{detail.lottery_name}}
        <span class="text-sm text-muted" v-if="detail.issueNoShow">{{`第${detail.issue_no}期`}}</span>
      </div>
      <div class="text-sm margin-top-5">
        <span class="text-light">投注金额: <span class="text-default">{{detail.total_amount | currency}}</span></span>
        <span class="text-light" v-if="detail.failure_amount > 0">出票失败: <span class="text-default">{{detail.failure_amount | currency}}</span></span>
      </div>
      <div class="text-sm margin-top-5">
        <span class="text-light">中奖金额: <span class="text-primary">{{detail.winnings_bonus}}</span></span>
        <span class="text-light" v-if="detail.plus_award_amount > 0">加奖金额: <span class="text-primary">{{detail.plus_award_amount}}</span></span>
      </div>
      <span :class="detail.statusIcon">{{detail.statusIconText}}</span>
    </div>
    <div class="margin-top-10 padding text-sm bg-white">
      订单状态： <span class="text-primary">{{detail.statusText}}</span>
    </div>
    <!--竞彩-->
    <div class="margin-top-10" v-if="detail.jc_info">
      <div class="padding bg-white text-default text-xn">{{detail.contextTitle}}</div>
      <order-table :list="detail.jc_info"></order-table>
      <div class="padding text-light bg-white text-sm">
        <p>投注时间：{{detail.buying_time | dateFormat('yyyy-MM-dd hh:mm:ss')}}</p>
        <p class="margin-top-5">方案编号：{{detail.sku}}</p>
      </div>
    </div>
    <!--数字彩-->
    <div class="margin-top-10" v-if="detail.tickets">
      <div class="padding bg-white">
        <p class="text-normal follow-times" v-if="detail.follow_times">
          追号订单，当前第<span class="text-primary">{{detail.current_follow_times}}/{{detail.follow_times}}</span>期
        </p>
        <p class="text-normal" style="line-height: 34px" v-if="detail.prizeResult" >
          开奖号码：
          <template v-if="isK3(detail.lottery_id)">
            <span class="k3-item" v-for="ball in detail.prizeResult[0]" :class="'k3-' + ball + '-icon'"></span>
            <span class="k3-item-hz">和值：{{k3Hz(detail.prizeResult[0])}}</span>
          </template>
          <template v-else>
            <span class="bg-red-ball margin-right-3" v-for="item in detail.prizeResult[0]">{{item}}</span>
            <span class="bg-blue-ball margin-right-3" v-for="item in detail.prizeResult[1]">{{item}}</span>
          </template>
        </p>
        <p v-else class="text-normal">
          开奖号码：等待开奖中
        </p>
        <p class="text-normal margin-top-5">投注内容：<span class="text-muted">{{detail.stackCount}}注,{{detail.multiple}}倍</span></p>
        <p class="text-normal margin-top-5" v-for="item in detail.tickets">{{item.playTypeText}}：
          <!--十一选五-->
          <span class="text-muted" v-if="item.lotteryType == 'syxw' || item.lotteryType == 'fc3d'">
            <span v-for="(r, k) in item.result">
              <span v-if="k > 0">|</span>
              <template v-if="r.pre">
                <span>(</span>
                <span :class="{'margin-left-3': t > 0, 'text-primary': p.checked}" v-for="(p, t) in r.pre">{{p.text}}</span>
                <span>)</span>
              </template>
              <span v-for="i in r.next" class="margin-right-3" :class="{'text-primary': i.checked}">{{i.text}}</span>
            </span>
          </span>
          <!--双色球和大乐透-->
          <span v-else class="text-muted">
            <span v-for="(r, k) in item.result">
              <span v-if="k > 0">:</span>
              <span v-if="r.pre">
                <span>(</span>
                <span :class="{'margin-left-3': t > 0, 'text-primary': p.checked}" v-for="(p, t) in r.pre">{{p.text}}</span>
                <span>)</span>
              </span>
              <span v-for="i in r.next" class="margin-right-3" :class="{'text-primary': i.checked}">{{i.text}}</span>
            </span>
          </span>
        </p>
      </div>
      <div class="padding text-light bg-white text-sm margin-top-10">
        <p>投注时间：{{detail.buying_time | dateFormat('yyyy-MM-dd hh:mm:ss')}}</p>
        <p class="margin-top-5">方案编号：{{detail.sku}}</p>
      </div>
    </div>
    <router-link to="scheme" tag="div" append class="padding relative bg-white margin-top-10">
      <span cspas="text-normal text-default">方案明细</span>
      <span class="arrow-right"></span>
    </router-link>
    <div class="bottom-logo margin-top-20 text-center">
      <img src="../../assets/bottom_logo.png" alt="">
    </div>
  </div>
</template>

<script>
//  import VHead from '../../components/VHead.vue';
  import OrderTable from '../../components/OrderTable';
  import { ORDER_DETAIL_REQUEST } from '../../store/user/types';
  import { mapActions, mapState } from 'vuex';
  import Lottery from '../../model/common/Lottery';

  export default {
    name: 'orderDetail',
    computed: {
      ...mapState({
        detail: state => state.user.orders.detail
      })
    },
    methods: {
      ...mapActions({
        getOrderDetail: ORDER_DETAIL_REQUEST
      }),
      isK3 (id) {
        return Lottery.isK3(id);
      },
      k3Hz (ball) {
        return ball.reduce((a, b) => {
          return parseInt(a) + parseInt(b);
        })
      },
      goOrders () {
        this.$router.push({ name: 'Orders', query: {} });
      }
    },
    created () {
      this.getOrderDetail(this.$route.params.id);
    },
    components: {
      OrderTable
    }
  }
</script>

<style>
  .order-detail .top{
    background: url("../../assets/icon/order_top_bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 20px 10px 20px 75px;
    position: relative;
  }
  .order-detail .top img {
    position: absolute;
    left: 10px; top: 23px;
    width: 55px; height: 55px;
  }
  .order-detail .win-icon,
  .order-detail .no-win-icon,
  .order-detail .refund-icon {
    position: absolute;
    right: 0; top: 35px;
  }
  .order-detail .refund-icon {
    top: 20px;
  }
  .order-detail .prize-time-icon {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .order-detail .arrow-right {
    position: absolute;
    right: 10px;
    top: 15px;
  }
  .order-detail .bottom-logo img{
    width: 100px;
  }
  .order-detail .follow-times {
    padding-left: 10px;
    padding-bottom: 10px;
  }
  .order-detail .k3-item {
    display: inline-block; margin-right: 10px; vertical-align: middle;
  }
  .order-detail .k3-item-hz {
    vertical-align: top; margin-top: 5px;
    color: #333333;
  }
  .margin-right-3 {
    margin-right: 3px;
  }
  .margin-left-3 {
    margin-left: 5px;
  }
</style>
