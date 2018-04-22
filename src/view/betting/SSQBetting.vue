<template>
  <div class="ssq-betting">
    <lottery-header :playTypeGroup="playTypeGroup"></lottery-header>
    <lottery-container>
      <template v-for="(group, index) in panelBallGroups">
        <p class="group-title" v-show="group.title">{{group.title}}</p>
        <div class="group-ball-panel">
          <div class="group-ball-panel-item" v-for="item in group.list">
            <span class="play-ball-white"
              :class="{'play-ball-blue': group.color === 'blue',active: item.selected}"
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
  import { SET_CURRENT_LOTTERY, CURRENT_PLAY_TYPE_SELECT } from '../../store/betting/types';

  const playTypeGroup = [{
    list: [{id: 1, value: '普通投注'}, {id: 1, sure: true, value: '胆拖投注'}]
  }];
  export default {
    name: 'SSQBetting',
    data () {
      return {
        playTypeGroup: playTypeGroup
      }
    },
    computed: {
      lotteryObj () {
        return this.$store.state.betting[this.LOTTERY_ID];
      },
      panelBallGroups () {
        return this.lotteryObj.initBettingPanelBallGroups();
      }
    },
    methods: {
      ballChanged (item, index) {
        this.lotteryObj.onBallChanged(item, index);
      }
    },
    created () {
      this.LOTTERY_ID = this.$router.currentRoute.params.id;
      this.$store.commit(SET_CURRENT_LOTTERY, this.LOTTERY_ID);
      if (!this.$store.state.betting[this.LOTTERY_ID].playType) {
        this.$store.commit(CURRENT_PLAY_TYPE_SELECT, playTypeGroup[0].list[0]);
      }
    },
    components: {LotteryHeader, LotteryContainer}
  }
</script>

<style>
  .ssq-betting .group-ball-panel {
    padding: 5px; overflow: hidden;
  }
  .ssq-betting .group-ball-panel .group-ball-panel-item {
    width: 14.2%; float: left;
    text-align: center;
  }
  .ssq-betting .digital-lottery-container .top-tip .shake {
    bottom: 0;
  }
</style>
