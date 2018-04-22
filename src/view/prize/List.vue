<template>
  <div class="prize-list">
    <v-head title="开奖结果" hideBack="true"></v-head>
    <div class="prize-list-container">
      <template v-if="football">
        <div class="list-item" @click="goSportsDetail(football)">
          <div class="list-item-head">
            <span class="text-normal">{{football.lottery_name}}</span>
            <span class="text-light text-sm">比赛日:{{football.prize_time | dateFormat('yyyy-MM-dd')}}</span>
          </div>
          <div class="list-item-result margin-top-10">
            <div class="prize-box football">
              {{football.home}}({{football.let_point}})
              <span>{{football.prize_num}}</span>
              {{football.guest}}
            </div>
          </div>
        </div>
      </template>
      <template v-if="basketball">
        <div class="list-item" @click="goSportsDetail(basketball)">
          <div class="list-item-head">
            <span class="text-normal">{{basketball.lottery_name}}</span>
            <span class="text-light text-sm">比赛日:{{basketball.prize_time | dateFormat('yyyy-MM-dd')}}</span>
          </div>
          <div class="list-item-result margin-top-10">
            <div class="prize-box basketball">
              {{basketball.guest}}
              <span>{{basketball.prize_num}}</span>
              {{basketball.home}}
            </div>
          </div>
        </div>
      </template>
      <template v-for="item in list">
        <div class="list-item" @click="goDetail(item)" v-if="isDigital(item.lottery_id)">
          <div class="list-item-head">
            <span class="text-normal">{{item.lottery_name}}</span>
            <span class="text-light text-sm">第{{item.issue_no}}期</span>
            <span class="text-light text-sm">{{item.prize_time | dateFormat('MM-dd')}} ({{item.week}})</span>
          </div>
          <div class="list-item-result margin-top-10" v-if="isK3(item.lottery_id)">
            <span class="k3-item" v-for="ball in item.balls[0]" :class="'k3-' + ball + '-icon'"></span>
            <span class="k3-item-hz">和值：{{k3Hz(item.balls[0])}}</span>
          </div>
          <div class="list-item-result margin-top-10" v-else-if="isSFC(item.lottery_id)">
            <span class="sfc-item" v-for="ball in item.balls[0]">{{ball}}</span>
          </div>
          <div class="list-item-result margin-top-10" v-else>
            <span class="bg-red-ball" v-for="ballRed in item.balls[0]">{{ballRed}}</span>
            <span class="bg-blue-ball" v-for="ballBlue in item.balls[1]">{{ballBlue}}</span>
          </div>
        </div>
      </template>
    </div>
    <bottom-nav active="PrizeList"></bottom-nav>
  </div>
</template>

<script>
  import VHead from '../../components/VHead.vue';
  import BottomNav from '../../components/BottomNav.vue';
  import {GET_PRIZE_LIST} from '../../store/prize/types';
  import Lottery from '../../model/common/Lottery';
  export default {
    name: 'prizeList',
    methods: {
      goDetail (item) {
        this.$router.push({
          name: 'PrizeDetail', params: {lottery: item.lottery_id}
        })
      },
      goSportsDetail (item) {
        this.$router.push({
          name: 'PrizeSportsDetail', params: {lottery: item.lottery_id}
        });
      },
      isDigital (id) {
        return Lottery.isSYXW(id) || Lottery.isDLT(id) || Lottery.isSSQ(id) ||
          Lottery.isK3(id) || Lottery.isSFCOrRXJ(id) || Lottery.isFC3D(id)
      },
      isSFC (id) {
        return Lottery.isSFCOrRXJ(id);
      },
      isK3 (id) {
        return Lottery.isK3(id);
      },
      k3Hz (ball) {
        return ball.reduce((a, b) => {
          return parseInt(a) + parseInt(b);
        })
      }
    },
    computed: {
      list () {
        return this.$store.state.prize.list;
      },
      football () {
        return this.list.filter(value => Lottery.isFootBall(value.lottery_id))[0]
      },
      basketball () {
        return this.list.filter(value => Lottery.isBasketBall(value.lottery_id))[0]
      }
    },
    created () {
      this.$store.dispatch(GET_PRIZE_LIST);
    },
    components: {VHead, BottomNav}
  }
</script>

<style>
  .prize-list {
    padding-bottom: 60px;
  }
  .prize-list .list-item {
    padding: 5px 30px 10px 10px;
    position: relative;
    background: white url("../../assets/icon/arrow_right.png") 97% center no-repeat;
    background-size: 10px auto;
    border-bottom: 1px solid #ddd;
  }
  .prize-list .list-item .bg-red-ball,
  .prize-list .list-item .bg-blue-ball {
    width: 25px; height: 25px;
    line-height: 25px;
    margin-right: 5px;
  }
  .prize-list .prize-box {
    height: 35px; line-height: 35px;
    width: 80%; border-radius: 35px;
    position: relative;
    text-align: center;
    font-size: 14px; color: white;
  }
  .prize-list .prize-box span {
    font-weight: normal;
    padding: 0 10px;
  }
  .prize-list .prize-box.football {
    background: #65aa23 url("../../assets/ball.png") no-repeat left center;
    background-size: auto 90%;
  }
  .prize-list .prize-box.basketball {
    background: #f19b14 url("../../assets/basketball.png") no-repeat left center;
    background-size: auto 90%;
  }
  .prize-list .k3-item {
    display: inline-block; margin-right: 10px;
  }
  .prize-list .k3-item-hz {
    vertical-align: top; margin-top: 5px;
    color: #333333;
  }
  .prize-list .sfc-item {
    padding: 5px;
    background: #4faf50;
    color: white;
    margin-right: 5px;
    font-size: 12px;
  }
</style>
