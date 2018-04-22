<template>
  <div class="list-item">
    <div class="clear">
      <div class="list-item-block">
        <custom-radio :checked="radioStatus" @change="radioChange"></custom-radio>
        {{item.length}}串1
      </div>
      <div class="list-item-block second" @click="changePanel">
        <template v-if="item.length > 1">
          {{item[0].home}}<br/>{{item[1].home}}<br/>
        </template>
        <template v-else>
          <div style="padding-top: 10px;">{{item[0].home}}</div>
        </template>
        <span class="arrow-bottom-icon" :class="{rotate: visible}"></span>
      </div>
      <div class="list-item-block third">
        <custom-select-box type="mini" :min="min" @change="stakeChange" :value="stake" ></custom-select-box>
      </div>
      <div class="list-item-block text-md text-primary">{{money | currency}}元</div>
    </div>
    <div class="list-item-panel" v-show="visible">
      <div class="list-item-panel-row text-light">投注方案</div>
      <div class="list-item-panel-row clear text-light">
        <span>场次</span>
        <span>主队</span>
        <span>客队</span>
        <span>投注内容</span>
      </div>
      <div class="list-item-panel-row clear" v-for="game in item">
        <span>{{game.roundNo}}</span>
        <span>{{game.home}}</span>
        <span>{{game.guest}}</span>
        <span>{{bettingText(game.lotteryId, game.betNum)}}（{{game.odds}}）</span>
      </div>
    </div>
  </div>
</template>

<script>
  import CustomSelectBox from '../../../components/CustomSelectBox.vue';
  import CustomRadio from '../../../components/CustomRadio.vue';
  import {BettingScoreOdds} from '../../../model/sports/BettingScoreOdds';
  import {SPORTS_OPTIMIZE_ITEM_CHECKED, SPORTS_OPTIMIZE_STAKE_CHANGE, SPORTS_OPTIMIZE_CALCULATE} from '../../../store/betting/types';
  export default {
    name: 'sportsOptimizeItem',
    props: ['item', 'index'],
    data () {
      return {
        visible: false,
        radioStatus: true,
        min: 0
      }
    },
    computed: {
      stake () {
        return this.$store.state.betting.optimizeList[this.index][0].stake;
      },
      money () {
        return this.stake * this.$store.state.betting.optimizeList[this.index][0].money;
      }
    },
    methods: {
      changePanel () {
        this.visible = !this.visible;
      },
      radioChange () {
        this.radioStatus = !this.radioStatus;
        this.$store.commit(SPORTS_OPTIMIZE_ITEM_CHECKED, { index: this.index, checked: this.radioStatus });
        this.$store.commit(SPORTS_OPTIMIZE_CALCULATE);
      },
      stakeChange (value) {
        this.$store.commit(SPORTS_OPTIMIZE_STAKE_CHANGE, {index: this.index, stake: value})
        this.$store.commit(SPORTS_OPTIMIZE_CALCULATE);
      },
      bettingText (lottery, index) {
        return BettingScoreOdds.getShowText(lottery, index);
      }
    },
    created () {
      this.$store.commit(SPORTS_OPTIMIZE_ITEM_CHECKED, { index: this.index, checked: this.radioStatus });
      this.$store.commit(SPORTS_OPTIMIZE_STAKE_CHANGE, {index: this.index, stake: 1});
      this.$store.commit(SPORTS_OPTIMIZE_CALCULATE);
    },
    components: {CustomSelectBox, CustomRadio}
  }
</script>

<style>

</style>
