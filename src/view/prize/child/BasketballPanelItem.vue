<template>
  <div class="basketball-panel-item">
    <div class="text-center text-normal">
      {{data.guest}}
       VS
      {{data.home}}
      <span class="text-sm text-default" :class="data.letPointColor">[{{data.letPointText}}]</span>
   </div>
    <div class="box">
      <div class="box-content clear">
        <div class="box-item"><span>玩法</span></div>
        <div class="box-item"><span>比分</span></div>
        <div class="box-item"><span>胜负</span></div>
        <div class="box-item sfc"><span>胜分差</span></div>
        <div class="box-item"><span>大小分</span></div>
      </div>
      <div class="box-content clear">
        <div class="box-item"><span>结果</span></div>
        <div class="box-item"><span class="text-primary">{{data.finalScoreText}}</span></div>
        <div class="box-item"><span :class="data.sf.color">{{data.sf.text}}</span></div>
        <div class="box-item sfc"><span>{{data.sfc}}</span></div>
        <div class="box-item"><span>{{data.basePointText}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'basketballPanelItem',
    props: ['data']
  }
</script>

<style>
  .basketball-panel-item .box-item {
    width: 18%;
  }
  .basketball-panel-item .box-item.sfc {
    width: 28%;
  }
</style>
