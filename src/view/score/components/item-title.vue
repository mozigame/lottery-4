<template>
  <div style="color: #9b9b9b;font-size: 0.27rem;text-indent: 1em;line-height:100%;">
    <span v-for="i in data" :key="i">{{ i }} </span>
  </div>
</template>

<script>
  export default {
    name: 'module1',
    props: ['data']
  }
</script>

<style scoped>

</style>
