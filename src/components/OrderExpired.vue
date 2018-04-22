<template>
  <div class="order-expired">
    <span class="order-expired-icon"></span>
    <p class="text-center text-muted">订单已失效</p>
  </div>
</template>

<script>
  export default {
    name: 'orderExpired'
  }
</script>

<style scoped>
  .order-expired {
    text-align: center;
    padding-top: 20px;
  }
  .order-expired-icon {
    display: inline-block;
  }
</style>
