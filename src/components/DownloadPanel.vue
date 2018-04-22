<template>
  <div class="download-panel" @click="download">
    <img class="logo" src="../assets/down_logo.png" alt="logo">
    <div class="row">
      <div class="col text-sm text-muted">
        <p class="margin-top-10">更多功能请下载</p>
        <p>老虎彩票官方APP</p>
      </div>
      <div class="col col-center text-right">
        <p class="download-btn">立即下载</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'downloadPanel',
    methods: {
      download () {
        location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=co.sihe.tigerlottery';
      }
    }
  }
</script>

<style scoped>
  .download-panel {
    position: fixed;
    width: 100%;
    left: 0; bottom: 0;
    background: white;
    padding-left: 60px;
    height: 50px;
  }
  .download-panel .logo {
    width: 38px; height: 38px;
    position: absolute;
    left: 10px; top: 6px;
  }
  .download-panel .download-btn {
    width: 105px; height: 30px;
    line-height: 30px;
    background: url("../assets/icon/down_btn.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    color: white;
    display: inline-block;
    margin-top: 10px;
    margin-right: 10px;
  }
</style>
