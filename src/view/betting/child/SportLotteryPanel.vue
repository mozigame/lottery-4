<template>
  <div class="sport-lottery-panel" v-show="group.schedules.length > 0">
    <div class="panel-top" @click="changePanelVisible">
      {{group.name}} {{group.weekdayText}} {{group.schedules.length}}场比赛
      <span class="icon" :class="{'up': panelVisible}"></span>
    </div>
    <div class="panel-list" v-show="panelVisible">
      <sport-lottery-panel-item v-for="(schedule, index) in group.schedules"
                                :key="index"
                                :schedule="schedule">
      </sport-lottery-panel-item>
    </div>
  </div>
</template>

<script>
  import SportLotteryPanelItem from './SportLotteryPanelItem.vue';

  export default {
    name: 'sportLotteryPanel',
    props: ['holder', 'filter'],
    data () {
      return {
        panelVisible: true
      }
    },
    computed: {
      group () {
        let group = {
          name: this.holder.name,
          weekdayText: this.holder.weekdayText,
          schedules: [...this.holder.schedules]
        };
        if (this.filter.length > 0) {
          group.schedules = group.schedules.filter(v => {
            return this.filter.includes(v.league);
          });
        }
        return group;
      }
    },
    methods: {
      changePanelVisible () {
        this.panelVisible = !this.panelVisible;
      }
    },
    components: {SportLotteryPanelItem}
  }
</script>

<style>
  .sport-lottery-panel {
    margin-bottom: 1px;
  }
  .sport-lottery-panel .panel-top{
    background: white;
    padding: 5px 10px;
    font-size: 12px;
    position: relative;
  }
  .sport-lottery-panel .panel-top .icon {
    position: absolute;
    right: 10px;
    top: 5px;
    background: url("../../../assets/betting/down_out.png") no-repeat;
    background-size: 100% 100%;
    width: 18px; height: 18px;
    transition: tranform 0.5s;
  }
  .sport-lottery-panel .panel-top .icon.up {
    transform: rotate(180deg);
  }
</style>
