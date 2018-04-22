<template>
  <div class="sports-prize-panel">
    <div class="panel-top" @click="changePanelVisible">
      {{holder.name}} {{holder.schedules.length}}场比赛
      <span class="icon" :class="{'up': panelVisible}"></span>
    </div>
    <div class="panel-list" v-show="panelVisible">
      <div class="row panel-list-content" v-for="item in holder.schedules">
        <div class="col col-25 col-center text-center text-light item-left">
          {{item.round_no}} <br/> {{item.league}}
        </div>
        <div class="col col-75 item-right">
          <template v-if="item.isFootball">
            <football-panel-item :data="item"></football-panel-item>
          </template>
          <template v-else-if="item.isBasketball">
            <basketball-panel-item :data="item"></basketball-panel-item>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FootballPanelItem from './FootballPanelItem.vue';
  import BasketballPanelItem from './BasketballPanelItem.vue';

  export default {
    name: 'sportsPrizePanel',
    props: ['holder'],
    data () {
      return {
        panelVisible: true
      }
    },
    methods: {
      changePanelVisible () {
        this.panelVisible = !this.panelVisible;
      }
    },
    components: {FootballPanelItem, BasketballPanelItem}
  }
</script>

<style>
  .sports-prize-panel {
    margin-bottom: 1px;
  }
  .sports-prize-panel .panel-top{
    background: white;
    padding: 5px 10px;
    font-size: 12px;
    position: relative;
  }
  .sports-prize-panel .panel-top .icon {
    position: absolute;
    right: 10px;
    top: 5px;
    background: url("../../../assets/betting/down_out.png") no-repeat;
    background-size: 100% 100%;
    width: 18px; height: 18px;
    transition: tranform 0.5s;
  }
  .sports-prize-panel .panel-top .icon.up {
    transform: rotate(180deg);
  }
  .sports-prize-panel .item-left {
    font-size: 12px;
    line-height: 20px;
  }
  .sports-prize-panel .panel-list-content {
    padding: 5px 10px 5px 0;
    border-bottom: 1px solid #ddd;
  }
  .sports-prize-panel .box {
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: center;
    font-size: 12px;
    background: white;
    margin-top: 5px;
  }
  .sports-prize-panel .box .box-content:first-child {
    border-bottom: 1px solid #ddd;
  }
  .sports-prize-panel .box .box-item {
    padding: 5px 0; float: left;
  }
  .sports-prize-panel .box .box-item span {
    display: block;
    border-right: 1px dotted #ddd;
  }
  .sports-prize-panel .box .box-item:last-child span {
    border: none;
  }
  .sports-prize-panel span.green {
    color: #4faf50;
  }
  .sports-prize-panel span.yellow {
    color: #f8d8a4;
  }
  .sports-prize-panel span.blue {
    color: #3f6ee7 ;
  }
</style>
