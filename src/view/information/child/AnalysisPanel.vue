<template>
  <div class="analysis-panel">
    <basket-panel-container title="球队数据">
      <template v-if="teams" v-for="team in teams">
        <basket-team-table :team="team"></basket-team-table>
      </template>
    </basket-panel-container>
    <basket-panel-container title="近期交锋">
      <basket-record-table :name="detail.home" :id="detail.home_id" :list="historyRecord.list" :first="true"></basket-record-table>
    </basket-panel-container>
    <basket-panel-container title="客队战绩">
      <basket-record-table :name="detail.guest" :id="detail.guest_id" :list="latestRecord[1].list"></basket-record-table>
    </basket-panel-container>
    <basket-panel-container title="主队战绩">
      <basket-record-table :name="detail.home" :id="detail.home_id" :list="latestRecord[0].list"></basket-record-table>
    </basket-panel-container>
    <basket-panel-container title="未来比赛">
      <template v-for="(record, index) in reverse(futureRecord)" v-if="record">
        <p class="bg-white panel-title-head">
          <img :src="index === 0 ? detail.guest_logo : detail.home_logo" alt="">
          {{record.name}}
        </p>
        <table class="border-bottom-solid">
          <tbody>
          <tr class="bg-gray">
            <td>赛事</td><td>日期</td><td>主队</td><td></td><td>客队</td><td>相隔</td>
          </tr>
          <tr v-for="item in record.list">
            <td>{{item.league}}</td>
            <td>{{item.date | dateFormat('yyyy-MM-dd')}}</td>
            <td>{{item.guest_team}}</td>
            <td>VS</td>
            <td>{{item.home_team}}</td>
            <td>{{item.date_interval}}天</td>
          </tr>
          </tbody>
        </table>
      </template>
    </basket-panel-container>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import BasketRecordTable from './BasketRecordTable.vue';
  import BasketTeamTable from './BasketTeamTable.vue';
  import BasketPanelContainer from './BasketPanelContainer.vue'
  export default {
    name: 'analysisPanel',
    methods: {
      handleChange (index) {
        console.log(index);
      },
      reverse (arr) {
        return [...arr].reverse();
      }
    },
    computed: {
      ...mapState({
        teams: state => state.information.teams,
        historyRecord: state => state.information.historyRecord,
        detail: state => state.information.detail,
        latestRecord: state => state.information.latestRecord,
        futureRecord: state => state.information.futureRecord
      })
    },
    components: {BasketRecordTable, BasketTeamTable, BasketPanelContainer}
  }
</script>

<style>
  .football-information .panel-title {
    background: white url("../../../assets/information/football_live_title_bg.png") no-repeat bottom;
    background-size: 100% 75%;
    height: 35px; line-height: 25px;
    font-style: italic;
    color: white;
    padding-top: 10px;
    font-size: 14px;
    padding-left: 5px;
  }
  .football-information .all-icon-tip {
    padding: 5px 0 5px 5px;
  }
  .football-information .all-icon-tip span {
    display: inline-block;
    font-size: 12px;
    vertical-align: middle;
  }
  .football-information .block {
    background-color: transparent;
  }
  .football-information .item {
    margin: 0;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    color: #999;
  }
  .football-information .item .item-center {
    background: #4FAF50;
    width: 50px;
  }
  .football-information .item .item-left,
  .football-information .item .item-right {
    padding: 5px;
  }
  .football-information table {
    font-size: 12px;
    text-align: center;
    width: 100%;
    background: white;
    border-collapse:collapse;
  }
  .football-information table tr.bg-f6 th{
    background-color: #f6f6f6;
  }
  .football-information table th{
    color: #999999;
    font-weight: normal;
    padding: 8px 0;
  }
  .football-information table td {
    padding: 5px 0;
  }
  .football-information .border-bottom-solid{
    border-bottom: 1px solid #dddddd;
  }
  .football-information .panel-title span{
    float: right;
    color: #999999;
    font-size: 12px;
    padding: 0 10px;
    width: auto;
  }
  .football-information .panel-title span:before{
    display: inline-block;
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50px;
    background-color: #e73f40;
    left: 2px;
    top: 10px;
    position: absolute;
  }

  .football-information  .col span{
    display: inline-block;
    padding: 5px 0;
  }
  .football-information  .active{
    color: #333333;
  }
  .football-information  .active span{
    border-bottom: 2px solid #3f6ee7;
  }
  .football-information  .panel-title-head {
    padding: 10px;
  }
  .football-information .panel-title-head img {
    vertical-align: middle;
    margin-top: -3px;
    width: 20px; height: 20px;
  }
  .football-information .bg-gray {
    background: #f6f6f6;
  }
</style>
