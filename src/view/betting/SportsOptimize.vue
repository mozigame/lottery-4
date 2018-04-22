<template>
  <div class="sports-optimize">
    <v-head title="奖金优化"></v-head>
    <div class="top">
      <custom-select-box label="投入金额"
                         @change="redistribution"
                         :min="0"
                         :value="optimize.input"
                         unit="元"></custom-select-box>
    </div>
    <div class="operate-wrap">
      <div>
        <a href="javascript:;" @click="switchOperate(0)" :class="{selected: operateIndex === 0}">平均优化</a>
        <a href="javascript:;" @click="switchOperate(1)" :class="{selected: operateIndex === 1}">风险最小</a>
        <a href="javascript:;" @click="switchOperate(2)" :class="{selected: operateIndex === 2}">奖金最高</a>
      </div>
    </div>
    <div class="list" ref="list">
      <div class="list-head row">
        <div class="col">过关</div>
        <div class="col">单注详情</div>
        <div class="col">注数分布</div>
        <div class="col">预测奖金</div>
      </div>
      <optimize-item v-for="(item, key) in list" :index="key" :key="key" :item="item"></optimize-item>
    </div>
    <div class="bottom-fixed">
      <div class="pull-right">实际投入 <span class="text-primary">{{optimize.count * 2}}元</span></div>
      <div>预计奖金 <span class="text-primary">{{optimize.min | currency}}~{{optimize.max | currency}}元</span></div>
      <div class="margin-top-10">
        <a href="javascript:;" class="btn btn-block" @click="payment">付款</a>
      </div>
    </div>
  </div>
</template>

<script>
  import VHead from '../../components/VHead.vue';
  import CustomSelectBox from '../../components/CustomSelectBox.vue';
  import OptimizeItem from './child/SportsOptimizeItem.vue';
  import {SPORTS_OPTIMIZE_REDISTRIBUTION, SPORTS_OPTIMIZE_STAKE_DISTRIBUTION, SPORTS_OPTIMIZE_ITEM_MONEY,
    SPORTS_OPTIMIZE_INPUT_VALUE, SPORTS_CONFIRM_PAYMENT} from '../../store/betting/types';
  import Toast from '../../common/toast';
  import {mapActions, mapState} from 'vuex';
  import { MINE_INFO } from '../../store/user/types';
  let first = true;
  export default {
    name: 'sportsOptimize',
    data () {
      return {
        money: 10
      }
    },
    computed: {
      list () {
        return this.$store.state.betting.optimizeList;
      },
      ...mapState({
        optimize: state => state.betting.optimize,
        confirm: state => state.betting.sportConfirm,
        lottery: state => state.betting.lottery,
        operateIndex: state => state.betting.optimize.index,
        mine: state => state.user.mine
      })
    },
    methods: {
      ...mapActions({
        getMineInfo: MINE_INFO
      }),
      switchOperate (index) {
        if (index === 1 || index === 2) {
          let id = parseInt(this.lottery);
          let total = 0;
          if (id === 606 || id === 705) {
            this.confirm.bettingList.map(betting => {
              let t = 0;
              betting.selected.map(v => {
                if (v.length > 0) t++;
              });
              total = Math.max(total, t);
            });
          }
          if (total >= 2 || this.confirm.series.length > 1) {
            Toast('复杂玩法目前只支持平均优化');
            return;
          }
        }
        if (this.operateIndex !== index) {
          if (this.optimize.input < this.list.length * 2) {
            Toast('投入金额已自动调整！');
            this.$store.commit(SPORTS_OPTIMIZE_INPUT_VALUE, this.list.length * 2);
            first = true;
          } else if (this.optimize.input % 2 !== 0) {
            Toast('投入金额必须为偶数，已自动调整！');
            this.$store.commit(SPORTS_OPTIMIZE_INPUT_VALUE, this.optimize.input + 1);
            first = true;
          }
          this.$store.commit(SPORTS_OPTIMIZE_REDISTRIBUTION, index);
          this.$store.commit(SPORTS_OPTIMIZE_STAKE_DISTRIBUTION);
        }
      },
      redistribution (value) {
        if (!first) {
          this.$store.commit(SPORTS_OPTIMIZE_REDISTRIBUTION, -1);
        } else {
          first = false;
        }
        this.$store.commit(SPORTS_OPTIMIZE_INPUT_VALUE, value);
      },
      payment () {
        let series = [101, 102, 103, 106, 111, 118, 128, 134];
        let list = this.list.filter(value => value[0].checked && value[0].stake > 0);
        let ids = [];
        list.map(value => {
          value.map(v => {
            if (!ids.includes(v.scheduleId)) {
              ids.push(v.scheduleId);
            }
          });
        });
        let result = {
          lottery_id: this.lottery,
          total_amount: this.optimize.count * 2,
          stake_count: this.optimize.count,
          order_multiple: 1,
          series: 2,
          play_type: this.$store.state.betting[this.lottery].mode,
          select_schedule_ids: ids,
          optimize_ticket_list: list.map(value => {
            return {
              series_type: series[value.length - 1],
              ticket_schedules: value.map(v => {
                return {
                  id: v.scheduleId, schedule_lottery_id: v.lotteryId, bet_options: v.betNum.substr(1)
                };
              }),
              ticket_multiple: value[0].stake
            }
          })
        }
        this.$store.dispatch(SPORTS_CONFIRM_PAYMENT, result).then(() => {
          if (this.confirm.id) {
            if (this.mine.balance < (this.optimize.count * 2)) {
              Toast('余额不足');
              this.$router.push({ name: 'Payment', query: {lack: (this.optimize.count * 2 - this.mine.balance).toFixed(2)} });
            } else {
              this.$router.push({ name: 'PaymentOrder', query: {id: this.confirm.id, sign: this.confirm.sign, product_name: 'LHCP'} });
            }
          } else {
            this.$router.push({ name: 'Login', query: {redirect: this.$router.currentRoute.path} });
          }
        })
      }
    },
    created () {
      if (this.list.length === 0) {
        this.$router.back();
      }
      first = true;
      this.$store.commit(SPORTS_OPTIMIZE_ITEM_MONEY);
      this.$store.commit(SPORTS_OPTIMIZE_INPUT_VALUE, 0);
      this.$store.commit(SPORTS_OPTIMIZE_REDISTRIBUTION, 0);
      this.getMineInfo();
    },
    mounted () {
      this.$refs.list.style.height = (window.innerHeight - 235) + 'px';
    },
    components: {VHead, CustomSelectBox, OptimizeItem}
  }
