<template>
  <div class="sport-lottery-container">
    <div class="top row">
      <div class="col" @click="modeSelect(2)" :class="{'selected': currentMode === 2}">
        过关 <span class="text-sm">(至少选两场)</span>
      </div>
      <div class="col" @click="modeSelect(1)" :class="{'selected': currentMode === 1}">
        单关 <span class="text-sm">(猜一场，奖金固定)</span>
      </div>
    </div>
    <template v-if="holders && holders.groups && holders.groups.length > 0">
      <sport-lottery-panel
        v-for="(holder, index) in holders.groups"
        :key="index"
        :filter="filterSelected"
        :holder="holder">
      </sport-lottery-panel>
    </template>
    <template v-else-if="holders && holders.groups && holders.groups.length === 0">
      <sports-no-match></sports-no-match>
    </template>
    <div class="bottom-fixed">
      <div class="content">
        <div class="clear-icon" @click="clearSelected"></div>
        <div class="text">
          <span class="text-muted">{{holders.bottomTip}}</span>
          <a href="javascript:;" @click="confirmBet" class="btn pull-right" :class="{disabled: !confirmDisabled}">确认</a>
        </div>
      </div>
    </div>
    <sport-filter :type="filterType" @confirm="filterConfirm"></sport-filter>
  </div>
</template>

<script>
  import { SPORT_MODE_SELECT, CLEAR_SPORT_BETTING_SELECTED,
    SPORTS_CONFIRM_BET } from '../../../store/betting/types';
  import SportLotteryPanel from './SportLotteryPanel.vue';
  import SportsNoMatch from './SportsNoMatch.vue';
  import SportFilter from './SportFilter.vue';
  import Lottery from '../../../model/common/Lottery';
  import { mapState } from 'vuex';

  export default {
    name: 'sportLotteryContainer',
    data () {
      return {
        filterSelected: []
      }
    },
    computed: {
      currentMode () {
        return this.$store.state.betting[this.lottery].mode;
      },
      holders () {
        return this.$store.state.betting[this.lottery].scheme[this.currentMode === 2 ? 0 : 1] || {};
      },
      confirmDisabled () {
        return this.holders && (this.holders.total > (this.holders.mode === 2 ? 1 : 0)) && this.holders.total <= 15;
      },
      ...mapState({
        lottery: state => state.betting.lottery
      }),
      filterType () {
        return Lottery.isFootBall(this.lottery) ? 'football' : '';
      }
    },
    methods: {
      modeSelect (mode) {
        if (this.currentMode !== mode) {
          this.$store.dispatch(SPORT_MODE_SELECT, mode);
        }
      },
      clearSelected () {
        this.$store.commit(CLEAR_SPORT_BETTING_SELECTED);
      },
      confirmBet () {
        this.$store.commit(SPORTS_CONFIRM_BET);
        this.$router.push({name: 'SportsConfirm'});
      },
      filterConfirm (selected) {
        this.filterSelected = selected;
      }
    },
    components: {SportLotteryPanel, SportsNoMatch, SportFilter}
  }
</script>

<style>
  .sport-lottery-container {
    padding-bottom: 50px;
  }
  .sport-lottery-container .top {
    background: white;
    font-size: 14px;
    text-align: center;
  }
  .sport-lottery-container .top .col {
    padding: 7px;
    border-bottom: 2px solid #ddd;
  }
  .sport-lottery-container .top .col.selected {
    border-bottom: 2px solid #e73f40;
    color: #e73f40;
  }
  .sport-lottery-container .bottom-fixed {
    position: fixed;
    height: 45px;
    border-top: 1px solid #ddd;
    padding: 7px 10px;
    width: 100%;
    bottom: 0; left: 0;
    background: white;
  }
  .sport-lottery-container .bottom-fixed .clear-icon {
    width: 25px; height: 25px;
    background: url("../../../assets/betting/ic_scheme_trash.png") no-repeat;
    display: inline-block;
    margin: 3px 15px 0 5px;
    float: left;
  }
  .sport-lottery-container .bottom-fixed .text {
    border-left: 1px dotted #ddd;
    padding-left: 15px;
    margin-left: 40px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #ccc;
  }
  .sport-lottery-container .bottom-fixed .text .btn {
    height: 31px; line-height: 32px;
    display: inline-block;
    width: 50px;
  }
</style>
