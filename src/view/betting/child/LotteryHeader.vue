<template>
  <div class="sport-lottery-header">
    <div class="head">
      <span class="back-icon" @click="goBack"></span>
      <span class="select-type" @click="changePanelVisible">
        {{currentType.value}}
        <i class="icon" :class="{'up': panelVisible}"></i>
      </span>
      <span class="filter-icon" v-show="hasFilter()" @click="openFilter"></span>
      <span class="question-icon" @click="goHelp"></span>
    </div>
    <div class="drop-down-panel" v-show="panelVisible">
      <div class="text-container">
        <div v-for="group in playTypeGroup" class="clear">
          <div class="group-name" v-show="group.name"><span class="dot"></span>{{group.name}}</div>
          <div class="text-item" v-for="item in group.list"
               :class="{'selected': currentType.id === item.id && currentType.sure === item.sure}"
               @click="selectPlayType(item)">
              {{item.value}}
          </div>
        </div>
      </div>
      <div class="mask" @click="changePanelVisible"></div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { CURRENT_PLAY_TYPE_SELECT, GET_CURRENT_LOTTERY, SPORTS_FILTER_PANEL_CHANGE,
    RECOMMEND_ISSUE_SET, CURRENT_SPORT_PLAY_TYPE_SELECT } from '../../../store/betting/types';
  import { recommendIssue } from '../../../common/store';
  import Lottery from '../../../model/common/Lottery';
  import { LOTTERYIDS } from '../../../store/constants';
  export default {
    name: 'lotteryHeader',
    props: {
      playTypeGroup: {type: Array, required: true}
    },
    data () {
      return {
        panelVisible: false
      }
    },
    computed: {
      ...mapState({
        lottery: state => state.betting.lottery
      }),
      currentType () {
        return this.$store.state.betting[this.lottery].playType || {value: ''}
      }
    },
    methods: {
      changePanelVisible () {
        this.panelVisible = !this.panelVisible;
      },
      selectPlayType (item) {
        if (Lottery.isFootBall(this.lottery) || Lottery.isBasketBall(this.lottery)) {
          this.$store.dispatch(CURRENT_SPORT_PLAY_TYPE_SELECT, item);
        } else if (Lottery.isSSQ(this.lottery) || Lottery.isDLT(this.lottery) ||
          Lottery.isSYXW(this.lottery) || Lottery.isK3(this.lottery) || Lottery.isFC3D(this.lottery)) {
          this.$store.commit(CURRENT_PLAY_TYPE_SELECT, item);
        }
        this.changePanelVisible();
      },
      goBack () {
        this.$router.back();
      },
      goHelp () {
        let lotteryId = this.lottery;
        if (Lottery.isFootBall(this.lottery)) {
          lotteryId = LOTTERYIDS.FOOTBALL;
        }
        if (Lottery.isBasketBall(this.lottery)) {
          lotteryId = LOTTERYIDS.BASKETBALL;
        }
        this.$router.push({
          name: 'WebPage',
          query: {
            title: '玩法说明',
            url: Lottery.getHelpUrl(lotteryId)
          }
        })
      },
      hasFilter () {
        return Lottery.isFootBall(this.lottery) || Lottery.isBasketBall(this.lottery);
      },
      openFilter () {
        this.$store.commit(SPORTS_FILTER_PANEL_CHANGE, true);
      }
    },
    created () {
      if (Lottery.isSSQ(this.lottery) || Lottery.isDLT(this.lottery) || Lottery.isK3(this.lottery) || Lottery.isFC3D(this.lottery)) {
        this.$store.dispatch(GET_CURRENT_LOTTERY).then(() => {
          let issue = recommendIssue.get();
          if (issue) {
            issue.playType && this.$store.commit(CURRENT_PLAY_TYPE_SELECT, issue.playType);
            this.$store.commit(RECOMMEND_ISSUE_SET, issue);
            recommendIssue.clear();
          } else {
            if ((!this.$store.state.betting[this.lottery].playType)) {
              this.$store.commit(CURRENT_PLAY_TYPE_SELECT, this.playTypeGroup[0].list[0]);
            }
          }
        });
        // test
        if (Lottery.isK3(this.lottery)) {
          if ((!this.$store.state.betting[this.lottery].playType)) {
            this.$store.commit(CURRENT_PLAY_TYPE_SELECT, this.playTypeGroup[0].list[0]);
          }
        }
      }
    }
  }
</script>

<style>
  .sport-lottery-header {
    position: relative;
  }
  .sport-lottery-header .mask{
    position: fixed;
    left: 0; right: 0;
    bottom: 0; top: 0;
    background: black;
    opacity: 0.5;
    z-index: 8;
  }
  .sport-lottery-header .head {
    margin-bottom: 0;
    position: relative;
    z-index: 9;
    color: #333;
  }
  .sport-lottery-header .select-type {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  .sport-lottery-header .select-type .icon {
    background: url("../../../assets/betting/down.png") no-repeat;
    background-size: 100% 100%;
    width: 10px; height: 7px;
    display: inline-block;
    margin-left: 5px;
    vertical-align: middle;
    margin-top: -3px;
    transition: transform 0.5s;
  }
  .sport-lottery-header .select-type .icon.up {
    transform: rotate(180deg);
  }
  .sport-lottery-header .filter-icon {
    background: url("../../../assets/betting/filter.png") no-repeat center;
    background-size: 50% 50%;
    width: 35px; height: 35px;
    position: absolute;
    right: 30px; top: 0;
  }
  .sport-lottery-header .question-icon {
    background: url("../../../assets/betting/question.png") no-repeat center;
    background-size: 50% 50%;
    width: 35px; height: 35px;
    position: absolute;
    right: 0px; top: 0px;
  }
  .sport-lottery-header .drop-down-panel {
    position: absolute;
    width: 100%;
    z-index: 8;
  }
  .sport-lottery-header .text-container {
    padding: 0 2%;
    background: white;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 5px;
    position: relative;
    z-index: 9;
    max-height: 380px;
  }
  .sport-lottery-header .text-container .group-name {
    font-size: 14px; padding-left: 10px;
  }
  .sport-lottery-header .text-container .group-name .dot {
    width: 5px; height: 5px;
    border-radius: 5px;
    background: #cccccc;
    margin-right: 5px;
    vertical-align: middle;
    display: inline-block;
    margin-top: -2px;
  }
  .sport-lottery-header .text-item {
    width: 29%; float: left;
    margin: 5px 2%;
    padding: 5px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    text-align: center;
    color: #999;
  }
  .sport-lottery-header .text-item.selected {
    border: 1px solid #e73f40;
    background: url("../../../assets/betting/selected.png") right bottom no-repeat;
    background-size: auto 60%;
    color: #e73f40;
  }
</style>
