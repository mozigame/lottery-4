<template>
  <div class="integral-panel">
    <div class="panel-header row">
      <a href="javascript:;" class="col"
         :class="{'active': index === activeIndex}"
         @click="changeTabIndex(index)"
         v-for="(item, index) in tabItem">
        {{item}}
    </a>
    </div>
    <template v-if="points[activeIndex].list">
      <integral-table :list="points[activeIndex].list"></integral-table>
    </template>
  </div>
</template>

<script>
  import IntegralTable from './IntegralTable.vue';
  const tabItem = ['总积分', '主场积分', '客场积分']
  export default {
    name: 'integralPanel',
    components: { IntegralTable },
    data () {
      return {
        tabItem: tabItem,
        activeIndex: 0
      }
    },
    computed: {
      points () {
        return this.$store.state.information.points;
      }
    },
    methods: {
      changeTabIndex (index) {
        if (this.activeIndex !== index) {
          this.activeIndex = index;
        }
      }
    }
  }
</script>

<style>
  .integral-panel .panel-header {
    padding: 6px 10px;
    border-radius: 10px;
    width: 100%;
    text-align: center;
    font-size: 14px;
  }
  .integral-panel .panel-header a {
    color: #e73f40;
    background: white;
    padding: 3px;
    border: 1px solid #e73f40;
  }
  .integral-panel .panel-header a:first-child {
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    border-right: none;
  }
  .integral-panel .panel-header a:last-child {
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    border-left: 0;
  }
  .integral-panel .panel-header a.active {
    background: #e73f40;
    color: white;
  }
</style>
