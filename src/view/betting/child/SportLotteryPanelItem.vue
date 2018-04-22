<template>
  <div class="sport-lottery-panel-item">
    <div class="row padding">
      <div class="col col-20 col-center text-center text-sm text-light" @click="showTip">
        <div>{{schedule.round_no}}</div>
        <div>{{schedule.league}}</div>
        <div>{{schedule.end_time | dateFormat('hh:mm')}}截止</div>
        <div><span class="down-gray-icon" :class="{'up': tipVisible}"></span></div>
      </div>
      <div class="col col-80">
        <template v-if="schedule.lotteryId === 601">
          <football-s-p-f-lottery :schedule="schedule"></football-s-p-f-lottery>
        </template>
        <template v-else-if="schedule.lotteryId === 602">
          <football-r-q-s-p-f-lottery :schedule="schedule"></football-r-q-s-p-f-lottery>
        </template>
        <template v-else-if="schedule.lotteryId === 603">
          <football-b-f-lottery :schedule="schedule"></football-b-f-lottery>
        </template>
        <template v-else-if="schedule.lotteryId === 604">
          <football-z-j-q-lottery :schedule="schedule"></football-z-j-q-lottery>
        </template>
        <template v-else-if="schedule.lotteryId === 605">
          <football-b-q-c-lottery :schedule="schedule"></football-b-q-c-lottery>
        </template>
        <template v-else-if="schedule.lotteryId === 606">
          <football-h-h-lottery :schedule="schedule"></football-h-h-lottery>
        </template>
        <template v-else-if="schedule.lotteryId === 701">
          <basketball-s-f-lottery :schedule="schedule"></basketball-s-f-lottery>
        </template>
        <template v-else-if="schedule.lotteryId === 702">
          <basketball-r-f-s-f-lottery :schedule="schedule"></basketball-r-f-s-f-lottery>
        </template>
        <template v-else-if="schedule.lotteryId === 703">
          <basketball-s-f-c-lottery :schedule="schedule"></basketball-s-f-c-lottery>
        </template>
        <template v-else-if="schedule.lotteryId === 704">
          <basketball-d-x-f-lottery :schedule="schedule"></basketball-d-x-f-lottery>
        </template>
        <template v-else-if="schedule.lotteryId === 705">
          <basketball-h-h-lottery :schedule="schedule"></basketball-h-h-lottery>
        </template>
        <template v-else-if="schedule.lotteryId === 20">
          <sfc-s-p-f-lottery :schedule="schedule"></sfc-s-p-f-lottery>
        </template>
        <template v-else-if="schedule.lotteryId === 21">
          <sfc-s-p-f-lottery :schedule="schedule"></sfc-s-p-f-lottery>
        </template>
      </div>
    </div>
    <div class="item-tip" v-show="tipVisible">
      <template v-if="schedule.lotteryType === 'football' || schedule.lotteryType === 'sfc'">
        <p class="item-tip-list">
          <span class="item-tip-list-left">历史交锋</span>
          近{{schedule.history_fight.games_count}}次交战，
          {{schedule.home}}
          <span class="text-primary">{{schedule.history_fight.win}}胜</span>
          <span class="blue">{{schedule.history_fight.equal}}平</span>
          <span class="green">{{schedule.history_fight.lose}}负</span>
        </p>
        <p class="item-tip-list">
          <span class="item-tip-list-left">近期战绩</span>
          主队{{schedule.latest_record.home.win}}胜{{schedule.latest_record.home.equal}}平{{schedule.latest_record.home.lose}}负，
          客队{{schedule.latest_record.guest.win}}胜{{schedule.latest_record.guest.equal}}平{{schedule.latest_record.guest.lose}}负
        </p>
        <p class="item-tip-list">
          <span class="item-tip-list-left">平均赔率</span>
          <span class="item-tip-list-odds">{{schedule.average_win_odds}}</span>
          <span class="item-tip-list-odds">{{schedule.average_equal_odds}}</span>
          <span class="item-tip-list-odds">{{schedule.average_lose_odds}}</span>
        </p>
        <p class="item-tip-bottom football" @click="goDetail">详细赛事分析</p>
      </template>
      <template v-else-if="schedule.lotteryType === 'basketball'">
        <p class="item-tip-list">
          <span class="item-tip-list-left">历史交锋</span>
          近{{schedule.history_fight.games_count}}次交战，
          {{schedule.home}}
          <span class="text-primary">{{schedule.history_fight.win}}胜</span>
          <span class="green">{{schedule.history_fight.lose}}负</span>
        </p>
        <p class="item-tip-list">
          <span class="item-tip-list-left">近期战绩</span>
          客队{{schedule.latest_record.guest.win}}胜 {{schedule.latest_record.guest.lose}}负，
          主队{{schedule.latest_record.home.win}}胜 {{schedule.latest_record.home.lose}}负
        </p>
        <p class="item-tip-list">
          <span class="item-tip-list-left">平均赔率</span>
          <span class="item-tip-list-odds">{{schedule.average_lose_odds}}</span>
          <span class="item-tip-list-odds">{{schedule.average_win_odds}}</span>
        </p>
        <p class="item-tip-bottom basketball" @click="goDetail">详细赛事分析</p>
      </template>
    </div>
  </div>
