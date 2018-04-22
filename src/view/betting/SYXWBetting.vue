<template>
  <div class="syxw-betting">
    <lottery-header :playTypeGroup="playTypeGroup"></lottery-header>
    <lottery-container :topTip="topTip">
      <template v-for="(group, index) in panelBallGroups">
        <p class="group-title" v-show="group.title">{{group.title}}</p>
        <div class="row">
          <div class="col col-20">
            <span class="side-title">{{group.name}}</span>
          </div>
          <div class="col">
          <span class="play-ball-white"
                :class="{active: item.selected}"
                v-for="item in group.list"
                @click="ballChanged(item, index)">
                {{item.id}}
          </span>
          </div>
        </div>
        <template v-if="index < panelBallGroups.length - 1">
          <hr>
        </template>
      </template>
    </lottery-container>
  </div>
</template>

<script>
  import LotteryHeader from './child/LotteryHeader.vue';
  import LotteryContainer from './child/DigitalLotteryContainer.vue';
  import { SET_CURRENT_LOTTERY, GET_CURRENT_LOTTERY, RECOMMEND_ISSUE_SET,
    CURRENT_PLAY_TYPE_SELECT } from '../../store/betting/types';
  import Lottery from '../../model/common/Lottery';
  import { recommendIssue } from '../../common/store';

  export default {
    name: 'xyxwBetting',
    data () {
      return {
        LOTTERY_ID: 0
      }
    },
    computed: {
      playTypeGroup () {
        return this.$store.state.betting.currentLottery.playTypeGroup || [];
      },
      lotteryObj () {
        return this.$store.state.betting[this.LOTTERY_ID];
      },
      topTip () {
        return this.$store.state.betting.currentLottery &&
          this.$store.state.betting.currentLottery.betTip;
      },
      panelBallGroups () {
        return (this.lotteryObj.initBettingPanelBallGroups && this.lotteryObj.initBettingPanelBallGroups()) || [];
      }
    },
    methods: {
      ballChanged (item, index) {
        this.lotteryObj.onBallChanged(item, index);
      }
    },
    created () {
      this.LOTTERY_ID = parseInt(this.$router.currentRoute.params.id);
      this.$store.commit(SET_CURRENT_LOTTERY, this.LOTTERY_ID);
      if (Lottery.isSYXW(this.LOTTERY_ID)) {
        this.$store.dispatch(GET_CURRENT_LOTTERY).then(() => {
          let issue = recommendIssue.get();
          if (issue) {
            issue.playType && this.$store.commit(CURRENT_PLAY_TYPE_SELECT, issue.playType);
            this.$store.commit(RECOMMEND_ISSUE_SET, issue);
            recommendIssue.clear();
          } else {
            if ((!this.$store.state.betting[this.LOTTERY_ID].playType)) {
              this.$store.commit(CURRENT_PLAY_TYPE_SELECT, this.$store.state.betting.currentLottery.playTypeGroup[0].list[0]);
            }
          }
        });
      }
    },
    components: {LotteryHeader, LotteryContainer}
  }
</script>

<style>
  .syxw-betting {
    color: #333333;
  }
</style>