</script>

<style>
  .sports-optimize {
    height: 100%; position: relative;
    overflow-y: auto;
  }
  .sports-optimize .top {
    background: white; padding: 10px;
    text-align: center;
  }
  .sports-optimize .top .custom-select-box {
    display: inline-block;
    margin: 0 auto;
  }
  .sports-optimize .operate-wrap {
    padding: 10px 0;
    text-align: center;
  }
  .sports-optimize .operate-wrap div {
    display: inline-block;
  }
  .sports-optimize .operate-wrap a {
    width: 90px; height: 35px;
    text-align: center; line-height: 33px;
    color: #666; background: white;
    float: left; font-size: 13px;
    border: 1px solid #ddd;
  }
  .sports-optimize .operate-wrap a:first-child {
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    border-right: 0;
  }
  .sports-optimize .operate-wrap a:last-child {
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    border-left: 0;
  }
  .sports-optimize .operate-wrap a.selected {
    border: 1px solid #e73f40;
    background: white url("../../assets/betting/selected.png") right bottom no-repeat;
    background-size: auto 60%;
    color: #e73f40;
  }
  .sports-optimize .list {
    font-size: 12px; text-align: center;
    overflow-y: auto;
  }
  .sports-optimize .list .list-head {
    color: #999;
  }
  .sports-optimize .list .col {
    padding: 5px;
    background: white;
    border-top: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }
  .sports-optimize .list .list-head .col:last-child {
    border-right: 0;
  }
  .sports-optimize .list-item .list-item-block {
    background: white;
    height: 55px; line-height: 55px;
    background: white;
    border-top: 1px solid #ddd;
    border-right: 1px solid #ddd;
    width: 25%; float: left;
    position: relative;
  }
  .sports-optimize .list-item .list-item-block:last-child {
    border-right: 0;
  }
  .sports-optimize .list-item .list-item-block.third {
    padding-top: 6px;
  }
  .sports-optimize .list-item .list-item-block.second {
    padding-top: 5px; line-height: 18px;
  }
  .sports-optimize .list-item-block .arrow-bottom-icon {
    position: absolute; bottom: 3px;
    left: 50%; margin-left: -6px;
  }
  .sports-optimize .list-item-block .arrow-bottom-icon.rotate {
    transform: rotate(180deg);
  }
  .sports-optimize .list-item-block .custom-select-box {
    display: inline-block;
  }
  .sports-optimize .list-item .list-item-panel {
    font-size: 13px;
  }
  .sports-optimize .list-item .list-item-panel .list-item-panel-row {
    padding: 5px 0;
  }
  .sports-optimize .list-item .list-item-panel .list-item-panel-row:nth-child(odd) {
    background: #e4e4e4;
  }
  .sports-optimize .list-item .list-item-panel .list-item-panel-row:nth-child(even) {
    background: #efefef;
  }
  .sports-optimize .list-item .list-item-panel .list-item-panel-row span {
    width: 25%; float: left; text-align: center;
  }
  .sports-optimize .bottom-fixed {
    position: absolute; bottom: 0; left: 0;
    height: 80px; font-size: 14px;
    width: 100%; color: #666;
    background: white;
    padding: 5px 10px;
  }
  .sports-optimize .bottom-fixed .btn-wrap {
    margin-top: 5px;
  }
</style>