</template>

<script>
  import FootballSPFLottery from './FootballSPFLottery.vue';
  import FootballRQSPFLottery from './FootballRQSPFLottery.vue';
  import FootballBFLottery from './FootballBFLottery.vue';
  import FootballZJQLottery from './FootballZJQLottery.vue';
  import FootballBQCLottery from './FootballBQCLottery.vue';
  import FootballHHLottery from './FootballHHLottery.vue';
  import BasketballSFLottery from './BasketballSFLottery.vue';
  import BasketballRFSFLottery from './BasketballRFSFLottery.vue';
  import BasketballSFCLottery from './BasketballSFCLottery.vue';
  import BasketballDXFLottery from './BasketballDXFLottery.vue';
  import BasketballHHLottery from './BasketballHHLottery.vue';
  import SfcSPFLottery from './SfcSPFLottery.vue';
  import Toast from '../../../common/toast';

  export default {
    name: 'sportLotteryPanelItem',
    props: ['schedule'],
    data () {
      return {
        tipVisible: false
      }
    },
    methods: {
      showTip () {
        this.tipVisible = !this.tipVisible;
      },
      goDetail () {
        if (this.schedule.third_party_schedule_id) {
          this.$router.push({
            name: this.schedule.lotteryType === 'basketball' ? 'BasketballInformation' : 'FootballInformation',
            params: {id: this.schedule.third_party_schedule_id}
          })
        } else {
          Toast('暂时没有详细信息');
        }
      }
    },
    components: {
      FootballSPFLottery,
      FootballRQSPFLottery,
      FootballBFLottery,
      FootballZJQLottery,
      FootballBQCLottery,
      FootballHHLottery,
      BasketballSFLottery,
      BasketballRFSFLottery,
      BasketballDXFLottery,
      BasketballSFCLottery,
      BasketballHHLottery,
      SfcSPFLottery
    }
  }
</script>

<style>
  .sport-lottery-panel-item {
    border-bottom: 1px solid #ddd;
  }
  .sport-lottery-panel-item .down-gray-icon {
    background: url("../../../assets/betting/down_gray.png") no-repeat;
    background-size: 100% 100%;
    width: 12px; height: 8px;
    display: inline-block;
    margin-top: 8px;
    transition: transform 0.5s;
  }
  .sport-lottery-panel-item .down-gray-icon.up {
    transform: rotate(180deg);
  }
  .sport-lottery-panel-item .item-tip {
    background: black;
    color: white;
    font-size: 14px;
    padding: 0 10px;
  }
  .sport-lottery-panel-item .item-tip .item-tip-list {
    padding: 5px;
    border-bottom: 1px dotted #777777;
    font-size: 12px;
  }
  .sport-lottery-panel-item .item-tip-list-odds {
    margin-right: 50px;
  }
  .sport-lottery-panel-item .item-tip .item-tip-list-left {
    width: 80px; display: inline-block;
    color: #6f6f70;
  }
  .sport-lottery-panel-item .item-tip .item-tip-bottom {
    padding: 10px; position: relative;
    left: 50%; margin-left: -65px;
    color: #feb62c; padding-left: 30px;
    width: 130px;
  }
  .sport-lottery-panel-item .item-tip .item-tip-bottom.basketball {
    background: url("../../../assets/basketball.png") no-repeat left center;
    background-size: auto 50%;
  }
  .sport-lottery-panel-item .item-tip .item-tip-bottom.football {
    background: url("../../../assets/ball.png") no-repeat left center;
    background-size: auto 50%;
  }
  .sport-lottery-panel-item span.green {
    color: #4faf50;
  }
  .sport-lottery-panel-item span.blue {
    color: #3f6ee7;
  }
</style>
