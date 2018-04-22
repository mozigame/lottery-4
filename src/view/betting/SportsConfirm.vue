<template>
  <div class="sports-confirm">
    <v-head :title="title"></v-head>
    <div class="sports-confirm-container">
      <div class="operate-wrap">
        <a href="javascript:;" @click="addBetting"><span class="plus-icon"></span>编辑/添加投注</a>
        <a href="javascript:;" @click="clearBettingList"><span class="clear-icon"></span>清空</a>
      </div>
      <scheme-box>
        <div class="scheme-box-item" :class="{'has-sure': betting.mode === 2}" v-for="(betting, key) in bettingList">
          <span class="scheme-delete-icon" @click="deleteBetting(key)"></span>
          <template v-if="betting.lotteryId === 601">
            <football-s-p-f-lottery @onOptionSelected="onOptionSelected" :isConfirm="true" :schedule="betting"></football-s-p-f-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 602">
            <football-r-q-s-p-f-lottery @onOptionSelected="onOptionSelected" :isConfirm="true" :schedule="betting"></football-r-q-s-p-f-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 603">
            <football-b-f-lottery @onOptionSelected="onOptionSelected" :isConfirm="true" :schedule="betting"></football-b-f-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 604">
            <football-z-j-q-lottery @onOptionSelected="onOptionSelected" :isConfirm="true" :schedule="betting"></football-z-j-q-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 605">
            <football-b-q-c-lottery @onOptionSelected="onOptionSelected" :isConfirm="true" :schedule="betting"></football-b-q-c-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 606">
            <football-h-h-lottery @onOptionSelected="onOptionSelected" :isConfirm="true" :schedule="betting"></football-h-h-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 701">
            <basketball-s-f-lottery @onOptionSelected="onOptionSelected" :isConfirm="true" :schedule="betting"></basketball-s-f-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 702">
            <basketball-r-f-s-f-lottery @onOptionSelected="onOptionSelected" :isConfirm="true" :schedule="betting"></basketball-r-f-s-f-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 703">
            <basketball-s-f-c-lottery @onOptionSelected="onOptionSelected" :isConfirm="true" :schedule="betting"></basketball-s-f-c-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 704">
            <basketball-d-x-f-lottery @onOptionSelected="onOptionSelected" :isConfirm="true" :schedule="betting"></basketball-d-x-f-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 705">
            <basketball-h-h-lottery @onOptionSelected="onOptionSelected" :isConfirm="true" :schedule="betting"></basketball-h-h-lottery>
          </template>
          <span class="sure" :class="{selected: betting.isSure}" @click="addSure(betting)">胆</span>
        </div>
      </scheme-box>
      <service-agreement></service-agreement>
    </div>
    <div class="bottom-fixed">
      <div class="row top">
        <div class="col col-50 col-center" @click="onPopupVisible">
          <span class="text-normal ellipsis" style="width: 80%; display: inline-block">{{seriesText}}</span><span class="down-up"></span>
        </div>
        <div class="col">
          <custom-select-box @change="multipleChange" class="pull-right" label="倍数" :value="confirm.multiple"></custom-select-box>
        </div>
      </div>
      <div class="summary">
        <div class="text">
          <span>
            {{confirm.stakeCount}}注 {{confirm.multiple}}倍
            <span class="text-primary">共{{totalMoney}}元</span>
          </span>
          <div class="pull-right text-light ellipsis" style="width: 50%">
            预计奖金:{{confirm.bonus.min * confirm.multiple | currency}} ~ {{confirm.bonus.max * confirm.multiple | currency}}元
          </div>
        </div>
        <div class="row">
          <!--<div class="col col-40">-->
            <!--<a href="javascript:;" class="btn btn-out-line text-center" @click="confirmOptimize">奖金优化</a>-->
          <!--</div>-->
          <!--<div class="col padding-left-10">-->
            <!--<a href="javascript:;" class="btn text-center" @click="confirmPayment">付款</a>-->
          <!--</div>-->
          <div class="col">
            <a href="javascript:;" class="btn text-center" @click="confirmPayment">付款</a>
          </div>
        </div>
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class="series-select-popup">
        <div class="header-nav clear">
          <a href="javascript:;" @click="popupNavChange(0)" :class="{active: popupNavIndex === 0}">自由过关</a>
          <a href="javascript:;" @click="popupNavChange(1)" :class="{active: popupNavIndex === 1}">多串过关</a>
        </div>
        <div class="select-content clear" v-if="popupNavIndex === 0">
          <span class="item"
                :class="{selected: popupIsSelected(item)}"
                @click="popupItemSelected(item, 0)"
                v-for="item in popupList[0]">
            {{item.value}}</span>
        </div>
        <div class="select-content clear" v-else>
          <span class="item"
                :class="{selected: popupIsSelected(item)}"
                @click="popupItemSelected(item, 1)"
                v-for="item in popupList[1]">
            {{item.value}}</span>
        </div>
        <div class="btn-wrap row">
          <div class="col col-50"><a href="javascript:;" @click="hidePopupVisible" class="btn">取消</a></div>
          <div class="col col-50"><a href="javascript:;" @click="confirmPopup" class="btn">确认</a></div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import VHead from '../../components/VHead.vue';
  import SchemeBox from '../../components/SchemeBox.vue';
  import ServiceAgreement from '../../components/ServiceAgreement.vue';
  import CustomSelectBox from '../../components/CustomSelectBox.vue';
  import {SPORTS_CONFIRM_CLEAR_TICKETS, SPORTS_CONFIRM_DELETE_TICKET, SPORTS_CONFIRM_OPTIMIZE,
    SPORTS_BONUS_CHANGE, SPORTS_MULTIPLE_CHANGE, SPORTS_CONFIRM_PAYMENT,
    SPORTS_CONFIRM_SERIES_SET, SPORTS_CONFIRM_SERIES_CLEAR} from '../../store/betting/types';
  import FootballSPFLottery from './child/FootballSPFLottery.vue';
  import FootballRQSPFLottery from './child/FootballRQSPFLottery.vue';
  import FootballBFLottery from './child/FootballBFLottery.vue';
  import FootballZJQLottery from './child/FootballZJQLottery.vue';
  import FootballBQCLottery from './child/FootballBQCLottery.vue';
  import FootballHHLottery from './child/FootballHHLottery.vue';
  import BasketballSFLottery from './child/BasketballSFLottery.vue';
  import BasketballSFCLottery from './child/BasketballSFCLottery.vue';
  import BasketballRFSFLottery from './child/BasketballRFSFLottery.vue';
  import BasketballDXFLottery from './child/BasketballDXFLottery.vue';
  import BasketballHHLottery from './child/BasketballHHLottery.vue';
  import {mapActions, mapState} from 'vuex';
  import Vue from 'vue';
  import {Popup} from 'mint-ui';
  import Series from '../../model/common/Series';
  import SportsCalculate from '../../model/sports/SportsCalculate';
  import Lottery from '../../model/common/Lottery';
  import Toast from '../../common/toast';
  import { MINE_INFO } from '../../store/user/types';
  Vue.component(Popup.name, Popup);
  let calculate;
  export default {
    name: 'sportsConfirm',
    data () {
      return {
        popupVisible: false,
        popupNavIndex: 0,
        popupList: [[], []],
        series: [],
        popupSelected: [],
        isMulti: false,
        sure: 0
      }
    },
    computed: {
      ...mapState({
        mine: state => state.user.mine,
        confirm: state => state.betting.sportConfirm,
        lotteryId: state => state.betting.lottery
      }),
      seriesText () {
        let textArr = this.series.map(v => v.value);
        return textArr.join(',') || '投注方式';
      },
      totalMoney () {
        return parseInt(this.confirm.ticketPrice * this.confirm.stakeCount * this.confirm.multiple);
      },
      title () {
        if (Lottery.isFootBall(this.lotteryId)) {
          return '竞彩足球';
        } else if (Lottery.isBasketBall(this.lotteryId)) {
          return '竞彩篮球';
        }
      },
      bettingList () {
        return this.confirm.bettingList.filter(value => {
          return value.selected.length > 0;
        })
      }
    },
    methods: {
      ...mapActions({
        getMineInfo: MINE_INFO
      }),
      addBetting () {
        this.$router.back();
      },
      clearBettingList () {
        this.$store.commit(SPORTS_CONFIRM_CLEAR_TICKETS);
        this.clearSeries();
        this.setProjectBonus();
      },
      deleteBetting (index) {
        this.$store.commit(SPORTS_CONFIRM_DELETE_TICKET, index);
        this.clearSeries();
        this.setProjectBonus();
      },
      clearSeries () {
        if (this.confirm.mode === 2) {
          const list = this.getPopupList();
          if (list[0][0]) {
            let arr = [];
            for (let i = 0; i < this.series.length; i++) {
              list.map(value => {
                value.map(v => {
                  if (v.key === this.series[i].key) {
                    arr.push(this.series[i]);
                  }
                })
              })
            }
            this.series = arr;
          } else {
            this.series = [];
          }
        }
      },
      multipleChange (v) {
        this.$store.commit(SPORTS_MULTIPLE_CHANGE, v);
      },
      confirmPayment () {
        if (this.series.length <= 0) {
          Toast('请选择投注方式');
          return;
        }
        if (this.confirm.multiple < 1) {
          Toast('倍数不能小于1');
          return;
        }

        let seriesArr = [];
        this.series.map(v => seriesArr.push(v.key));
        const result = {
          multiple: this.confirm.multiple,
          lottery_id: this.lotteryId,
          coupon_id: 0,
          series: seriesArr.join(','),
          play_type: this.confirm.mode,
          stake_count: this.confirm.stakeCount,
          total_amount: this.confirm.stakeCount * this.confirm.multiple * 2,
          schedule_orders: this.bettingList.map(value => {
            return {
              bet_number: value.getBetNumber(),
              schedule_id: value.id,
              is_sure: value.isSure ? 1 : 0,
              guest: value.guest,
              round_no: value.round_no,
              home: value.home,
              match_round_id: value.match_round_id
            }
          })
        };
        this.$store.dispatch(SPORTS_CONFIRM_PAYMENT, result).then(() => {
          if (this.confirm.id) {
            if (this.mine.balance < (this.confirm.stakeCount * this.confirm.multiple * 2)) {
              Toast('余额不足');
              this.$router.push({ name: 'Payment', query: {lack: (this.confirm.stakeCount * this.confirm.multiple * 2 - this.mine.balance).toFixed(2)} });
            } else {
              this.$router.push({ name: 'PaymentOrder', query: {id: this.confirm.id, sign: this.confirm.sign, product_name: 'LHCP'} });
            }
          } else {
            this.$router.push({ name: 'Login', query: {redirect: this.$router.currentRoute.path} });
          }
        });
      },
      getPopupList () {
        return Series.getSeriesList(this.lotteryId, this.bettingList, this.sure);
      },
      onPopupVisible () {
        if (this.confirm.mode === 2) {
          this.isMulti = this.confirm.isMulti;
          this.popupList = this.getPopupList();
          this.popupSelected = this.series;
          this.popupVisible = true;
        }
      },
      hidePopupVisible () {
        this.popupVisible = false;
      },
      confirmPopup () {
        this.series = this.popupSelected;
        this.$store.commit(SPORTS_CONFIRM_SERIES_SET, {
          series: this.series, isMulti: this.isMulti
        });
        this.setProjectBonus();
        this.hidePopupVisible();
      },
      popupNavChange (index) {
        if (this.popupNavIndex !== index) {
          this.popupNavIndex = index;
        }
      },
      popupIsSelected (item) {
        return this.popupSelected.indexOf(item) !== -1;
      },
      popupItemSelected (item) {
        if (this.popupNavIndex === 0) {
          if (this.isMulti) {
            this.popupSelected = [item];
            this.isMulti = false;
          } else {
            const i = this.popupSelected.indexOf(item);
            i === -1 ? this.popupSelected.push(item) : this.popupSelected.splice(i, 1);
          }
        } else {
          this.isMulti = true;
          this.popupSelected = [item];
        }
      },
      addSure (betting) {
        if (this.isMulti) {
          return;
        }
        if (betting.isSure) {
          this.sure--; // 是否会不一致
          betting.isSure = false;
          this.setProjectBonus();
        } else {
          const canSure = Series.sureCount(this.series);
          if (canSure + 1 < this.bettingList.length) {
            this.sure++;
            betting.isSure = true;
            if (this.sure > canSure) {
              this.clearSeries();
              if (Series.sureCount(this.series) + 1 === this.bettingList.length) {
                this.clearSeries();
                this.sure = 0;
                this.bettingList = this.bettingList.map(v => {
                  v.isSure = false;
                  return v;
                })
              }
            }
            this.setProjectBonus();
          }
        }
      },
      setProjectBonus () {
        if (!calculate) {
          calculate = new SportsCalculate(this.lotteryId);
        }
        calculate.setPlayType(this.lotteryId);
        if (this.series.length > 0) {
          calculate.setProjectBonus(this.series, this.bettingList, this.confirm.multiple).then((value) => {
            console.log(value);
            if (value.count) {
              calculate.tickets = value.betlist;
              this.$store.commit(SPORTS_BONUS_CHANGE, value);
            } else {
              Toast('预计奖金计算出错，请重新选择');
              this.$store.commit(SPORTS_BONUS_CHANGE, {min: 0, max: 0, count: 0});
            }
          });
        } else {
          this.$store.commit(SPORTS_BONUS_CHANGE, {min: 0, max: 0, count: 0});
        }
      },
      onOptionSelected () {
        this.clearSeries();
        this.setProjectBonus();
      },
      confirmOptimize () {
        if (this.isMulti) {
          Toast('奖金优化不支持复杂玩法！');
          return;
        }
        if (this.confirm.stakeCount > 99) {
          Toast('奖金优化只支持单注100倍以下！');
          return;
        }
        this.$store.commit(SPORTS_CONFIRM_OPTIMIZE, calculate.getSportTickets(this.bettingList));
        this.$router.push({name: 'SportsOptimize'});
      }
    },
    created () {
      if (this.bettingList.length === 0) {
        this.$store.commit(SPORTS_CONFIRM_SERIES_CLEAR);
        this.$router.back();
      } else {
        if (this.confirm.mode === 1) {
          this.series = [{value: '单关', key: '101'}];
        } else {
          if (this.confirm.series.length > 0) {
            this.series = this.confirm.series;
            this.isMulti = this.confirm.isMulti;
          } else {
            const list = this.getPopupList();
            if (list[0][0]) {
              this.series = [list[0][list[0].length - 1]];
              this.bettingList = this.bettingList.map(v => {
                v.isSure = false;
                return v;
              });
              this.$store.commit(SPORTS_CONFIRM_SERIES_SET, {
                series: this.series, isMulti: this.isMulti
              });
            }
          }
        }
        this.setProjectBonus();
        this.getMineInfo();
      }
    },
    components: {
      VHead,
      SchemeBox,
      ServiceAgreement,
      CustomSelectBox,
      FootballSPFLottery,
      FootballRQSPFLottery,
      FootballBFLottery,
      FootballZJQLottery,
      FootballBQCLottery,
      FootballHHLottery,
      BasketballSFLottery,
      BasketballRFSFLottery,
      BasketballSFCLottery,
      BasketballDXFLottery,
      BasketballHHLottery
    }
  }
