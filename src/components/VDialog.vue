<template>
  <div class="dialog">
    <div class="mask"></div>
    <div class="content">
      <div class="content-hd">
        <a href="javascript:;" class="dialog-close-icon" @click="onClose"></a>
        {{title}}
      </div>
      <div class="content-bd">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dialog',
    props: ['title'],
    methods: {
      onClose () {
        this.$emit('close');
      }
    }
  }
</script>

<style>
  .dialog {
    position: absolute;
  }
  .dialog .mask {
    position: fixed;
    z-index: 500;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .dialog .content {
    position: fixed;
    z-index: 501;
    width: 80%;
    max-width: 300px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #FFFFFF;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
    color: #333;
  }
  .dialog .content-hd {
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .dialog .dialog-close-icon {
    position: absolute;
    right: 10px; top: 10px;
  }
</style>
