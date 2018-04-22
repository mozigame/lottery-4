<template>
  <div class="digital-confirm" :class="{'k3': isK3()}">
    <v-head :title="current.lottery_name"></v-head>
    <div class="digital-confirm-container">
      <div class="operate-wrap">
        <a href="javascript:;" @click="increaseNum"><span class="plus-icon"></span>自选号码</a>
        <a href="javascript:;" @click="randomTicket"><span class="plus-icon"></span>机选一注</a>
        <a href="javascript:;" @click="confirmClearTickets"><span class="clear-icon"></span>清空</a>
      </div>
      <scheme-box>
        <div class="scheme-box-item" v-for="(ticket, key) in confirm.bettingList">
          <span class="scheme-delete-icon" @click="confirmDeleteTicket(key)"></span>
          <digital-scheme-item :key="key" :ticket="ticket"></digital-scheme-item>
        </div>
      </scheme-box>
      <service-agreement></service-agreement>
    </div>
    <div class="bottom-fixed">
      <div class="row top">
        <div class="col">
          <custom-select-box @change="followTimesChange" label="追号" :value="confirm.followTimes"></custom-select-box>
        </div>
        <div class="col">
          <custom-select-box @change="multipleChange" class="pull-right" label="倍数" :value="confirm.multiple"></custom-select-box>
        </div>
      </div>
      <div class="summary">
        <div class="text">
          <span>{{stakeCount}}注 {{confirm.followTimes}}期 {{confirm.multiple}}倍</span>
          <span v-if="current.addTo"><input type="checkbox" id="addTo" class="add-to" v-model="addTo"><label for="addTo">追加投注</label></span>
          <div class="pull-right text-primary text-ml">共{{totalAmount}}元</div>
        </div>
        <div>
          <a href="javascript:;" class="btn text-center" @click="confirmPayment">付款</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VHead from '../../components/VHead.vue';
  import SchemeBox from '../../components/SchemeBox.vue';
  import ServiceAgreement from '../../components/ServiceAgreement.vue';
  import CustomSelectBox from '../../components/CustomSelectBox.vue';
  import DigitalSchemeItem from './child/DigitalSchemeItem.vue';
  import {CONFIRM_DELETE_TICKET, CONFIRM_CLEAR_TICKETS, DIGITAL_CONFIRM_PAYMENT,
    MULTIPLE_CHANGE, FOLLOW_TIMES_CHANGE, CONFIRM_RANDOM_TICKET} from '../../store/betting/types';
  import {mapActions, mapState, mapMutations} from 'vuex';
  import Toast from '../../common/toast';
  import Lottery from '../../model/common/Lottery';
  import { MINE_INFO } from '../../store/user/types';

  export default {
    name: 'digitalConfirm',
    data () {
      return {
        addTo: false
      }
    },
    computed: {
      ...mapState({
        lottery: state => state.betting.lottery,
        current: state => state.betting.currentLottery,
        mine: state => state.user.mine
      }),
      stakeCount () {
        let count = 0;
        this.confirm.bettingList.map(value => {
          count += value.stakeCount;
        });
        return count;
      },
      totalAmount () {
        return parseInt(this.stakeCount * this.confirm.followTimes * this.confirm.multiple * (this.addTo ? 3 : 2))
      },
      confirm () {
        let cm = this.$store.state.betting.confirm;
        if (this.current.addTo) {
          cm.bettingList = cm.bettingList.map(value => {
            if (this.addTo) {
              value.playTypeText = '追加';
              value.playType = 2;
              value.totalAmount = value.stakeCount * 3
            } else {
              value.playTypeText = '普通';
              value.playType = 1;
              value.totalAmount = value.stakeCount * 2
            }
            return value;
          });
        }
        return cm;
      }
    },
    methods: {
      ...mapActions({
        getMineInfo: MINE_INFO
      }),
      ...mapMutations({
        confirmDeleteTicket: CONFIRM_DELETE_TICKET,
        confirmClearTickets: CONFIRM_CLEAR_TICKETS,
        followTimesChange: FOLLOW_TIMES_CHANGE,
        multipleChange: MULTIPLE_CHANGE,
        randomTicket: CONFIRM_RANDOM_TICKET
      }),
      isK3 () {
        return Lottery.isK3(this.lottery);
      },
      increaseNum () {
        this.$router.back();
      },
      confirmPayment () {
        if (this.confirm.followTimes < 1) {
          Toast('追号期数不能小于1');
          return;
        }
        if (this.confirm.multiple < 1) {
          Toast('倍数不能小于1');
          return;
        }
//        if (this.mine.balance < (this.stakeCount * this.confirm.followTimes * this.confirm.multiple * (this.addTo ? 3 : 2))) {
//          Toast('余额不足');
//          this.$router.push({ name: 'Payment', query: {lack: this.stakeCount * this.confirm.followTimes * this.confirm.multiple * (this.addTo ? 3 : 2) - this.mine.balance} });
//        }
        const result = {
          multiple: this.confirm.multiple,
          follow_times: this.confirm.followTimes,
          lottery_id: this.current.lottery_id,
          issue_id: this.current.no,
          coupon_id: 0,
          total_amount: this.stakeCount * this.confirm.followTimes * this.confirm.multiple * (this.addTo ? 3 : 2),
          tickets: this.confirm.bettingList.map(value => {
            return {
              bet_number: value.betNumber,
              play_type: value.playType,
              bet_type: value.betType,
              stake_count: value.stakeCount,
              total_amount: value.totalAmount
            }
          })
        };
        this.$store.dispatch(DIGITAL_CONFIRM_PAYMENT, result).then(() => {
          if (this.confirm.id) {
            if (this.mine.balance < (this.stakeCount * this.confirm.followTimes * this.confirm.multiple * (this.addTo ? 3 : 2))) {
              Toast('余额不足');
              this.$router.push({ name: 'Payment', query: {lack: (this.stakeCount * this.confirm.followTimes * this.confirm.multiple * (this.addTo ? 3 : 2) - this.mine.balance).toFixed(2)} });
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
      if (!this.lottery) {
        this.$router.back();
      }
      this.getMineInfo();
    },
    components: {SchemeBox, ServiceAgreement, VHead, CustomSelectBox, DigitalSchemeItem}
  }
</script>

<style>
  .digital-confirm {
    padding-bottom: 135px;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .digital-confirm.k3 .text-green {
    color: #3b9663;
  }
  .digital-confirm.k3 .bottom-fixed .btn {
    background: #3b9663;
  }
  .digital-confirm-container {
    padding: 45px 10px 40px 10px;
    height: 100%;
    overflow-y: auto;
  }
  .digital-confirm-container .operate-wrap {
    position: absolute;
    width: 100%;
    top: 40px; left: 0;
    padding: 5px 5px 0 5px;
    z-index: 2;
    background: #f2f2f2;
  }
  .digital-confirm-container .operate-wrap a{
    border: 1px solid #ddd;
    border-radius: 5px;
    background: white;
    text-align: center;
    width: 31%;
    margin: 5px 1%;
    float: left;
    color: #333;
    padding: 5px;
    font-size: 14px;
  }
  .digital-confirm .bottom-fixed {
    position: absolute;
    bottom: 0;  left:0;
    background: white;
    width: 100%;
    height: 130px;
  }
  .digital-confirm .bottom-fixed .top {
    padding: 10px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  .digital-confirm .bottom-fixed .summary {
    padding: 5px 10px; font-size: 14px;
    color: #666;
  }
  .digital-confirm .bottom-fixed .summary .text {
    padding-bottom: 5px;
  }
  .digital-confirm .bottom-fixed .summary .add-to {
    margin-left: 30px;
    margin-right: 5px;
    vertical-align: middle;
    margin-top: -2px;
    color: red;
    border: 1px solid #ddd;
  }
  .digital-confirm .scheme-delete-icon {
    background: url("../../assets/betting/scheme_delete.png") no-repeat;
    background-size: 100% 100%;
    width: 25px; height: 25px;
  }
  .digital-confirm .scheme-box-item {
    padding: 10px 5px 10px 45px;
    position: relative;
    background: white;
    border-top: 1px dotted #ddd;
  }
  .digital-confirm .scheme-box-item .scheme-delete-icon {
    position: absolute;
    left: 10px; bottom: 18px;
  }
  .digital-confirm .scheme-box-item:first-child {
    border-top: 0;
    padding-top: 0;
  }
  .digital-confirm-container .plus-icon {
    background: url("../../assets/betting/confirm_plus.png") no-repeat;
    background-size: 100% 100%;
    width: 12px; height: 12px;
    display: inline-block;
    vertical-align: middle;
    margin-right:5px;
    margin-top: -2px;
  }
  .digital-confirm-container .clear-icon {
    background: url("../../assets/betting/confirm_clear.png") no-repeat;
    background-size: 100% 100%;
    width: 12px; height: 12px;
    display: inline-block;
    vertical-align: middle;
    margin-right:5px;
    margin-top: -2px;
  }
</style>
