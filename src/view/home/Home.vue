<template>
  <div class="home padding-bottom-50">
    <mt-swipe :auto="4000" v-show="home.banners.length > 0">
      <mt-swipe-item :key="key" v-for="(banner, key) in home.banners">
        <img class="banner" :src="banner.image" alt="banner" @click="goBannerUrl(banner)">
      </mt-swipe-item>
    </mt-swipe>
    <div class="container">
      <div class="recommend-box">
        <recommend-lottery :issue="home.issue" @refresh="refresh"></recommend-lottery>
      </div>
      <div class="lottery-box" v-if="lotteries.length > 0">
        <template v-for="(lottery, index) in lotteries">
          <lottery-item :lottery="lottery"></lottery-item>
          <template v-if="(index+1)%3 === 0"><hr></template>
        </template>
        <lottery-item :lottery="moreLottery"></lottery-item>
      </div>
      <div class="information-list">
        <information-item :key="key" :information="item" v-for="(item, key) in home.information"></information-item>
      </div>
    </div>
    <bottom-nav active="Home"></bottom-nav>
  </div>
</template>

<script>
  import BottomNav from '../../components/BottomNav.vue';
  import LotteryItem from '../../components/HomeLotteryItem.vue';
  import InformationItem from '../../components/HomeInformationItem.vue';
  import RecommendLottery from '../../components/HomeRecommendLottery.vue';
  import { Swipe, SwipeItem } from 'mint-ui';
  import Vue from 'vue';
  import { mapActions } from 'vuex';
  import Lottery from '../../model/common/Lottery';
  import { GET_BANNER, GET_LOTTERY_LIST, GET_INFORMATION_LIST,
    GET_RECOMMEND_ISSUE, RECOMMEND_ISSUE_REFRESH } from '../../store/home/types';

  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);

  export default {
    name: 'home',
    data () {
      return {
        moreLottery: {
          component: 'More',
          tipText: '发现更多彩种',
          lottery_image: 'http://tclottery.oss-cn-hangzhou.aliyuncs.com/tigerH5App/img/more.png',
          lottery_name: '更多'
        }
      }
    },
    computed: {
      home () {
        return this.$store.state.home;
      },
      lotteries () {
        return this.home.lotteries.filter(value => {
          return Lottery.isSYXW(value.lottery_id) || Lottery.isDLT(value.lottery_id) ||
            Lottery.isSSQ(value.lottery_id) || (value.lottery_id === 6) ||
            (value.lottery_id === 7) || (value.lottery_id === 5) ||
            Lottery.isFC3D(value.lottery_id) || Lottery.isSFCOrRXJ(value.lottery_id);
        });
      }
    },
    methods: {
      ...mapActions({
        getBanners: GET_BANNER,
        getLotteryList: GET_LOTTERY_LIST,
        getInformation: GET_INFORMATION_LIST,
        getRecommendIssue: GET_RECOMMEND_ISSUE,
        recommendIssueRefresh: RECOMMEND_ISSUE_REFRESH
      }),
      refresh () {
        this.recommendIssueRefresh();
      },
      goBannerUrl (banner) {
        location.href = banner.target;
      }
    },
    created () {
      this.getBanners();
      this.getLotteryList();
      this.getRecommendIssue();
      this.getInformation()
    },
    components: {BottomNav, Swipe, SwipeItem, LotteryItem, InformationItem, RecommendLottery}
  }
</script>

<style>
  .home .mint-swipe {
    height: 110px;
  }
  .home .mint-swipe .banner {
    width: 100%; height: 100%;
  }
  .home .mint-swipe-indicators {
    bottom: 5px;
  }
  .home .mint-swipe-indicator {
    background: white;
    opacity: 0.3;
  }
  .home .mint-swipe-indicator.is-active {
    opacity: 1;
  }
  .home .container {
    padding: 10px;
  }
  .home .container .lottery-box {
    border: 1px solid #dddddd;
    background: white;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 10px;
  }
  .home .container .lottery-box hr {
    border-top: 0;
    border-bottom: 1px solid #ddd;
  }
</style>
