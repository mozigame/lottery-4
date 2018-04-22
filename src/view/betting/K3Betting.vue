<template>
  <div class="k3-betting">
    <lottery-header :playTypeGroup="playTypeGroup"></lottery-header>
    <lottery-container :topTip="topTip">
      <template v-if="lotteryObj.panelType === 'hz'">
        <div class="item-container clear">
          <div class="hz-item"
               :class="{'selected': item.isSelected}"
               @click="ballChanged(item)"
               v-for="item in lotteryObj.balls">
              {{item.num}} <br/> {{item.award}}
          </div>
        </div>
      </template>
      <template v-else-if="lotteryObj.panelType === 'sth'">
        <div class="item-container clear sth">
          <template v-for="(item, index) in lotteryObj.balls">
            <div class="hz-item"
                 :class="{'selected': item.isSelected, 'all': index === 6}"
                 @click="ballChanged(item)">
                 {{item.num}} <br/> {{item.award}}
            </div>
          </template>
        </div>
      </template>
      <template v-else-if="lotteryObj.panelType === 'sbth'">
        <div class="item-container clear sbth">
          <p>
            <span>三不同</span>
            选择3个不同号码，猜对即中40元
          </p>
          <div class="hz-item"
               @click="ballChanged(item)"
               v-for="(item, index) in lotteryObj.balls"
               v-if="index < 6"
               :class="{'selected': item.isSelected}">
             {{item.num}}
          </div>
        </div>
        <div class="item-container clear sbth">
          <p>
            <span>三连号</span>
            123/234/345/456任意开出即中10元
          </p>
          <div class="hz-item all"
               :class="{'selected': lotteryObj.balls[6].isSelected}"
               @click="ballChanged(lotteryObj.balls[6])">
            {{lotteryObj.balls[6].num}}
          </div>
        </div>
      </template>
      <template v-else-if="lotteryObj.panelType === 'eth'">
        <div class="item-container clear sbth">
          <p><span>单选</span> 选择同号和不同号的组合，奖金80元</p>
          <div class="line-head"><span>同号</span></div>
          <div class="clear">
            <div class="hz-item"
                 @click="ballChanged(item, index)"
                 v-for="(item, index) in lotteryObj.balls"
                 v-if="index < 6 && index > -1"
                 :class="{'selected': item.isSelected}">
                {{item.num}}
            </div>
          </div>
          <div class="line-head"><span>不同号</span></div>
          <div class="clear">
            <div class="hz-item"
                 @click="ballChanged(item, index)"
                 v-for="(item, index) in lotteryObj.balls"
                 v-if="index < 12 && index > 5"
                 :class="{'selected': item.isSelected}">
                {{item.num}}
            </div>
          </div>
        </div>
        <div class="item-container clear sbth margin-top-10">
          <p><span>复选</span> 猜开奖中两个指定的相同号码，奖金15元</p>
          <div class="hz-item"
               @click="ballChanged(item, index)"
               v-for="(item, index) in lotteryObj.balls"
               v-if="index < 18 && index > 11"
               :class="{'selected': item.isSelected}">
            {{item.num}}
          </div>
        </div>
      </template>
      <template v-else-if="lotteryObj.panelType === 'ebth'">
        <div class="item-container clear sbth">
          <p><span>二不同</span> 选择2个不同号码，猜中即中8元</p>
          <div class="clear">
            <div class="hz-item"
                 @click="ballChanged(item, index)"
                 v-for="(item, index) in lotteryObj.balls"
                 :class="{'selected': item.isSelected}">
              {{item.num}}
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="lotteryObj.panelType === 'sbth_dt' || lotteryObj.panelType === 'ebth_dt'">
        <div class="item-container clear sbth">
          <p><span>胆码</span> </p>
          <div class="clear">
            <div class="hz-item"
                 @click="ballChanged(item, index)"
                 v-for="(item, index) in lotteryObj.balls"
                 v-if="index < 6 && index > -1"
                 :class="{'selected': item.isSelected}">
              {{item.num}}
            </div>
          </div>
        </div>
        <div class="item-container clear sbth margin-top-10">
          <p><span>拖码</span></p>
          <div class="hz-item"
               @click="ballChanged(item, index)"
               v-for="(item, index) in lotteryObj.balls"
               v-if="index < 12 && index > 5"
               :class="{'selected': item.isSelected}">
            {{item.num}}
          </div>
        </div>
      </template>
    </lottery-container>
  </div>
