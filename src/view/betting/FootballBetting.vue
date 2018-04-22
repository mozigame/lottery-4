<template>
  <div class="football-betting">
    <sport-lottery-header :playTypeGroup="playTypeGroup">
    </sport-lottery-header>
    <sport-lottery-container></sport-lottery-container>
  </div>
</template>

<script>
  import SportLotteryHeader from './child/LotteryHeader.vue';
  import SportLotteryContainer from './child/SportLotteryContainer.vue';
  import {CURRENT_SPORT_PLAY_TYPE_SELECT} from '../../store/betting/types';
  import Lottery from '../../model/common/Lottery';

  const FootballLotteryIdList = [
    {id: 601, value: '胜平负'},
    {id: 602, value: '让球胜平负'},
    {id: 603, value: '比分'},
    {id: 604, value: '总进球'},
    {id: 605, value: '半全场'},
    {id: 606, value: '混合投注'}
  ];

  export default {
    name: 'footballBetting',
    data () {
      return {
        playTypeGroup: [{name: '', list: FootballLotteryIdList}]
      }
    },
    created () {
      if (!Lottery.isFootBall(this.$store.state.betting.lottery)) {
        this.$store.dispatch(CURRENT_SPORT_PLAY_TYPE_SELECT, FootballLotteryIdList[0]);
      }
    },
    components: { SportLotteryHeader, SportLotteryContainer }
  }
</script>
