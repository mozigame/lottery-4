<template>
  <div class="sfc-lottery-container sport-lottery-container">
    <div class="issue-head text-light">
      <span @click="onPopupChange">
        第{{sfc.current.value}}期
        <span class="expandable"></span>
        <span class="hot-sale" v-if="currentIssue.sales"></span>
        <span class="no-sale" v-else></span>
      </span>
      <span class="pull-right" v-if="currentIssue.sales">
        截止日期：{{currentIssue.end_time|dateFormat('yyyy-MM-dd hh:mm:ss')}}
      </span>
      <span class="pull-right" v-else>
        开售日期：{{currentIssue.start_time|dateFormat('yyyy-MM-dd hh:mm:ss')}}
      </span>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="top">
      <div class="issue-select-panel">
        <span v-for="item in sfc.issues"
              :class="{checked: sfc.current.key === item.key}"
              @click="onChangeIssue(item)"
              class="issue-item">
          第{{item.value}}期
        </span>
      </div>
    </mt-popup>
    <sport-lottery-panel-item v-for="(schedule, index) in currentIssue.schedules"
                              :key="index"
                              :schedule="schedule">
    </sport-lottery-panel-item>
    <div class="bottom-fixed">
      <div class="content">
        <div class="clear-icon" @click="clearSelected"></div>
        <div class="text">
          <span class="text-muted">{{currentIssue.bottomTip}}</span>
          <a href="javascript:;" @click="confirmClick" class="btn pull-right" :class="{disabled: !currentIssue.confirmStatus}">确认</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Popup } from 'mint-ui';
  import Vue from 'vue';
  import {mapState} from 'vuex';
  import {SFC_CHANGE_ISSUE, SFC_BETTING_CONFIRM} from '../../../store/betting/types';
  import SportLotteryPanelItem from './SportLotteryPanelItem.vue';
  Vue.component(Popup.name, Popup);
  export default {
    name: 'sfcLotteryContainer',
    data () {
      return {
        popupVisible: false
      }
    },
    computed: {
      ...mapState({
        issues: state => state.betting[state.betting.lottery],
        sfc: state => state.betting.sfc
      }),
      currentIssue () {
        return this.issues[this.sfc.current.key] || {};
      }
    },
    methods: {
      onPopupChange () {
        this.popupVisible = !this.popupVisible;
      },
      onChangeIssue (item) {
        if (this.sfc.key !== item.key) {
          this.$store.commit(SFC_CHANGE_ISSUE, item);
          this.onPopupChange();
        }
      },
      clearSelected () {
        this.currentIssue.clear();
      },
      confirmClick () {
        this.$store.commit(SFC_BETTING_CONFIRM);
        this.$router.push({ name: 'SFCConfirm' });
      }
    },
    components: {SportLotteryPanelItem}
  }
</script>

<style>
  .sfc-lottery-container {
    padding-bottom: 45px;
  }
  .sfc-lottery-container .issue-head {
    padding: 5px; font-size: 12px;
    border-bottom: 1px solid #ddd;
    background: white;
    width: 100%;
  }
  .sfc-lottery-container .issue-head .hot-sale,
  .sfc-lottery-container .issue-head .no-sale {
    width: 55px; height: 17px;
    display: inline-block;
    vertical-align: middle;
    margin-top: -5px;
  }
  .sfc-lottery-container .issue-head .hot-sale {
    background: url("../../../assets/betting/sfc_sale.png") no-repeat;
    background-size: 100% 100%;
  }
  .sfc-lottery-container .issue-head .no-sale {
    background: url("../../../assets/betting/sfc_un_sale.png") no-repeat;
    background-size: 100% 100%;
  }
  .sfc-lottery-container .issue-head .expandable {
    width: 10px; height: 10px;
    display: inline-block;
    background: url("../../../assets/betting/expandable.png") no-repeat;
    background-size: 100% 100%;
  }
  .sfc-lottery-container .mint-popup-top {
    width: 100%;
  }
  .sfc-lottery-container .issue-select-panel {
    width: 100%;
    background: white;
  }
  .sfc-lottery-container .issue-select-panel .issue-item {
    width: 33.3%; float: left;
    padding: 10px 0;
    text-align: center;
    font-size: 14px;
  }
  .sfc-lottery-container .issue-select-panel .issue-item.checked {
    color: #e73f40;
  }
</style>
