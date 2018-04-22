<template>
  <div class="service-agreement text-sm text-light">
    <span class="checkbox">
      <span class="red-check-icon"></span>
    </span>
    我已阅读并同意《老虎彩票服务协议》<br/>
    客服热线：400-835-1108
  </div>
</template>

<script>
  export default {
    name: 'serviceAgreement'
  }
</script>

<style scoped>
  .service-agreement {
    padding-left: 35px;
    position: relative;
    padding-top: 10px;
    line-height: 18px;
  }
  .checkbox {
    width: 14px; height: 14px;
    border: 1px solid #ddd;
    position: absolute;
    left: 10px; top: 12px;
  }
  .checkbox .red-check-icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 2px;
  }
</style>
