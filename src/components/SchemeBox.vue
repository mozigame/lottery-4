<template>
  <div class="scheme-box">
    <div class="box-top">
      <img src="../assets/scheme_box_top.png" alt="top">
    </div>
    <div class="box-content">
      <slot></slot>
    </div>
    <div class="box-bottom">
      <img src="../assets/scheme_box_bottom.png" alt="bottom">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'schemeBox'
  }
</script>

<style scoped>
  .scheme-box .box-top img,
  .scheme-box .box-bottom img {
    width: 100%;
  }
  .scheme-box .box-bottom,
  .scheme-box .box-top {
    line-height: 0;
    font-size: 0;
  }
  .scheme-box .box-content,
  .scheme-box .box-bottom {
    padding: 0 2.3% 0 2.3%;
  }
</style>
