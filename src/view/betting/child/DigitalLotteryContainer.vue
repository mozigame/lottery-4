<template>
  <div class="digital-lottery-container">
    <div class="container-top" v-if="topTip">
      {{topTip}}
    </div>
    <div class="top-tip" v-if="containerTopTip || containerTopBottomTip || lotteryObj.showShake">
      <p>{{containerTopTip}}</p>
      <p class="sub-description" v-html="containerTopBottomTip"></p>
      <div class="shake" v-if="lotteryObj.showShake">
        <i class="shake-icon"></i>
        <span @click="randomSelectedBall">摇一摇机选</span>
      </div>
    </div>
    <slot></slot>
    <div class="bottom-fixed">
      <div class="prize-tip" v-html="lotteryObj.bonusTips"></div>
      <div class="content">
        <div class="clear-icon" @click="clearSelected"></div>
        <div class="text">
          <span>共{{lotteryObj.stakeCount}}注 <span :class="{'text-primary': lotteryObj.stakeCount > 0}">{{lotteryObj.stakeCount*2}}</span>元</span>
          <a href="javascript:;" @click="confirmBet" class="btn pull-right" :class="{disabled: lotteryObj.stakeCount == 0}">确认</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { CLEAR_BETTING_SELECTED, CONFIRM_BET, RANDOM_SELECTED_BALL } from '../../../store/betting/types';
  import DeviceMotion from '../../../model/common/DeviceMotion';
  let motion;
  export default {
    name: 'digitalLotteryContainer',
    props: ['topTip'],
    computed: {
      lotteryObj () {
        console.log(this.$store.state.betting[this.$store.state.betting.lottery])
        return this.$store.state.betting[this.$store.state.betting.lottery];
      },
      containerTopTip () {
        return this.lotteryObj.getTopTip && this.lotteryObj.getTopTip();
      },
      containerTopBottomTip () {
        return this.lotteryObj.getBottomTip && this.lotteryObj.getBottomTip();
      }
    },
    methods: {
      clearSelected () {
        this.$store.commit(CLEAR_BETTING_SELECTED);
      },
      confirmBet () {
        this.$store.commit(CONFIRM_BET);
        this.$store.commit(CLEAR_BETTING_SELECTED);
        this.$router.push({name: 'DigitalConfirm'});
      },
      randomSelectedBall () {
        this.$store.commit(RANDOM_SELECTED_BALL);
      }
    },
    watcher: {
      [this.lotteryObj] (value) {
        console.log(value);
      }
    },
    created () {
      motion && motion.cancel();
      motion = new DeviceMotion(() => {
        this.lotteryObj.showShake && this.randomSelectedBall();
      });
      motion.register();
    }
  }
</script>

<style>
  .digital-lottery-container {
    padding-bottom: 45px;
  }
  .digital-lottery-container .container-top {
    background: white;
    text-align: center;
    padding: 5px;
    font-size: 12px;
    color: #999;
    border-bottom: 1px solid #ddd;
  }
  .digital-lottery-container .top-tip {
    font-size: 13px;
    position: relative;
    padding: 10px 120px 20px 10px;
    min-height: 15px;
    color: #666;
  }
  .digital-lottery-container .top-tip .sub-description {
    margin-top: 3px;
  }
  .digital-lottery-container .top-tip .shake {
    position: absolute;
    right: 0; bottom: 30px;
    width: 105px;
    background: white;
    padding: 2px;
    height: 24px;
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
  }
  .digital-lottery-container .top-tip .shake .shake-icon {
    display: inline-block;
    background: url("../../../assets/betting/shake_setting_icon.png") no-repeat;
    background-size: 100% 100%;
    width: 20px;
    height: 20px;
  }
  .digital-lottery-container .top-tip .shake span {
    line-height: 24px;
    display: inline-block;
    vertical-align: top;
  }
  .digital-lottery-container .row {
    margin-top: 0;
  }
  .digital-lottery-container .play-ball-white,
  .digital-lottery-container .play-ball-blue {
    width: 35px; height: 35px;
    line-height: 33px;
    text-align: center;
    font-size: 16px;
    border-radius: 35px;
    margin-right: 5px;
    margin-bottom: 10px;
    color: #e73f40;
    border: 1px solid #ddd;
    background: white;
    display: inline-block;
  }
  .digital-lottery-container .play-ball-white.play-ball-blue {
    color: #3f67e7;
  }
  .digital-lottery-container .play-ball-white.play-ball-blue.active {
    background: #3f67e7;
    color: white;
    border: 1px solid #3f67e7;
  }
  .digital-lottery-container .play-ball-white.active {
    background: #e73f40;
    color: white;
    border: 1px solid #e73f40;
  }
  .digital-lottery-container .side-title {
    padding: 2px 10px;
    border-radius: 20px;
    background: #e3e2e2;
    color: #a4a4a4;
    display: inline-block;
    margin: 7px 0 0 10px;
    font-size: 12px;
  }
  .digital-lottery-container .group-title {
    font-size: 12px;
    color: #999;
    padding: 5px 0 5px 10px;
  }
  .digital-lottery-container hr {
    height: 0;
    border-bottom: 1px solid #ddd;
    border-top: none;
    margin: 0 10px 5px 10px;
  }
  .digital-lottery-container .play-ball-blue {
    color: #e73f40;
  }
  .digital-lottery-container .bottom-fixed {
    position: fixed;
    height: 45px;
    border-top: 1px solid #ddd;
    padding: 7px 10px;
    width: 100%;
    bottom: 0; left: 0;
    background: white;
  }
  .digital-lottery-container .bottom-fixed .clear-icon {
    width: 25px; height: 25px;
    background: url("../../../assets/betting/ic_scheme_trash.png") no-repeat;
    display: inline-block;
    margin: 3px 15px 0 5px;
    float: left;
  }
  .digital-lottery-container .bottom-fixed .text {
    border-left: 1px dotted #ddd;
    padding-left: 15px;
    margin-left: 40px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #ccc;
  }
  .digital-lottery-container .bottom-fixed .text .btn {
    height: 31px; line-height: 32px;
    display: inline-block;
    width: 50px;
  }
  .digital-lottery-container .bottom-fixed .prize-tip {
    font-size: 12px;
    position: absolute;
    top: -20px;
    color: #666;
  }
</style>
