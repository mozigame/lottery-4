<template>
  <div class="prize-detail" v-infinite-scroll="listMore"
       infinite-scroll-disabled="detail.loading"
       infinite-scroll-distance="10"
       infinite-scroll-immediate-check="false">
    <v-head :title="title"></v-head>
    <template v-for="(item, index) in detail.list">
      <digital-list-item :data="item">
        <template v-if="isK3()">
          <div slot="number" v-if="index === 0">
            <span class="k3-item" v-for="ball in item.balls[0]" :class="'k3-' + ball + '-icon'"></span>
            <span class="k3-item-hz">和值：{{k3Hz(item.balls[0])}}</span>
          </div>
          <div slot="number" v-else>
            <span class="red-ball" v-for="ballRed in item.balls[0]">{{ballRed}}</span>
          </div>
        </template>
        <template v-else-if="isSFC()">
          <div slot="number">
            <span class="sfc-item"
                  :class="{'bg-white': index > 0}"
                  v-for="ball in item.balls[0]">{{ball}}</span>
          </div>
        </template>
        <template v-else>
          <div slot="number">
            <span class="red-ball" :class="{'bg-red-ball': index===0}" v-for="ballRed in item.balls[0]">{{ballRed}}</span>
            <span class="blue-ball" :class="{'bg-blue-ball':  index===0}" v-for="ballBlue in item.balls[1]">{{ballBlue}}</span>
          </div>
        </template>
        <div slot="data">
          <div class="winnings-table">
            <div class="row" v-if="item.lottery_id !== 20">
              <div class="col padding-top-0">
                <span>本期销售</span>
                <p class="text-primary text-ml">{{(item.issue_sell_amount || 0) | currency}}</p>
              </div>
              <div class="col padding-top-0">
                <span>奖池奖金</span>
                <p class="text-primary text-ml">{{(item.winnings_pool || 0) | currency}}</p>
              </div>
            </div>
            <div class="row" v-else-if="item.lottery_id === 20">
              <div class="col padding-top-0">
                <span>14场销量</span>
                <p class="text-primary text-ml">{{(item.fourteen_sales || 0) | currency}}</p>
              </div>
              <div class="col padding-top-0">
                <span>任九销量</span>
                <p class="text-primary text-ml">{{(item.nine_sales || 0) | currency}}</p>
              </div>
            </div>
            <template v-if="item.winnings">
              <div class="row gray">
                <div class="col"><span>奖项</span></div>
                <div class="col"><span>中奖注数</span></div>
                <div class="col"><span>单注奖金</span></div>
              </div>
              <div class="row">
                <div class="col"><span>一等奖</span></div>
                <div class="col col-center"><span>{{item.winnings.first_prize_count}}</span></div>
                <div class="col col-center"><span>{{item.winnings.first_prize_bonus}}</span></div>
              </div>
              <div class="row gray">
                <div class="col"><span>二等奖</span></div>
                <div class="col col-center"><span>{{item.winnings.second_prize_count}}</span></div>
                <div class="col col-center"><span>{{item.winnings.second_prize_bonus}}</span></div>
              </div>
            </template>
            <template v-else-if="item.lottery_id === 20">
              <div class="row gray">
                <div class="col"><span>奖项</span></div>
                <div class="col"><span>中奖注数</span></div>
                <div class="col"><span>单注奖金</span></div>
              </div>
              <div class="row" v-for="win in item.fourteen_ranking">
                <div class="col"><span>{{win.winnings_category}}</span></div>
                <div class="col col-center"><span>{{win.winnings_stake_count}}</span></div>
                <div class="col col-center"><span>{{win.per_winnings_bonus}}</span></div>
              </div>
              <div class="row" v-for="win in item.nine_ranking">
                <div class="col"><span>{{win.winnings_category}}</span></div>
                <div class="col col-center"><span>{{win.winnings_stake_count}}</span></div>
                <div class="col col-center"><span>{{win.per_winnings_bonus}}</span></div>
              </div>
            </template>
          </div>
        </div>
      </digital-list-item>
    </template>
    <infinite-scroll-loading :show="detail.loading"></infinite-scroll-loading>
    <div class="bottom-fixed">
      <a href="javascript:;" @click="goBetting" class="btn" v-if="status">{{title}}投注</a>
      <a href="javascript:;" class="btn disabled" v-else>暂停销售</a>
    </div>
  </div>
</template>

<script>
  import VHead from '../../components/VHead.vue';
  import DigitalListItem from './child/DigitalListItem.vue';
  import {GET_PRIZE_DETAIL_LIST, PRIZE_DETAIL_LIST_MORE} from '../../store/prize/types';
  import InfiniteScrollLoading from '../../components/InfiniteScrollLoading.vue';
  import Lottery from '../../model/common/Lottery';

  export default {
    name: 'prizeDetail',
    computed: {
      detail () {
        return this.$store.state.prize.detail;
      },
      title () {
        return this.detail.list[0] && this.detail.list[0].lottery_name
      },
      status () {
        return parseInt(this.detail.list[0] && this.detail.list[0].status) === 1;
      }
    },
    methods: {
      listMore () {
        this.$store.dispatch(PRIZE_DETAIL_LIST_MORE);
      },
      goBetting () {
        if (this.detail.list[0]) {
          this.$router.push({
            name: Lottery.getComponent(this.detail.list[0].lottery_id),
            params: {id: this.detail.list[0].lottery_id}
          })
        }
      },
      isK3 () {
        return Lottery.isK3(this.detail.list[0].lottery_id);
      },
      k3Hz (ball) {
        return ball.reduce((a, b) => {
          return parseInt(a) + parseInt(b);
        })
      },
      isSFC () {
        return Lottery.isSFCOrRXJ(this.detail.list[0].lottery_id);
      }
    },
    created () {
      const lotteryId = this.$router.currentRoute.params.lottery;
      if (lotteryId) {
        this.$store.dispatch(GET_PRIZE_DETAIL_LIST, lotteryId);
      } else {
        this.$router.back();
      }
    },
    components: {VHead, DigitalListItem, InfiniteScrollLoading}
  }
</script>

<style>
  .prize-detail {
    height: 100%;
    overflow-y: auto;
    padding-bottom: 60px;
  }
  .prize-detail .bottom-fixed {
    position: fixed;
    width: 100%;
    height: 52px;
    left: 0; bottom: 0;
    background: white;
    padding: 8px 10px;
    border-top: 1px solid #ddd;
  }
  .prize-detail .bottom-fixed .btn {
    height: 35px; line-height: 35px;
  }
  .prize-detail .k3-item {
    display: inline-block; margin-right: 10px;
  }
  .prize-detail .k3-item-hz {
    vertical-align: top; margin-top: 5px;
    color: #333333;
  }
  .prize-detail .sfc-item {
    padding: 5px;
    background: #4faf50;
    color: white;
    margin-right: 5px;
    font-size: 12px;
  }
  .prize-detail .sfc-item.bg-white {
    background: white;
    color: #333;
  }
</style>