</template>

<script>
  import LotteryHeader from './child/LotteryHeader.vue';
  import LotteryContainer from './child/DigitalLotteryContainer.vue';
  import { SET_CURRENT_LOTTERY } from '../../store/betting/types';
//  import Lottery from '../../model/common/Lottery';

  export default {
    name: 'xyxwBetting',
    data () {
      return {
        LOTTERY_ID: 0
      }
    },
    computed: {
      playTypeGroup () {
        return [{
          name: '普通', list: [{id: 41, value: '和值'}, {id: 42, value: '三同号'}, {id: 45, value: '三不同号'}, {id: 46, value: '二同号'}, {id: 48, value: '二不同号'}]
        }, {
          name: '胆拖', list: [{id: 45, value: '三不同号胆拖', sure: true}, {id: 48, value: '二不同号胆拖', sure: true}]
        }];
      },
      lotteryObj () {
        return this.$store.state.betting[this.LOTTERY_ID];
      },
      topTip () {
        return this.$store.state.betting.currentLottery &&
          this.$store.state.betting.currentLottery.betTip;
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
    },
    components: {LotteryHeader, LotteryContainer}
  }
</script>

<style>
  .k3-betting {
    color: #3b9663;
  }
  .k3-betting .sport-lottery-header .text-item.selected {
    border: 1px solid #3b9663;
    background: url("../../assets/betting/selected_green.png") right bottom no-repeat;
    background-size: auto 60%;
    color: #3b9663;
  }
  .k3-betting .digital-lottery-container .top-tip {
    padding-top: 20px;
    padding-bottom: 10px;
    min-height: 45px;
  }
  .k3-betting .digital-lottery-container .top-tip .shake {
    bottom: 15px;
  }
  .k3-betting .item-container {
    padding: 0 5px;
  }
  .k3-betting .digital-lottery-container .container-top {
    background: #1b5a40;
    color: white;
  }
  .k3-betting .item-container .hz-item {
    margin: 0 1% 3% 1%; width: 23%;
    float: left;
    text-align: center;
    font-size: 14px;
    color: white;
    background: #3b9663;
    border: 1px solid #3b9663;
    padding: 3px 0;
    border-radius: 5px;
  }
  .k3-betting .item-container .line-head {
    border-bottom: 1px solid #b8ccc0;
    margin-bottom: 15px;
    margin-top: 5px;
    position: relative;
  }
  .k3-betting .item-container .line-head span {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: #F5F5F5;
    padding: 0px 15px;
    bottom: -10px;
  }
  .k3-betting .item-container.sbth .hz-item {
    padding: 10px;
    width: 14.5%;
  }
  .k3-betting .item-container.sbth p {
    padding: 0 5px 15px 5px; font-size: 13px;
  }
  .k3-betting .item-container.sbth p span {
    background: #b8ccc0; padding: 5px 10px;
    border-radius: 10px;
    color: #2d644c;
  }
  .k3-betting .item-container.sth .hz-item {
    width: 31%;
  }
  .k3-betting .item-container .hz-item.all {
    width: 97%;
  }
  .k3-betting .item-container .hz-item.selected {
    background: #1b5032;
    color: #f0c930;
    border: 1px solid #f0c930;
  }
  .k3-betting .digital-lottery-container .bottom-fixed .text .btn {
    background: #3b9663;
  }
  .k3-betting .digital-lottery-container .bottom-fixed .text .btn.disabled {
    pointer-events: none;
    background: #ccc;
  }
</style>
