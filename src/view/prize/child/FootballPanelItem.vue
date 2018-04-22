<template>
  <div class="football-panel-item">
    <div class="text-center text-normal">
      {{data.home}}
      <span class="text-sm text-default" :class="data.letPointColor">[{{data.letPointText}}]</span>
       VS
      {{data.guest}}
    </div>
    <div class="box">
      <div class="box-content clear">
        <div class="box-item"><span>玩法</span></div>
        <div class="box-item"><span>比分</span></div>
        <div class="box-item"><span>胜平负</span></div>
        <div class="box-item"><span>让球</span></div>
        <div class="box-item"><span>总进球</span></div>
        <div class="box-item"><span>半全场</span></div>
      </div>
      <div class="box-content clear">
        <div class="box-item"><span>结果</span></div>
        <div class="box-item"><span class="text-primary">{{data.score.final}}</span></div>
        <div class="box-item"><span :class="data.spf.color">{{data.spf.text}}</span></div>
        <div class="box-item"><span :class="data.rqspf.color">{{data.rqspf.text}}</span></div>
        <div class="box-item"><span>{{data.zjq}}</span></div>
        <div class="box-item"><span>{{data.bqc}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'footballPanelItem',
    props: ['data']
  }
</script>

<style>
  .football-panel-item .box-item {
    width: 16.6%;
  }
</style>
