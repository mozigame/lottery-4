<template>
  <div class="custom-radio"
       :class="{checked: checked}"
       @click="changeStatus"></div>
</template>

<script>
  export default {
    name: 'customRadio',
    props: ['checked'],
    methods: {
      changeStatus () {
        this.$emit('change');
      }
    }
  }
</script>

<style>
  .custom-radio {
    display: inline-block;
    width: 15px; height: 15px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 15px;
    vertical-align: middle;
    margin-top: -5px;
  }
  .custom-radio.checked {
    background: #e73f40 url("../assets/icon/white_check.png") no-repeat;
    background-size: 100% 100%;
    border: 1px solid #e73f40;
  }
</style>
