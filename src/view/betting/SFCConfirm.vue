<template>
  <div class="sfc-confirm sports-confirm">
    <v-head :title="title"></v-head>
    <div class="sports-confirm-container">
      <div class="operate-wrap">
        <a href="javascript:;" @click="addBetting"><span class="plus-icon"></span>编辑/添加投注</a>
        <a href="javascript:;" @click="clearBettingList"><span class="clear-icon"></span>清空</a>
      </div>
      <scheme-box>
        <div class="scheme-box-item has-sure" v-for="(betting, key) in bettingList">
          <span class="scheme-delete-icon" v-if="betting.lotteryId === 21" @click="deleteBetting(key)"></span>
          <sfc-s-p-f-lottery @onOptionSelected="onOptionSelected" :schedule="betting"></sfc-s-p-f-lottery>
          <span class="sure" v-if="betting.lotteryId === 21" :class="{selected: betting.isSure}" @click="addSure(betting)">胆</span>
        </div>
      </scheme-box>
      <service-agreement></service-agreement>
    </div>
    <div class="bottom-fixed">
      <div class="row top">
        <div class="col">
          <custom-select-box @change="multipleChange" label="倍数" :value="confirm.multiple"></custom-select-box>
        </div>
        <div class="col text text-right">
          <p class="text-sm">{{confirm.stakeCount}}注 {{confirm.multiple}}倍</p>
          <p class="text-primary">共{{confirm.stakeCount * confirm.multiple * 2}}元</p>
        </div>
      </div>
      <div class="summary">
        <a href="javascript:;" class="btn text-center" @click="confirmPayment">付款</a>
      </div>
    </div>
  </div>
</template>

<script>
  import VHead from '../../components/VHead.vue';
  import SchemeBox from '../../components/SchemeBox.vue';
  import ServiceAgreement from '../../components/ServiceAgreement.vue';
  import CustomSelectBox from '../../components/CustomSelectBox.vue';
  import SfcSPFLottery from './child/SfcSPFLottery.vue';
  import {SFC_CALCULATOR_STACK, SPORTS_MULTIPLE_CHANGE, SFC_CONFIRM_PAYMENT,
    SPORTS_CONFIRM_DELETE_TICKET, SPORTS_CONFIRM_CLEAR_TICKETS} from '../../store/betting/types';
  import {mapActions, mapState} from 'vuex';
  import Toast from '../../common/toast';
  import SfcCalculator from '../../model/common/SfcCalculator';
  import { MINE_INFO } from '../../store/user/types';
  export default {
    name: 'sfcConfirm',
    computed: {
      ...mapState({
        bettingList: state => state.betting.sportConfirm.bettingList,
        confirm: state => state.betting.sportConfirm,
        issue: state => state.betting.sfc.current,
        lottery: state => state.betting.lottery,
        mine: state => state.user.mine
      }),
      ...mapActions({
        getMineInfo: MINE_INFO
      }),
      title () {
        return parseInt(this.$store.state.betting.lottery) === 20 ? '十四场胜负' : '任选九';
      }
    },
    methods: {
      onOptionSelected () {
        this.$store.commit(SFC_CALCULATOR_STACK);
      },
      multipleChange (m) {
        this.$store.commit(SPORTS_MULTIPLE_CHANGE, m);
      },
      addBetting () {
        this.$router.back();
      },
      clearBettingList () {
        this.$store.commit(SPORTS_CONFIRM_CLEAR_TICKETS);
        this.$store.commit(SFC_CALCULATOR_STACK);
      },
      deleteBetting (index) {
        this.$store.commit(SPORTS_CONFIRM_DELETE_TICKET, index);
        this.$store.commit(SFC_CALCULATOR_STACK);
      },
      addSure (betting) {
        if (this.bettingList.length > 9) {
          let count = 0;
          this.bettingList.map(betting => {
            betting.isSure && count++;
          });
          if (count >= 8 && betting.isSure) {
            betting.isSure = false;
          } else if (count < 8) {
            betting.isSure = !betting.isSure;
          }
          this.$store.commit(SFC_CALCULATOR_STACK);
        }
      },
      confirmPayment () {
        if (this.confirm.multiple <= 0) {
          Toast('倍数不能小于1');
          return;
        }
        if (this.confirm.stakeCount <= 0) {
          Toast('注数不能小于1');
          return;
        }
//        if (this.mine.balance < (this.confirm.multiple * this.confirm.stakeCount * 2)) {
//          Toast('余额不足');
//          this.$router.push({ name: 'Payment', query: {lack: this.confirm.multiple * this.confirm.stakeCount * 2 - this.mine.balance} });
//        }
        let result = {
          issue_no: this.issue.value,
          multiple: this.confirm.multiple,
          play_type: 101,
          bet_type: SfcCalculator.bettingType(this.bettingList),
          lottery_id: this.lottery,
          stake_count: this.confirm.stakeCount,
          total_amount: this.confirm.multiple * this.confirm.stakeCount * 2,
          schedule_orders: this.bettingList.filter(betting => betting.selected.length > 0).map(betting => {
            let selected = [];
            betting.selected.map(s => selected.push(s.text));
            return {
              bet_number: selected.join(','),
              is_sure: betting.isSure ? 1 : 0,
              round_id: betting.round_id
            }
          })
        }
        this.$store.dispatch(SFC_CONFIRM_PAYMENT, result).then(() => {
          if (this.confirm.id) {
            if (this.mine.balance < (this.confirm.multiple * this.confirm.stakeCount * 2)) {
              Toast('余额不足');
              this.$router.push({ name: 'Payment', query: {lack: (this.confirm.multiple * this.confirm.stakeCount * 2 - this.mine.balance).toFixed(2)} });
            } else {
              this.$router.push({ name: 'PaymentOrder', query: {id: this.confirm.id, sign: this.confirm.sign, product_name: 'LHCP'} });
            }
          } else {
            this.$router.push({ name: 'Login', query: {redirect: this.$router.currentRoute.path} });
          }
        });
      }
    },
    created () {
      this.getMineInfo();
    },
    components: {
      VHead, SchemeBox, ServiceAgreement, CustomSelectBox, SfcSPFLottery
    }
  }
</script>

<style>
  .sfc-confirm.sports-confirm .bottom-fixed {
    height: 110px;
  }
</style>
