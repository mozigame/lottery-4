<template>
  <span class="checkbox" :class="{active: this.checked}">
    <span class="red-check-icon"></span>
  </span>
</template>

<script>
  export default {
    name: 'checkbox',
    props: ['checked']
  }
</script>

<style scoped>
   .checkbox {
    width: 18px; height: 18px;
    border-radius: 16px;
    border: 1px solid #ddd;
    text-align: center;
    line-height: 13px;
  }
  .checkbox.active {
    border: 1px solid #e73f40;
  }
  .checkbox.active .red-check-icon{
    display: inline-block;
  }
</style>
