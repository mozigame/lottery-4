<template>
  <div class="sfc-betting">
    <v-head :title="title">
      <span slot="right" class="question-icon" @click="goHelp"></span>
    </v-head>
    <s-f-c-lottery-container></s-f-c-lottery-container>
  </div>
</template>

<script>
  import VHead from '../../components/VHead.vue';
  import Lottery from '../../model/common/Lottery';
  import SFCLotteryContainer from './child/SFCLotteryContainer.vue';
  import {GET_CURRENT_SFC_LOTTERY, SET_CURRENT_LOTTERY} from '../../store/betting/types';

  export default {
    name: 'sfcBetting',
    methods: {
      goHelp () {
        this.$router.push({
          name: 'WebPage',
          query: {
            title: '玩法说明',
            url: Lottery.getHelpUrl(this.$store.state.betting.lottery)
          }
        })
      }
    },
    computed: {
      title () {
        return parseInt(this.$store.state.betting.lottery) === 20 ? '十四场胜负' : '任选九';
      }
    },
    created () {
      this.$store.commit(SET_CURRENT_LOTTERY, this.$router.currentRoute.params.id);
      this.$store.dispatch(GET_CURRENT_SFC_LOTTERY);
    },
    components: {VHead, SFCLotteryContainer, SET_CURRENT_LOTTERY}
  }
</script>

<style>
  .sfc-betting .question-icon {
    background: url("../../assets/betting/question.png") no-repeat center;
    background-size: 50% 50%;
    width: 35px; height: 35px;
    position: absolute; right: 0px; top: 2px;
  }
</style>
