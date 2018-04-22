<template>
  <div class="basketball-betting">
    <sport-lottery-header :playTypeGroup="playTypeGroup"> </sport-lottery-header>
    <sport-lottery-container></sport-lottery-container>
  </div>
</template>

<script>
  import SportLotteryHeader from './child/LotteryHeader.vue';
  import SportLotteryContainer from './child/SportLotteryContainer.vue';
  import {CURRENT_SPORT_PLAY_TYPE_SELECT} from '../../store/betting/types';
  import Lottery from '../../model/common/Lottery';

  const BasketballLotteryIdList = [
    {id: 701, value: '胜负'},
    {id: 702, value: '让分胜负'},
    {id: 703, value: '胜分差'},
    {id: 704, value: '大小分'},
    {id: 705, value: '混合过关'}
  ];

  export default {
    name: 'footballBetting',
    data () {
      return {
        playTypeGroup: [{name: '', list: BasketballLotteryIdList}]
      }
    },
    created () {
      if (!Lottery.isBasketBall(this.$store.state.betting.lottery)) {
        this.$store.dispatch(CURRENT_SPORT_PLAY_TYPE_SELECT, BasketballLotteryIdList[0]);
      }
    },
    components: { SportLotteryHeader, SportLotteryContainer }
  }
</script>
