<template>
  <div class="wei-xin-mask" @click="maskHide">
    <div class="overlay"></div>
    <div>
      <img src="../assets/wei_xin_mask.png" alt="overlay">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'weiXinMask',
    methods: {
      maskHide () {
        this.$emit('onMaskHide');
      }
    }
  }
</script>

<style>
  .wei-xin-mask, .wei-xin-mask .overlay{
    position: fixed;
    left: 0; right: 0;
    top: 0; bottom: 0;
  }
  .wei-xin-mask .overlay {
    position: absolute;
    background: black;
    opacity: 0.5;
    z-index: 0;
  }
  .wei-xin-mask img {
    width: 60%;
    position: absolute;
    z-index: 2;
    right: 5px;
  }
</style>