</script>

<style>
  .sports-confirm {
    padding-bottom: 135px;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .sports-confirm-container {
    padding: 45px 10px 40px 10px;
    height: 100%;
    overflow-y: auto;
  }
  .sports-confirm-container .operate-wrap {
    position: absolute;
    width: 100%;
    top: 40px; left: 0;
    padding: 5px 5px 0 5px;
    z-index: 2;
    background: #f2f2f2;
  }
  .sports-confirm-container .operate-wrap a{
    border: 1px solid #ddd;
    border-radius: 5px;
    background: white;
    text-align: center;
    width: 48%;
    margin: 5px 1%;
    float: left;
    color: #333;
    padding: 5px;
    font-size: 14px;
  }
  .sports-confirm .bottom-fixed {
    position: absolute;
    bottom: 0;  left:0;
    background: white;
    width: 100%;
    height: 130px;
  }
  .sports-confirm .bottom-fixed .top {
    padding: 10px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  .sports-confirm .bottom-fixed .down-up {
    background: url("../../assets/betting/down_out.png") no-repeat;
    background-size: 100% 100%;
    width: 20px; height: 20px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
  }
  .sports-confirm .bottom-fixed .summary {
    padding: 5px 10px; font-size: 14px;
    color: #666;
  }
  .sports-confirm .bottom-fixed .summary .text {
    padding-bottom: 5px;
  }
  .sports-confirm .bottom-fixed .summary .add-to {
    margin-left: 30px;
    margin-right: 5px;
    vertical-align: middle;
    margin-top: -2px;
    color: red;
    border: 1px solid #ddd;
  }
  .sports-confirm .scheme-delete-icon {
    background: url("../../assets/betting/scheme_delete.png") no-repeat;
    background-size: 100% 100%;
    width: 25px; height: 25px;
  }
  .sports-confirm .scheme-box-item {
    padding: 10px 5px 10px 30px;
    position: relative;
    background: white;
    border-top: 1px dotted #ddd;
  }
  .sports-confirm .scheme-box-item.has-sure {
    padding-right: 40px;
  }
  .sports-confirm .scheme-box-item.has-sure .sure {
    display: block;
  }
  .sports-confirm .scheme-box-item .sure {
    position: absolute;
    width: 30px; height: 30px; line-height: 30px;
    background: #dddddd;
    color: white;
    position: absolute;
    right: 5px; bottom: 18px;
    text-align: center;
    border-radius: 5px;
    display: none;
  }
  .sports-confirm .scheme-box-item .sure.selected {
    background: #e73f40;
  }
  .sports-confirm .scheme-box-item .scheme-delete-icon {
    position: absolute;
    left: 5px; bottom: 18px;
  }
  .sports-confirm .scheme-box-item:first-child {
    border-top: 0;
    padding-top: 0;
  }
  .sports-confirm-container .plus-icon {
    background: url("../../assets/betting/confirm_plus.png") no-repeat;
    background-size: 100% 100%;
    width: 12px; height: 12px;
    display: inline-block;
    vertical-align: middle;
    margin-right:5px;
    margin-top: -2px;
  }
  .sports-confirm-container .clear-icon {
    background: url("../../assets/betting/confirm_clear.png") no-repeat;
    background-size: 100% 100%;
    width: 12px; height: 12px;
    display: inline-block;
    vertical-align: middle;
    margin-right:5px;
    margin-top: -2px;
  }
  .sports-confirm .mint-popup {
    width: 100%;
  }
  .sports-confirm .series-select-popup {
    width: 100%;
    position: relative;
  }
  .sports-confirm .series-select-popup .header-nav a {
    width: 50%; height: 35px; line-height: 35px;
    text-align: center; color: black;
    display: block; float: left;
    background: #f2f2f2;
    font-size: 14px;
  }
  .sports-confirm .series-select-popup .header-nav a.active {
    color: #e73f40; background: white;
  }
  .sports-confirm .series-select-popup .btn-wrap{
    border-top: 1px solid #ddd;
  }
  .sports-confirm .series-select-popup .btn-wrap a {
    border-radius: 0;
    border: 0;
    background: white;
    color: black;
  }
  .sports-confirm .series-select-popup .btn-wrap .col:last-child a {
    color: #e73f40;
    border-left: 1px solid #ddd;
  }
  .sports-confirm .series-select-popup .select-content {
    padding: 4px 0;
  }
  .sports-confirm .series-select-popup .select-content .item {
    width: 23%; margin: 2px 1%;
    height: 28px; line-height: 24px;
    text-align: center; font-size: 12px;
    display: block; float: left;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .sports-confirm .series-select-popup .select-content .item.selected {
    border: 1px solid #e73f40;
    background: url("../../assets/betting/selected.png") right bottom no-repeat;
    background-size: auto 60%;
    color: #e73f40;
  }
  .sports-confirm .arrow-right {
    background: url("../../assets/betting/arrow-right.png") no-repeat;
    background-size: 100% 100%;
    width: 7px; height: 12px;
  }
</style>
